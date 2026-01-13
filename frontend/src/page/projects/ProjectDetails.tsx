import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { loadUserInfo } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/lib/utils";
import { commonMarkDownClass } from "@/lib/styles";
import RenderMD from "@/component/RenderMD/RenderMD";
import { useGetByIdComplete } from "@/api/projects/projectsAPI";
import { useGetSubmissionsSurfaceDataOnly } from "@/api/projects/submissionsAPI";
import RadioGroup from "@/component/projects/radioGroup";
import SubmissionCard from "@/component/projects/submissionCard";
import { TagPill } from "@/component/tag";
import { NoSolutions } from "@/component/projects/NoSolutions";
import { InterModuleRelations } from "@/component/projects/interModuleRelations";
import { GitHubLink } from "@/component/projects/gitHubLink";
import { ProjectInteractive } from "@/component/projects/projectInteractive";
import { LoadingIcon } from "@/component/LoadingIcon";
import { Button } from "@/component/shadcn/button";
import { NotLoggedIn } from "@/component/NotLoggedIn";
import { NotFound } from "@/component/NotFound";
import { TableOfContents } from "@/component/RenderMD/TableOfContents";

import { useGetMyProfile } from "@/api/profile/profileAPI";

export const ProjectDetails: React.FC = () => {
  const navigate = useNavigate();
  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);
  let { projectId: projectIdParam } = useParams<{ projectId: string }>();
  const projectId = Number(projectIdParam);
  const userId = loadUserInfo()?.userId || null;
  //admin use
  const { data: userProfile } = useGetMyProfile();
  const isAdmin = userProfile?.role === 'admin';

  const { 
    data: project, 
    isLoading: isLoadingProjectData, 
    isError: isErrorProjectData, 
    error: projectError 
  } = useGetByIdComplete(projectId, userId);

  const { 
    data: submissions = [], 
    isSuccess: isSuccessLoadingSubmissions, 
    isLoading: isLoadingSubmissions, 
    isError: isErrorSubmissions,
  } = useGetSubmissionsSurfaceDataOnly(projectId);
  
  type DisplaySectionType = "description" | "communitySubmissions" | "mySubmissions";
  const [displaySection, setDisplaySection] = useState<DisplaySectionType>("description");

  if (isLoadingProjectData) {
    return (
        <LoadingIcon text="Loading Project Data..." />
    )
  }
  if (isErrorProjectData || !project) {
    const errorCode = (projectError as any).response?.status;
    if (errorCode === 404) {
      return <NotFound resource="project" />;
    }
    const errorMessage = (projectError as any).response?.data?.error || projectError?.message;
    throw new Error(`Error loading project data: ${errorMessage}`);
  }
  
  const communitySubmissions: any[] = [], mySubmissions: any[] = []; // Placeholder arrays for submissions
  if(isSuccessLoadingSubmissions && submissions.length > 0) {
    submissions.map((sub: any) => {
      if (sub.creatorId === userId) {
        mySubmissions.push(sub);
      } else {
        communitySubmissions.push(sub);
      }
    });
  }

  function handleDisplaySectionChange(value: DisplaySectionType) {
    setDisplaySection(value);
  }

  return (
    <div className="text-left mt-2 pt-3 space-y-2 pl-9 bg-gray-800/40 rounded-2xl shadow-2xl w-7xl mx-auto h-fit min-h-[90vh] mb-10">
      <h1 className="text-left mt-2 text-4xl font-extralight text-white">{project?.title}</h1>
      <p className="text-white text-[1.5rem] font-light">{project?.shortDescription}</p>
      <div className="text-white text-[1.2rem]">
        Created By: <span className="text-blue-400 hover:underline cursor-pointer ml-1"
        onClick={() => navigate(`/profile/${project!.creatorId}`)}>{project!.creatorName} 
        </span> |
        <span> Last Update: {project?.lastUpdated && formatDate(new Date(project.lastUpdated))}</span>
        <span className="space-x-2 ml-4">
          <TagPill tag={{ type: "Difficulty", label: project!.difficulty, className: "text-black h-7 w-auto text-2xl" }} />
          <TagPill tag={{ type: "Category", label: project!.category, className: "text-black h-7 w-auto text-2xl" }} />
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
        isAdmin={isAdmin}
        containsSubmissions={submissions.length > 0}
      />

      <InterModuleRelations
        projectId={projectId}
      />

      <div>
        <RadioGroup
          options={[
            {label: "Project Description", value: "description"}, 
            {label: "Community Submissions", value: "communitySubmissions"}, 
            {label: "My Submissions", value: "mySubmissions"}
          ]}
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
            case "description":
              return (
                <div className="flex gap-6">
                  <div className={`prose prose-invert max-w-none text-white text-left flex-1 ${commonMarkDownClass} ml-0`}>
                    <RenderMD>
                      {project?.detailsFile || "No project details available."}
                    </RenderMD>
                  </div>
                  <TableOfContents markdownContent={project?.detailsFile || ""} />
                </div>
              );


            case "communitySubmissions":
              return (
                <div className="grid grid-cols-1 gap-3.5 mr-15">
                  {
                    isLoadingSubmissions ? (
                      <LoadingIcon text="Loading Submissions..." />
                    ) : isErrorSubmissions ? (
                      <p className="text-red-500">
                        Error loading submissions. Please try again later.
                      </p>
                    ) : communitySubmissions.length === 0 ? (
                      mySubmissions.length === 0 ? (
                      <NoSolutions
                        title="No Community Submissions Yet"
                        description="Be the first to contribute your solution!"
                        submissionDialogOpen={submissionDialogOpen}
                        setSubmissionDialogOpen={setSubmissionDialogOpen}
                        project={project}
                        projectId={projectId}
                      />
                      ) : (
                        <div className="flex flex-col justify-center items-center gap-4 mt-10">
                          <h1 className="text-2xl font-semibold text-white">Wow! You're the first to contribute!</h1>
                          <Button
                          onClick={()=>setDisplaySection("mySubmissions")}
                          className="w-fit mx-auto cursor-pointer">
                            See my submissions
                          </Button>
                        </div>
                      )
                    ) : (
                      communitySubmissions.map((submission: any) => (
                        <SubmissionCard
                          key={submission.submissionId}
                          creator={submission.creatorName}
                          date={new Date(submission.postedOn)}
                          title={submission.title}
                          repoLink={submission.repoLink}
                          onClick={() => {
                            navigate(`submission/${submission.submissionId}`);
                          }}
                        />)
                      )
                    )
                  }
                </div>
              );

            case "mySubmissions":
              return (
                <div className="grid grid-cols-1 gap-3.5 mr-15">
                  { 
                    userId === null ? (
                      <NotLoggedIn />
                    ) : mySubmissions.length === 0 ? (
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
                            navigate(`submission/${submission.submissionId}`);
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