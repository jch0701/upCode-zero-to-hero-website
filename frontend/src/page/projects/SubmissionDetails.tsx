import React, { useState } from "react";
import { loadUserInfo } from "@/lib/utils";
import { useParams } from "react-router";
import { useGetCommitHistory } from "@/api/getCommitHistory";
import { useGetSubmissionById } from "@/api/projects/submissionsAPI";
import { formatDate } from "@/lib/utils";
import RadioGroup from "@/component/projects/radioGroup";
import RenderMD from "@/component/RenderMD/RenderMD";
import { Button } from "../../component/shadcn/button";
import { SubmissionForm } from "./submissionForm";
import { ellipsifyText } from "@/lib/utils";
import { FieldGroup } from "@/component/shadcn/field";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/component/shadcn/dialog";
import { commonBackgroundClass, commonMarkDownClass } from "@/lib/styles";
import { GitHubLink } from "@/component/projects/gitHubLink";
import { LoadingIcon } from "@/component/LoadingIcon";

const SubmissionDetails: React.FC = () => {
  const { projectId, submissionId } = useParams<{ projectId: string; submissionId: string }>();

  type displaySectionType = "commits" | "rationale";
  const [displaySection, setDisplaySection] = useState<displaySectionType>("commits");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
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

  return (
    <div className="text-left mt-2 pt-3 space-y-2 pl-9 bg-gray-800/40 rounded-2xl shadow-2xl w-7xl mx-auto h-full">
      <h1 className="text-left mt-2 text-4xl font-extralight text-white">{submission?.title}</h1>
      <p className="text-white text-[1.5rem] font-light">Submission by: {submission.creatorName}</p>
      <p className="text-white text-[1.2rem]">
        Project: {submission.projectTitle} | Created By: {submission.creatorName}
      </p>
      <p className="text-white text-[1rem]">
        <span>Submitted On: {submission?.postedOn && formatDate(new Date(submission.postedOn))} </span>
        | <span>Last Update: {submission.lastUpdated && formatDate(new Date(submission.lastUpdated))}</span>
      </p>

      <GitHubLink repoUrl={submission?.repoLink || ""} title="This submission contains a GitHub repository link." />
      {
        submission.creatorName === username &&
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="rounded-2xl cursor-pointer justify-end"
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