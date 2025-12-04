import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import github_icon from "../../assets/projects/github_icon.png";
import { commonIconStyles } from "@/lib/styles";
import RadioGroup from "@/component/projects/radioGroup";
import { Toggle } from "@/component/shadcn/toggle";
import { Button } from "@/component/shadcn/button";

export const ProjectDetails: React.FC = () => {
  type DisplaySectionType = "Project Description" | "Community Submissions" | "My Submissions";
  const { projectId } = useParams<{ projectId: string }>();
  const project = useSelector((state: any) =>
    state.projects.projectsList.find((proj: any) => proj.projectId === projectId)
  );
  const [displaySection, setDisplaySection] = useState<DisplaySectionType>("Project Description");
  function handleDisplaySectionChange(value: DisplaySectionType) {
    setDisplaySection(value);
  }

  return (
    <div className="text-left space-y-1 pl-9 bg-gray-800/10 h-[90vh]">
      <h1 className="text-left mt-2 text-4xl font-extralight text-white">{project?.title}</h1>
      <p className="text-white text-[1.5rem] font-light">{project?.shortDescription}</p>
      <div className="flex justify-start items-center gap-4">
        <p className="text-white text-[1.2rem]"><span>Created By: {project?.creator}</span> | Last Update: {project?.lastUpdate}</p>
        <Button
          variant="outline"
          onClick={() => {
            // Implement share functionality here
          }}
        >
          Share
        </Button>
        <Toggle
          pressed={false} //later dynamically determine if user is tracking this project
          onPressedChange={() => { }} //handle tracking logic here
        >
          Track this project
        </Toggle>
      </div>

      {project.startingRepoLink &&
        <div className="rounded-[.8rem] grid grid-rows-2 mt-4 overflow-hidden w-[45%]">
          {/* Top Section - Dark Background with Warning Icon/Text */}
          <div className="bg-gray-700 w-full text-white pl-5 p-1 flex items-center gap-2">
            {/* Placeholder for Warning Icon */}
            <span className="text-yellow-400 text-lg">⚠️</span>
            <span className="text-sm font-semibold">This project contains a starting repository</span>
          </div>

          {/* Bottom Section - White Background with GitHub Link */}
          <div className="bg-white flex items-center pl-5 p-1 gap-2">
            {/* Placeholder for GitHub Icon */}
            <img
              src={github_icon}
              alt="GitHub Link: "
              className={commonIconStyles}
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

      <RadioGroup
        options={["Project Description", "Community Submissions", "My Submissions"]}
        selected={displaySection}
        onClick={handleDisplaySectionChange}
        isHorizontal={true}
        className="w-[50%] mt-6"
      />

      <div>
        {displaySection === "Project Description" && (
          <div>
            <h2>Project Details</h2>
          </div>
        )}
        {displaySection === "Community Submissions" && (
          <div>
            <h2>Community Submissions</h2>
          </div>
        )}
        {displaySection === "My Submissions" && (
          <div>
            <h2>My Submissions</h2>
          </div>
        )}
      </div>
    </div>
  )
}