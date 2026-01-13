import React from "react";
import SearchBar from "@/component/searchBar";
import { useState } from "react";
import RadioGroup from "../../component/projects/radioGroup.tsx";
import type { ProjectType } from "../../lib/projectModuleTypes.ts";
import { useGetAllBasicDetailsOnly } from "@/api/projects/projectsAPI.ts";
import { NoProjectsFound } from "@/component/NoProjectsFound.tsx";
import { useGetAllSubmissionsByCreator } from "@/api/projects/submissionsAPI.ts";
import { loadUserInfo } from "@/lib/utils.ts";
import { categoryList } from "@/lib/types.ts";
import { useNavigate } from "react-router";
import ProjectCard from "../../component/projects/projectCard.tsx";
import SubmissionCard from "@/component/projects/submissionCard.tsx";
import { LoadingIcon } from "@/component/LoadingIcon";
import { NotLoggedIn } from "@/component/NotLoggedIn";

const selections = ["All", ...categoryList].map((category) => {
  return {
    value: category,
    label: category,
  };
});

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
  const [category, setCategory] = useState(selections[0].value);
  const [submissionType, setSubmissionType] = useState<"created" | "tracked" | "done" | "submissions">("created");
  const userId = loadUserInfo()?.userId || null;
  const submissionSorted: { [key: string]: { [key: string]: any[] } } = {};

  const { data: createdProjects = [], isLoading: isLoadingCreatedProjects,
    isError: isErrorCreatedProjects, isSuccess: isSuccessCreatedProjects } = useGetAllBasicDetailsOnly(userId);
  const { data: submissions = [], isLoading: isLoadingSubmissions,
    isError: isErrorSubmissions, isSuccess: isSuccessSubmissions } = useGetAllSubmissionsByCreator(userId);

  if (!userId) {
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

  if (isSuccessCreatedProjects) {
    filteredProjects = createdProjects.filter((project: any) => project.creatorId === userId);
  }

  let hasContentToShow = false;
  let targetArr = [];
  if (isSuccessCreatedProjects) {
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
      default:
        hasContentToShow = false;
    }
    hasContentToShow = targetArr.length > 0 && (category === "All" ||
      targetArr.some((record: any) => record.category === category));
  }
  if (isSuccessSubmissions && submissionType === "submissions") {
    submissions.map((sub: any) => {
      if (!submissionSorted[sub.category]) {
        submissionSorted[sub.category] = {};
      }
      if (!submissionSorted[sub.category][sub.projectId]) {
        submissionSorted[sub.category][sub.projectId] = [];
      }
      submissionSorted[sub.category][sub.projectId].push(sub);
    });
    hasContentToShow = submissions.length > 0 && (category === "All" || !!submissionSorted[category]);
  }
  console.log("submissionSorted:", submissionSorted);

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
        />
        <div className="bg-gray-800/40 rounded-2xl shadow-2xl overflow-y-scroll mt-1 pb-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {submissionType === "submissions" ? (
            hasContentToShow ? (
              <div className="pt-5 flex flex-col gap-4">
                {
                  Object.entries(submissionSorted).map(([categoryKey, projectSubmissions]) => {
                    if (category !== "All" && categoryKey !== category) return null;
                    return (
                      <div key={categoryKey}>
                        {
                          categoryKey === "All" &&
                          <h2 className="text-xl font-semibold text-white mb-3">{categoryKey}</h2>
                        }
                        {Object.entries(projectSubmissions).map(([projectId, submissions]: [string, any]) => {
                          return (
                            <div key={projectId} className="mb-4 px-4">
                              <h3 className="text-lg text-left pl-2 font-medium text-white mb-2">{submissions[0].projectTitle}</h3>
                              <div className="flex flex-col gap-2">
                                {
                                  submissions.map((submission: any) => {
                                    return (
                                      <SubmissionCard key={submission.submissionId}
                                        creator={submission.creator}
                                        date={submission.postedOn}
                                        title={submission.title}
                                        repoLink={submission.repoLink}
                                        onClick={() => navigate(`/project/${submission.projectId}/submission/${submission.submissionId}`)}
                                      />
                                    );
                                  })
                                }
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })
                }
              </div>
            ) : (
              <NoProjectsFound category={category === "All" ? "" : category} openType="submissions" />
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
                      className="h-70"
                    />
                  );
                })}
              </div>
            ) : (
              <NoProjectsFound category={category === "All" ? "" : category} openType="projects" />
            )
          )}
        </div>
      </div>
    </div>
  );
};