import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useState } from "react";
import { formatDate } from "@/lib/utils";
import RadioGroup from "@/component/projects/radioGroup";
import github_icon from "../../../assets/projects/github_icon.png";
import { commonIconStyles } from "@/lib/styles";

const SubmissionDetails: React.FC = () => {
  const { submissionId } = useParams<{ submissionId: string }>();

  const submission = useSelector((state: any) => state.submissions.submissionsList.find((sub: any) => sub.submissionId === submissionId));
  // const creatorId = submission?.creatorId;
  // const creatorName = useSelector((state: any) =>
  //   state.users.usersList.find((user: any) => user.userId === creatorId)
  // )?.name;
  const creatorName = "Alice"; // Placeholder for current user name
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
    <div className="text-left mt-2 pt-3 space-y-2 pl-9 bg-gray-800/20 rounded-2xl shadow-2xl w-7xl mx-auto h-[90vh]">
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
          {/* Placeholder for GitHub Icon */}
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

      <div className="flex justify-start items-center gap-5">
        <RadioGroup
          options={["Commits History", "Rationale File"]}
          selected={displaySection}
          onClick={handleDisplaySectionChange}
          isHorizontal={true}
          className="w-[75%] mt-6"
          // rounded upper borders
          buttonClassName="rounded-t-lg"
        />
      </div>
    </div>
  );
}

export default SubmissionDetails;