import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import github_icon from "../../assets/projects/github_icon.png";
import { commonIconStyles } from "@/lib/styles";
import RadioGroup from "@/component/projects/radioGroup";
import ReactMarkdown from 'react-markdown';
import { Toggle } from "@/component/shadcn/toggle";
import { Button } from "@/component/shadcn/button";
import alert_icon from "../../assets/projects/alert_icon.png";
import SubmissionCard from "@/component/projects/submissionCard";
import { Dialog, DialogTrigger } from "@/component/shadcn/dialog";
import { ProjectForm } from "./projectForm";
import { SubmissionForm } from "./submissionForm";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/component/shadcn/dialog";
import { FieldGroup } from "@/component/shadcn/field";
import { commonBackgroundClass, commonMarkDownClass } from "@/lib/styles";
import { base64ToString } from "@/lib/utils";
import { TagPill } from "@/component/tag";
import emptybox_icon from "../../assets/emptybox_icon.png";
import { EmptyUI } from "@/component/emptyUI";
import { Separator } from "@/component/shadcn/separator";

const NoSolutions: React.FC<{
  title: string;
  description: string;
  submissionDialogOpen: boolean;
  setSubmissionDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project: any;
  projectId: number
}> = ({ title, description, submissionDialogOpen, setSubmissionDialogOpen, project, projectId }) => {
  return (
    <EmptyUI
      iconSrc={emptybox_icon}
      title={title}
      description={description}
    >
      <Dialog open={submissionDialogOpen} onOpenChange={setSubmissionDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="rounded-2xl cursor-pointer bg-black"
          >+ Add a Submission</Button>
        </DialogTrigger>
        <DialogContent className={commonBackgroundClass}>
          <DialogHeader>
            <DialogTitle>Contribute your solution to this project</DialogTitle>
            <DialogDescription>
              Share your solution with others by filling out the form below.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className={commonBackgroundClass}>
            <SubmissionForm
              close={() => setSubmissionDialogOpen(false)}
              openAsCreateForm={true}
              initialData={project}
              projectId={projectId}
            />
          </FieldGroup>
        </DialogContent>
      </Dialog>
    </EmptyUI>
  )
}

export const ProjectDetails: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submissionDialogOpen, setSubmissionDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
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
  const trackingData = useSelector((state: any) =>
    state.projectTracking.records.find(
      (record: any) => record.userId === userId && record.projectId === projectId
    )
  ) || { isTracking: false, isMarkedAsDone: false };

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
        <div className="rounded-[.8rem] grid grid-rows-2 mt-4 overflow-hidden w-[90%]">
          {/* Top Section - Dark Background with Warning Icon/Text */}
          <div className="bg-gray-700 w-full text-white pl-5 p-1 py-2 flex items-center gap-2">
            {/* Placeholder for Warning Icon */}
            <img src={alert_icon} alt="Alert Icon" className={`${commonIconStyles} w-6`} />
            <span className="text-sm font-semibold">This project contains a starting repository. This means you should clone this repository and build your solution from it.</span>
          </div>

          {/* Bottom Section - White Background with GitHub Link */}
          <div className="bg-white flex items-center pl-5 p-1 gap-2">
            {/* Placeholder for GitHub Icon */}
            <img
              src={github_icon}
              alt="GitHub Link: "
              className={`${commonIconStyles} w-6`}
            />
            <a
              href={project?.startingRepoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {project?.startingRepoLink}
            </a>
          </div>
        </div>
      }

      <div className="flex h-auto items-center mt-5 bg-black/50 text-sm w-fit rounded-2xl">
        {
          userId === project?.creatorId && (
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer rounded-none rounded-l-2xl"
                >! Edit Project</Button>
              </DialogTrigger>
              <DialogContent className={commonBackgroundClass}>
                <DialogHeader>
                  <DialogTitle>Edit Project</DialogTitle>
                  <DialogDescription>
                    Change the project details by modifying the form below.
                  </DialogDescription>
                </DialogHeader>
                <FieldGroup className={commonBackgroundClass}>
                  <ProjectForm
                    openAsCreateForm={false}
                    initialData={project}
                    close={() => setEditDialogOpen(false)}
                  />
                </FieldGroup>
              </DialogContent>
              {/* <Separator orientation="vertical"/> */}
            </Dialog>
          )
        }
        <Dialog open={submissionDialogOpen} onOpenChange={setSubmissionDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className={`cursor-pointer rounded-none ${userId !== project?.creatorId && "rounded-l-2xl"}`}
            >+ Add a Submission</Button>
          </DialogTrigger>
          <DialogContent className={commonBackgroundClass}>
            <DialogHeader>
              <DialogTitle>Contribute your solution to this project</DialogTitle>
              <DialogDescription>
                Share your solution with others by filling out the form below.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className={commonBackgroundClass}>
              <SubmissionForm
                close={() => setSubmissionDialogOpen(false)}
                openAsCreateForm={true}
                initialData={project}
                projectId={projectId}
              />
            </FieldGroup>
          </DialogContent>
        </Dialog>
        {/* <Separator orientation="vertical" /> */}
        <Toggle
          pressed={trackingData?.isTracking}
          onPressedChange={() => {
            dispatch({
              type: 'projectTracking/setTrackingStatus', payload: {
                userId: userId,
                projectId: projectId,
                isTracking: !trackingData?.isTracking,
                isMarkedAsDone: trackingData?.isMarkedAsDone,
              }
            });
          }}
          className={`cursor-pointer bg-black text-white px-4 rounded-none`}
        >
          Track this project
        </Toggle>
        {/* <Separator orientation="vertical"/> */}
        <Toggle
          pressed={trackingData?.isMarkedAsDone}
          onPressedChange={() => {
            dispatch({
              type: 'projectTracking/setTrackingStatus', payload: {
                userId: userId,
                projectId: projectId,
                isTracking: trackingData?.isTracking,
                isMarkedAsDone: !trackingData?.isMarkedAsDone,
              }
            });
          }}
          className={`cursor-pointer bg-black text-white px-4 rounded-r-2xl rounded-l-none`}
        >
          Mark as Done
        </Toggle>
      </div>

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
        {displaySection === "Project Description" && (
          <div>
            <div className={`prose prose-invert max-w-none mt-4 text-white text-left ${commonMarkDownClass}`}>
              {/* changed: decode base64 string to markdown text */}
              <ReactMarkdown>
                {project?.detailsFile ? base64ToString(project.detailsFile) : "No project details available."}
              </ReactMarkdown>
            </div>
          </div>
        )}
        {displaySection === "Community Submissions" && (
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
                    tag={submission.tag}
                    onClick={() => {
                      navigate(`/project/submission/${submission.submissionId}`);
                    }
                    }
                  />)
                )
              )
            }
          </div>
        )}
        {displaySection === "My Submissions" && (
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
                    tag={submission.tag}
                    onClick={() => {
                      navigate(`/project/submission/${submission.submissionId}`);
                    }
                    }
                  />)
                )
              )
            }
          </div>
        )}
      </div>
    </div>
  )
}