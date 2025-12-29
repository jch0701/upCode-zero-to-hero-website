import React from "react";
import SearchBar from "@/component/searchBar";
import { useState } from "react";
import RadioGroup from "../../component/projects/radioGroup.tsx";
import type { ProjectType } from "../../lib/projectModuleTypes.ts";
import { useGetAllBasicDetailsOnly } from "@/api/projects/projectsAPI.ts";
import { useGetAllSubmissionsByCreator } from "@/api/projects/submissionsAPI.ts";
import { loadUserInfo } from "@/lib/utils.ts";
import { categoryList } from "@/lib/types.ts";
import { useNavigate } from "react-router";
import ProjectCard from "../../component/projects/projectCard.tsx";
import SubmissionCard from "@/component/projects/submissionCard.tsx";
import { LoadingIcon } from "@/component/LoadingIcon";
import { NotLoggedIn } from "@/component/NotLoggedIn";
const selections = ["All", ...categoryList];
const categories = [{
  value: "created",
  label: "Created Projects",
}, {
  value: "tracked",
  label: "Tracked Projects",
}, {
  value: "done",
  label: "Projects Marked as Done",
}, {
  value: "submissions",
  label: "Project Submissions",
}]
export const MyProjects: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(selections[0]);
  const [submissionType, setSubmissionType] = useState<"created" | "tracked" | "done" | "submissions">("created");
  const userId = loadUserInfo()?.userId || null;

  const { data: createdProjects = [], isLoading: isLoadingCreatedProjects,
    isError: isErrorCreatedProjects, isSuccess: isSuccessCreatedProjects } = useGetAllBasicDetailsOnly(userId);
  const { data: submissions = [], isLoading: isLoadingSubmissions,
    isError: isErrorSubmissions, isSuccess: isSuccessSubmissions } = useGetAllSubmissionsByCreator(userId);

  if(!userId){
    return <NotLoggedIn />;
  }
  function handleCategoryChange(value: string) {
    setCategory(value);
  }

  if (isLoadingCreatedProjects || isLoadingSubmissions) {
    return (
      <div className="mt-2 pt-3 space-y-2 pl-9 bg-gray-800/20 rounded-2xl shadow-2xl w-7xl mx-auto h-[90vh] overflow-hidden">
        <LoadingIcon text="Loading Projects and Submissions..." />
      </div>
    );
  }

  if (isErrorCreatedProjects || isErrorSubmissions) {
    const errorMessage = isErrorCreatedProjects
      ? "Error loading created projects."
      : "Error loading submissions.";
    throw new Error(errorMessage);
  }
  let filteredProjects = [];

  if(isSuccessCreatedProjects){
    filteredProjects = createdProjects.filter((project: any) => project.creatorId === userId);
  }

  let hasContentToShow = false;
  let targetArr = [];
  if (isSuccessCreatedProjects && isSuccessSubmissions) {
    switch (submissionType) {
      case "created":
        targetArr = filteredProjects;
        break;
      case "tracked":
        targetArr = createdProjects.filter((project: ProjectType & { isTracking: boolean }) => project.isTracking);
        break;
      case "done":
        targetArr = createdProjects.filter((project: ProjectType & { isMarkedAsDone: boolean }) =>
          project.isMarkedAsDone);
        break;
      case "submissions":
        targetArr = submissions;
        break;
      default:
        hasContentToShow = false;
    }
    hasContentToShow = targetArr.length > 0 && (category === "All" ||
      targetArr.some((record: any) => record.category === category));
  }

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
            options={categories}
            selected={submissionType}
            onClick={(value) => setSubmissionType(value)}
            isHorizontal={true}
            className="w-[65%] mx-auto mb-5"
            // rounded upper borders
            buttonClassName="rounded-t-lg"
          />
        </div>
      </div>
      <div className="w-[82%] fixed top-70 bottom-0 px-10 grid grid-cols-[200px_1fr] gap-10">
        <RadioGroup
          options={selections}
          selected={category}
          onClick={handleCategoryChange}
          isHorizontal={false}
          className="w-50"
        />
        <div className="overflow-y-scroll mt-1 pb-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {submissionType === "submissions" ? (
            hasContentToShow ? (
              <div className="pt-5 flex flex-col gap-2">
                {filteredProjects.map((submission: any) => {
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
                      onClick={() => navigate(`/project/${submission.projectId}/submission/${submission.submissionId}`)}
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
              <div className="pt-5 grid grid-cols-3 gap-2 auto-rows-max">
                {targetArr.map((project: any) => {
                  if (category !== "All" && project.category !== category) return null;
                  if (query && !project.title.toLowerCase().includes(query.toLowerCase()) &&
                    !project.shortDescription.toLowerCase().includes(query.toLowerCase())) {
                    return null;
                  }
                  return (
                    <ProjectCard
                      key={project.projectId}
                      project={project}
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
    </div>
  );
};