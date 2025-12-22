import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
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

export const ProjectDetails: React.FC = () => {
  const navigate = useNavigate();
  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);
  let { projectId: projectIdParam } = useParams<{ projectId: string }>();
  const projectId = Number(projectIdParam);
  const userId = useSelector((state: any) => state.profile.userId);

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

  const [displaySection, setDisplaySection] = useState<DisplaySectionType>("Project Description");

  if (isLoadingProjectData) {
    return (
      <div className="mt-2 pt-3 space-y-2 pl-9 bg-gray-800/20 rounded-2xl shadow-2xl w-7xl mx-auto h-[90vh] overflow-hidden">
        <LoadingIcon text="Loading Project Data..." />
      </div>
    )
  }
  if (isErrorProjectData) {
    const errorMessage = (projectError as any).response?.data?.error || projectError.message;
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

  type DisplaySectionType = "Project Description" | "Community Submissions" | "My Submissions";
  function handleDisplaySectionChange(value: DisplaySectionType) {
    setDisplaySection(value);
  }

  return (
    <div className="text-left mt-2 pt-3 space-y-2 pl-9 bg-gray-800/20 rounded-2xl shadow-2xl w-7xl mx-auto h-fit min-h-[90vh] mb-10">
      <h1 className="text-left mt-2 text-4xl font-extralight text-white">{project?.title}</h1>
      <p className="text-white text-[1.5rem] font-light">{project?.shortDescription}</p>
      <div className="text-white text-[1.2rem]">
        <span>Created By: {project!.creatorName} </span> |
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
                    <RenderMD>
                      {project?.detailsFile || "No project details available."}
                    </RenderMD>
                  </div>
                </div>
              );

            case "Community Submissions":
              return (
                <div className="grid grid-cols-1 gap-3.5">
                  {
                    isLoadingSubmissions && <LoadingIcon text="Loading Submissions..." />
                  }
                  {
                    isErrorSubmissions && <p className="text-red-500">
                      Error loading submissions. Please try again later.
                    </p>
                  }
                  {
                    communitySubmissions.length === 0 ? (
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
                          onClick={()=>setDisplaySection("My Submissions")}
                          className="w-fit mx-auto cursor-pointer">
                            See my submissions
                          </Button>
                        </div>
                      )
                    ) : (
                      communitySubmissions.map((submission: any) => (
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