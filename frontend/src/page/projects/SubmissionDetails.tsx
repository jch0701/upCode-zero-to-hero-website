import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useGetCommitHistory } from "@/api/getCommitHistory";
import React, { useState } from "react";
import { formatDate } from "@/lib/utils";
import RadioGroup from "@/component/projects/radioGroup";
import github_icon from "../../assets/projects/github_icon.png";
import ReactMarkdown from "react-markdown";
import { Button } from "../../component/shadcn/button";
import { SubmissionForm } from "./submissionForm";
import { useDispatch } from "react-redux";
import { commonIconStyles } from "@/lib/styles";
import { ellipsifyText } from "@/lib/utils";
import { Dialog, DialogTrigger } from "@/component/shadcn/dialog";

const SubmissionDetails: React.FC = () => {
  const { submissionId } = useParams<{ submissionId: string }>();
  const dispatch = useDispatch();
  
  const submission = useSelector((state: any) => state.submissions.submissionsList.find((sub: any) => sub.submissionId === submissionId));
  const {
    data: commitHistory, 
    isLoading: commitsIsLoading, 
    isError: getCommitsIsError, 
    error: getCommitsError
  } = useGetCommitHistory(submission?.repoLink || "");
  const creatorId = submission.creatorId;
  const creatorName = useSelector((state: any) => state.userList.userList.find((user: any) => user.userId === creatorId))?.username;
  const userName = useSelector((state: any) => state.profile.username);
  const projectId = submission?.projectId;
  const projectTitle = useSelector((state: any) =>
    state.projects.projectsList.find((proj: any) => proj.projectId === projectId)
  )?.title;

  type displaySectionType = "Commits History" | "Rationale File";
  const [displaySection, setDisplaySection] = useState<displaySectionType>("Commits History");
  function handleDisplaySectionChange(value: displaySectionType) {
    setDisplaySection(value);
  }

  return (
    <div className="text-left mt-2 pt-3 space-y-2 pl-9 bg-gray-800/20 rounded-2xl shadow-2xl w-7xl mx-auto h-full">
      <h1 className="text-left mt-2 text-4xl font-extralight text-white">{submission?.title}</h1>
      <p className="text-white text-[1.5rem] font-light">Submission by: {creatorName}</p>
      <p className="text-white text-[1.2rem]">
        Project: {projectTitle} | Created By: {submission?.creator}
      </p>
      <p className="text-white text-[1rem]">
        Submitted On: {submission?.postedOn && formatDate(new Date(submission.postedOn))}
        | Last Update: {submission.lastUpdated && formatDate(new Date(submission.lastUpdated))}
      </p>

      <div className="rounded-[.8rem] grid grid-rows-2 mt-4 overflow-hidden w-[90%]">
        <div className="bg-gray-700 w-full text-white pl-5 p-1 py-2 flex items-center gap-2">
          <span className="text-sm font-semibold">GitHub Repository Link</span>
        </div>
        <div className="bg-white flex items-center pl-5 p-1 gap-2">
          <img
            src={github_icon}
            alt="GitHub Link: "
            className={`${commonIconStyles} w-6`}
          />
          <a
            href={submission.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {submission.repoLink}
          </a>
        </div>
      </div>
      {
        creatorName === userName &&
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="rounded-2xl cursor-pointer justify-end"
            >Edit Submission</Button>
          </DialogTrigger>
          <SubmissionForm
            onSubmit={(payload) => { dispatch({ type: "projects/editSubmission", payload }); }}
            openAsCreateForm={false}
            initialData={submission}
          />
        </Dialog>
      }
      <div className="flex justify-start items-center gap-5">
        <RadioGroup
          options={["Commits History", "Rationale File"]}
          selected={displaySection}
          onClick={handleDisplaySectionChange}
          isHorizontal={true}
          className="w-[75%]"
          // rounded upper borders
          buttonClassName="rounded-t-lg"
        />
      </div>

      <div className="text-white mt-4 mb-10">
        {displaySection === "Commits History" && (
          <div>
            <div className="prose prose-invert max-w-none mt-4 text-white text-left">
              {commitsIsLoading && <p>Loading commit history...</p>}
              {getCommitsIsError && <p>{getCommitsError.message}</p>}
            </div>
            {
              commitHistory && commitHistory.length > 0 ? (
                // changed: improved table styling with better structure
                <div className="overflow-x-auto rounded-lg border border-gray-600 mb-20 w-[95%]">
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
                        <tr key={commit.hash} className={`border-b border-gray-600 hover:bg-gray-700/50 transition-colors ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-600'}`}>
                          <td className="px-4 py-3 font-mono text-xs text-green-400">{ellipsifyText(commit.hash)}</td>
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
        {displaySection === "Rationale File" && (
          <div className="prose prose-invert max-w-none mt-4 text-white text-left">
            <ReactMarkdown>
              Rationale file content appears here in markdown format.
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default SubmissionDetails;