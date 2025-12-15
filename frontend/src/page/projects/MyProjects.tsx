import React from "react";
import SearchBar from "@/component/searchBar";
import { useState } from "react";
import RadioGroup from "../../component/projects/radioGroup.tsx";
import type { ProjectType } from "../../lib/projectModuleTypes.ts";
import { useGetAllBasicDetailsOnly } from "@/api/projects/projectsAPI.ts";
import { useGetAllSubmissionsByCreator } from "@/api/projects/submissionsAPI.ts";
// import { useSelector } from "react-redux";
import { categoryList } from "@/lib/types.ts";
import { useNavigate } from "react-router";
import ProjectCard from "../../component/projects/projectCard.tsx";
import SubmissionCard from "@/component/projects/submissionCard.tsx";


export const MyProjects: React.FC = () => {
  const navigate = useNavigate();
  const selections = ["All", ...categoryList];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(selections[0]);
  const [submissionType, setSubmissionType] = useState<"Created Projects" | "Tracked Projects" | 
  "Projects Marked as Done" | "Project Submissions">("Created Projects");
  // const userId = useSelector((state: any) => state.profile.userId);
  const userId = 1; // Temporary fix until auth is done

  const { data: createdProjects = [] } = useGetAllBasicDetailsOnly(userId);
  const { data: submissions = [] } = useGetAllSubmissionsByCreator(userId);

  function handleCategoryChange(value: string) {
    setCategory(value);
  }
  function navigateToDetails(path: string, destId: number) {
    navigate(`/${path}/${destId}`);
  }

  let hasContentToShow = false;
  let targetArr = [];
  switch (submissionType) {
    case "Created Projects":
      targetArr = createdProjects;
      break;
    case "Tracked Projects":
      targetArr = createdProjects.filter((project: ProjectType & { isTracking: boolean }) => project.isTracking);
      break;
    case "Projects Marked as Done":
      targetArr = createdProjects.filter((project: ProjectType & { isMarkedAsDone: boolean }) => 
        project.isMarkedAsDone);
      break;
    case "Project Submissions":
      targetArr = submissions;
      break;
    default:
      hasContentToShow = false;
  }

  hasContentToShow = targetArr.length > 0 && category === "All" ||
    targetArr.some((record: any) => record.category === category);

  return (
    <div className="pt-6 px-3 w-full mx-auto flex flex-col">
      <div className="sticky">
        <h1 className="text-3xl font-bold text-white">My Projects & Submissions</h1>
        <div className="w-[80%] mx-auto my-5">
          <SearchBar
            placeholder="Search projects by title or description"
            query={query}
            setQuery={setQuery}
            className="mt-4"
          />
        </div>
        <div className="mx-auto">
          <RadioGroup
            options={["Created Projects", "Tracked Projects", "Projects Marked as Done", "Project Submissions"]}
            selected={submissionType}
            onClick={(value) => setSubmissionType(value)}
            isHorizontal={true}
            className="w-[65%] mx-auto mb-5"
            // rounded upper borders
            buttonClassName="rounded-t-lg"
          />
        </div>
      </div>
      <div className="w-[82%] fixed bottom-0 top-70 px-10 grid grid-cols-[200px_1fr] gap-10">
        <RadioGroup
          options={selections}
          selected={category}
          onClick={handleCategoryChange}
          isHorizontal={false}
          className="w-50"
        />
        {submissionType === "Project Submissions" ? (
          hasContentToShow ? (
            <div className="pt-5 flex flex-col gap-2">
              {submissions.map((submission: any) => {
                const project = createdProjects.find((proj: ProjectType) => proj.projectId === submission.projectId);
                if (!project) return null;
                if (category !== "All" && project.category !== category) return null;
                if (query && !submission.title.toLowerCase().includes(query.toLowerCase()) &&
                  !project.title.toLowerCase().includes(query.toLowerCase()) &&
                  !project.shortDescription.toLowerCase().includes(query.toLowerCase())) {
                  return null;
                }
                return (
                  <SubmissionCard key={submission.submissionId}
                    creator={submission.creator}
                    date={submission.postedOn}
                    title={submission.title}
                    repoLink={submission.repoLink}
                    onClick={() => navigateToDetails("project/submission", submission.submissionId)}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-white font-light text-4xl text-center mt-10">
              No {category === "All" ? "" : category} submissions found
            </p>
          )
        ) : (
          hasContentToShow ? (
            <div className="pt-5 grid grid-cols-3 gap-2 scroll-auto">
              {targetArr.map((project: any) => {
                if (category !== "All" && project.category !== category) return null;
                if (query && !project.title.toLowerCase().includes(query.toLowerCase()) &&
                  !project.shortDescription.toLowerCase().includes(query.toLowerCase())) {
                  return null;
                }
                return (
                  <ProjectCard 
                  key={project.projectId} 
                  projectId={project.projectId} 
                  title={project.title}
                  shortDescription={project.shortDescription}
                  difficulty={project.difficulty}
                  category={project.category}
                  trackCount={project.trackCount}
                  submissionCount={project.submissionCount}
                  creatorName={project.creatorName}
                  onClick={() => navigateToDetails("project", project.projectId)}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-white font-light text-4xl text-center mt-10">
              No {category === "All" ? "" : category} projects found
            </p>
          )
        )}
      </div>
    </div>
  );
};