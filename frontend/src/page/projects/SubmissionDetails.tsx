import React, { useState } from "react";
import { loadUserInfo } from "@/lib/utils";
import { useParams } from "react-router";
import { useGetCommitHistory } from "@/api/getCommitHistory";
import { useGetSubmissionById } from "@/api/projects/submissionsAPI";
import { useDeleteSubmission } from "@/api/projects/submissionsAPI";
import { formatDate } from "@/lib/utils";
import RadioGroup from "@/component/projects/radioGroup";
import RenderMD from "@/component/RenderMD/RenderMD";
import { Button } from "../../component/shadcn/button";
import { SubmissionForm } from "./submissionForm";
import { ellipsifyText } from "@/lib/utils";
import { FieldGroup } from "@/component/shadcn/field";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/component/shadcn/dialog";
import { commonBackgroundClass, commonMarkDownClass } from "@/lib/styles";
import { GitHubLink } from "@/component/projects/gitHubLink";
import { LoadingIcon } from "@/component/LoadingIcon";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SubmissionDetails: React.FC = () => {
  const navigate = useNavigate();
  const { projectId, submissionId } = useParams<{ projectId: string; submissionId: string }>();

  type displaySectionType = "commits" | "rationale";
  const [displaySection, setDisplaySection] = useState<displaySectionType>("commits");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const username = loadUserInfo()?.username || null;

  const {
    data: submission,
    isLoading: submissionIsLoading,
    isError: submissionIsError,
    error: submissionError
  } = useGetSubmissionById(Number(projectId), Number(submissionId));
  const {
    data: commitHistory,
    isLoading: commitsIsLoading,
    isError: getCommitsIsError,
    error: getCommitsError
  } = useGetCommitHistory(submission?.repoLink || "");
  const {
    mutateAsync: deleteSubmission,
    isPending: isDeleting
  } = useDeleteSubmission(Number(projectId), Number(submissionId));

  if (submissionIsLoading) {
    return (
      <div className="mt-2 pt-3 space-y-2 pl-9 bg-gray-800/20 rounded-2xl shadow-2xl w-7xl mx-auto h-fit min-h-[90vh] mb-10 overflow-hidden">
        <LoadingIcon text="Loading Submission Details..." />
      </div>
    )
  }

  if (submissionIsError) {
    throw new Error(`Error loading submission: ${submissionError?.message}`);
  }

  function handleDisplaySectionChange(value: displaySectionType) {
    setDisplaySection(value);
  }

  async function handleDeleteSubmission() {
    const response = await deleteSubmission();
    if (response.message === "SUCCESS") {
      toast.success("Submission deleted successfully.");
      navigate(`/project/${projectId}`);
    } else {
      toast.error(`Failed to delete the submission. ${response.message}`);
    }
    setDeleteDialogOpen(false);
  }

  return (
    <div className="text-left mt-2 pt-3 space-y-2 pl-9 bg-gray-800/40 rounded-2xl shadow-2xl w-7xl mx-auto h-full">
      <h1 className="text-left mt-2 text-4xl font-extralight text-white">{submission?.title}</h1>
      <p className="text-white text-[1.5rem] font-light">Submission by: {submission.creatorName}</p>
      <p className="text-white text-[1.2rem]">
        Project:
        <span
          onClick={() => navigate(`/project/${submission.projectId}`)}
          className="text-blue-400 hover:underline cursor-pointer ml-1"
        >{submission.projectTitle} </span>
        | Created By: 
        <span onClick={() => navigate(`/profile/${submission.creatorId}`)} 
        className="text-blue-400 hover:underline cursor-pointer ml-1">
          {submission.creatorName}
          </span>
      </p>
      <p className="text-white text-[1rem]">
        <span>Submitted On: {submission?.postedOn && formatDate(new Date(submission.postedOn))} </span>
        | <span>Last Update: {submission.lastUpdated && formatDate(new Date(submission.lastUpdated))}</span>
      </p>

      <GitHubLink repoUrl={submission?.repoLink || ""} title="This submission contains a GitHub repository link." />
      {
        submission.creatorName === username &&
        <div className="flex h-auto items-center mt-5 bg-black/50 rounded-2xl text-sm w-fit">
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="rounded-l-2xl cursor-pointer justify-end rounded-r-none 
                hover:bg-blue-500 hover:border-blue-500"
              >Edit Submission</Button>
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
                  close={() => setEditDialogOpen(false)}
                  projectId={submission.projectId || ""}
                  openAsCreateForm={false}
                  initialData={submission}
                />
              </FieldGroup>
            </DialogContent>
          </Dialog>
          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className={`cursor-pointer rounded-r-2xl rounded-l-none hover:bg-red-600 
                  hover:border-red-600 hover:text-white`}
              >
                Delete Submission
              </Button>
            </DialogTrigger>
            <DialogContent className={commonBackgroundClass}>
              <DialogHeader>
                <DialogTitle>Delete Submission</DialogTitle>
                {
                  isDeleting ? <DialogDescription>Deleting submission...</DialogDescription> : (
                    <DialogDescription>
                      Are you sure you want to delete this submission? This action cannot be undone.
                    </DialogDescription>
                  )
                }
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="text-black">Cancel</Button>
                <Button variant="destructive" onClick={handleDeleteSubmission} disabled={isDeleting}>Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      }
      <div className="flex justify-start items-center gap-5">
        <RadioGroup
          options={[
            { label: "Commits History", value: "commits" },
            { label: "Rationale File", value: "rationale" }
          ]}
          selected={displaySection}
          onClick={handleDisplaySectionChange}
          isHorizontal={true}
          className="w-[75%]"
          // rounded upper borders
          buttonClassName="rounded-t-lg"
        />
      </div>

      <div className="text-white mt-4 mb-10">
        {displaySection === "commits" && (
          <div>
            <div className="prose prose-invert max-w-none mt-4 text-white text-left">
              {commitsIsLoading &&
                <div className="mt-2 pt-3 space-y-2 pl-9 bg-gray-800/20 rounded-2xl shadow-2xl w-7xl mx-auto h-[90vh] overflow-hidden">
                  <LoadingIcon text="Loading Commit Histories..." />
                </div>}
              {getCommitsIsError && <p>{getCommitsError.message}</p>}
            </div>
            {
              commitHistory && commitHistory.length > 0 ? (
                // changed: improved table styling with better structure
                <div className="overflow-x-auto rounded-lg border border-gray-600 w-[95%]">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-700 border-b border-gray-600">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-white">Hash</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-white">Message</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-white">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commitHistory.map((commit: any, idx: number) => (
                        <tr key={commit.hash} className={`border-b border-gray-600 hover:bg-black transition-colors ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-600'}`}>
                          <td className="px-4 py-3 font-mono text-xs text-green-400">
                            <a href={commit.link} target="_blank" rel="noopener noreferrer" key={commit.hash}>
                              {ellipsifyText(commit.hash)}
                            </a>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-100 truncate max-w-xs">{commit.message}</td>
                          <td className="px-4 py-3 text-sm text-gray-400 whitespace-nowrap">{formatDate(new Date(commit.date))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                !commitsIsLoading && <p>No commits found for this repository.</p>
              )
            }
          </div>
        )}
        {displaySection === "rationale" && (
          <div className={`prose prose-invert max-w-none mt-4 text-white text-left ${commonMarkDownClass}`}>
            <RenderMD>
              {submission?.rationaleFile || "No project details available."}
            </RenderMD>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubmissionDetails;