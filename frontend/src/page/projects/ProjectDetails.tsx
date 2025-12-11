import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate, base64ToString } from "@/lib/utils";
import { commonMarkDownClass } from "@/lib/styles";
import ReactMarkdown from 'react-markdown';

import RadioGroup from "@/component/projects/radioGroup";
import SubmissionCard from "@/component/projects/submissionCard";
import { TagPill } from "@/component/tag";
import { NoSolutions } from "@/component/projects/NoSolutions";
import { InterModuleRelations } from "@/component/projects/interModuleRelations";
import { GitHubLink } from "@/component/projects/gitHubLink";
import { ProjectInteractive } from "@/component/projects/projectInteractive";

export const ProjectDetails: React.FC = () => {
  const navigate = useNavigate();
  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);
  
  let { projectId: projectIdParam } = useParams<{ projectId: string }>();
  const projectId = Number(projectIdParam);
  const project = useSelector((state: any) =>
    state.projects.projectsList.find((proj: any) => proj.projectId === projectId)
  );
  const creatorId = project?.creatorId;
  const creatorName = useSelector((state: any) => state.userList.userList.find((user: any) => user.userId === creatorId))?.username;
  // const userId = useSelector((state: any) => state.profile.userId);
  const userId = 1;
  const submissions = useSelector((state: any) => state.submissions.submissionsList
    .filter((sub: any) => Number(sub.projectId) === projectId)
  );
  const communitySubmissions: any[] = [], mySubmissions: any[] = []; // Placeholder arrays for submissions
  submissions.map((sub: any) => {
    if (sub.creatorId === userId) {
      mySubmissions.push(sub);
    } else {
      communitySubmissions.push(sub);
    }
  });


  type DisplaySectionType = "Project Description" | "Community Submissions" | "My Submissions";
  const [displaySection, setDisplaySection] = useState<DisplaySectionType>("Project Description");
  function handleDisplaySectionChange(value: DisplaySectionType) {
    setDisplaySection(value);
  }

  return (
    <div className="text-left mt-2 pt-3 space-y-2 pl-9 bg-gray-800/20 rounded-2xl shadow-2xl w-7xl mx-auto h-[90vh]">
      <h1 className="text-left mt-2 text-4xl font-extralight text-white">{project?.title}</h1>
      <p className="text-white text-[1.5rem] font-light">{project?.shortDescription}</p>
      <div className="text-white text-[1.2rem]">
        <span>Created By: {creatorName} </span> |
        <span> Last Update: {project.lastUpdated && formatDate(new Date(project.lastUpdated))}</span>
        <span className="space-x-2 ml-4">
          <TagPill tag={{ type: "Difficulty", label: project.difficulty, className: "text-black h-7 w-auto text-2xl" }} />
          <TagPill tag={{ type: "Category", label: project.category, className: "text-black h-7 w-auto text-2xl" }} />
        </span>
      </div>

      {project.startingRepoLink &&
        <GitHubLink
          repoUrl={project.startingRepoLink}
          title="This project contains a starting repository. 
        This means you should clone this repository and build your solution from it."
        />
      }
      <ProjectInteractive
        userId={userId}
        projectId={projectId}
        project={project}
        submissionDialogOpen={submissionDialogOpen}
        setSubmissionDialogOpen={setSubmissionDialogOpen}
      />

      <InterModuleRelations
        projectId={projectId}
      />

      <div>
        <RadioGroup
          options={["Project Description", "Community Submissions", "My Submissions"]}
          selected={displaySection}
          onClick={handleDisplaySectionChange}
          isHorizontal={true}
          className="w-[55%] mt-6"
          // rounded upper borders
          buttonClassName="rounded-t-lg"
        />
      </div>

      <div className="text-white mt-4 mb-10">
        {(() => {
          switch (displaySection) {
            case "Project Description":
              return (
                <div>
                  <div className={`prose prose-invert max-w-none mt-4 text-white text-left ${commonMarkDownClass}`}>
                    <ReactMarkdown>
                      {project?.detailsFile ? base64ToString(project.detailsFile) : "No project details available."}
                    </ReactMarkdown>
                  </div>
                </div>
              );
            
            case "Community Submissions":
              return (
                <div className="grid grid-cols-1 gap-3.5">
                  {
                    communitySubmissions.length === 0 ? (
                      <NoSolutions
                        title="No Community Submissions Yet"
                        description="Be the first to contribute your solution!"
                        submissionDialogOpen={submissionDialogOpen}
                        setSubmissionDialogOpen={setSubmissionDialogOpen}
                        project={project}
                        projectId={projectId}
                      />
                    ) : (
                      communitySubmissions.map((submission: any) => (
                        <SubmissionCard
                          key={submission.submissionId}
                          creator={submission.creator}
                          date={new Date(submission.postedOn)}
                          title={submission.title}
                          repoLink={submission.repoLink}
                          onClick={() => {
                            navigate(`/project/submission/${submission.submissionId}`);
                          }}
                        />)
                      )
                    )
                  }
                </div>
              );
            
            case "My Submissions":
              return (
                <div>
                  {
                    mySubmissions.length === 0 ? (
                      <NoSolutions
                        title="Looks like you have not contributed yet!"
                        description="Share your solution with the community by submitting it below."
                        submissionDialogOpen={submissionDialogOpen}
                        setSubmissionDialogOpen={setSubmissionDialogOpen}
                        project={project}
                        projectId={projectId}
                      />
                    ) : (
                      mySubmissions.map((submission: any) => (
                        <SubmissionCard
                          key={submission.submissionId}
                          creator={submission.creator}
                          date={new Date(submission.postedOn)}
                          title={submission.title}
                          repoLink={submission.repoLink}
                          onClick={() => {
                            navigate(`/project/submission/${submission.submissionId}`);
                          }}
                        />)
                      )
                    )
                  }
                </div>
              );
            
            default:
              return null;
          }
        })()}
      </div>
    </div>
  )
}