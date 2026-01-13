import { useGetRoadmapsWithProgress } from "@/api/roadmaps/roadmapAPI";
import { useGetAllSubmissionsByCreator } from "@/api/projects/submissionsAPI";
import { useGetAllRelatedProjects } from "@/api/projects/projectsAPI";
import { loadUserInfo } from "@/lib/utils";
import { MiniCard } from "./miniCard";
import { useNavigate } from "react-router";
import { useState } from "react";
import done_icon from "@/assets/done_icon.png";

export const ProgressDisplay: React.FC = () => {
  const navigate = useNavigate();
  const userInfo = loadUserInfo()?.userId;
  const { data: relatedProjects, status: relatedProjectsStatus } = useGetAllRelatedProjects(userInfo || null);
  const { data: roadmapsWithProgress, status: roadmapsWithProgressStatus } = useGetRoadmapsWithProgress(userInfo || null);
  const { data: userSubmissions, status: userSubmissionsStatus } = useGetAllSubmissionsByCreator(userInfo || null);
  const [displaySection, setDisplaySection] = useState<string>('roadmaps');

  let createdProjects: any[] = [], markedProjects: any[] = [];
  relatedProjects && relatedProjects.forEach((project: any) => {
    if (project.fetchType === "created") {
      createdProjects.push(project);
    } else if (project.fetchType === "markedAsDone" || project.fetchType === "tracking") {
      markedProjects.push(project);
    }
  });

  if (relatedProjectsStatus !== 'success' || roadmapsWithProgressStatus !== 'success' || userSubmissionsStatus !== 'success') {
    return <div>Loading...</div>;
  }

  let radios = [
    { label: 'Roadmaps', value: 'roadmaps' },
    { label: 'Projects', value: 'trackedProjects' },
    { label: 'Completions', value: 'submissions' },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Radio Buttons */}
      <div className="flex space-x-4 px-4">
        {radios.map((radio) => (
          <button
            key={radio.value}
            className={`px-4 py-2 font-semibold text-sm cursor-pointer transition-colors rounded-lg ${displaySection === radio.value
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
              : 'text-gray-300 hover:text-white hover:bg-gray-700/30'
              }`}
            onClick={() => setDisplaySection(radio.value)}
          >
            {radio.label}
          </button>
        ))}
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-gray-600 w-[95%] min-h-100 bg-gray-800">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-700 border-b border-gray-600">
              <th className="px-4 py-3 text-left text-sm font-semibold text-white">
                Title</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-white">
                {displaySection === "roadmaps" ? "Completion rate" : ""}</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              switch (displaySection) {
                case 'roadmaps':
                  return (
                    <>
                      {
                        roadmapsWithProgress?.length === 0 && (
                          <tr>
                            <td className="px-4 py-3 text-left text-sm text-gray-400" colSpan={2}>
                              No roadmaps found.
                            </td>
                          </tr>
                        )
                      }
                      {
                        roadmapsWithProgress?.slice().sort((a,b)=>b.progress -a.progress).map((roadmap, idx) => (
                          <MiniCard
                            key={roadmap.roadmapID}
                            title={roadmap.title}
                            value={roadmap.progress}
                            type="roadmap"
                            onClick={() => navigate(`/roadmap/${roadmap.roadmapID}/${roadmap.title}`)}
                            index={idx}
                          />
                        ))
                      }
                    </>
                  );
                case 'trackedProjects':
                  return (
                    <>
                      {
                        relatedProjects?.length === 0 ? (
                          <tr>
                            <td className="px-4 py-3 text-left text-sm text-gray-400" colSpan={2}>
                              No projects found.
                            </td>
                          </tr>
                        ) : (
                          <>
                            <tr>
                              <td>
                                <h2 className="text-left text-[1.2rem] ml-4 my-4 font-bold text-white">
                                  Projects you've created</h2>
                              </td>
                            </tr>
                            {
                              createdProjects.map((project: any, idx: number) => (
                                <MiniCard
                                  key={project.projectId}
                                  title={project.title}
                                  icon={project.fetchType === "markedAsDone" ? done_icon : undefined}
                                  type="project"
                                  onClick={() => navigate(`/project/${project.projectId}`)}
                                  index={idx}
                                />
                              ))
                            }
                            <tr>
                              <td>
                                <h2 className="text-left text-[1.2rem] ml-4 my-4 font-bold text-white">
                                  Projects you're tracking</h2>
                              </td>
                            </tr>
                            {
                              markedProjects?.map((project: any, idx: number) => (
                                <MiniCard
                                  key={project.projectId}
                                  title={project.title}
                                  icon={project.fetchType === "markedAsDone" ? done_icon : undefined}
                                  type="project"
                                  onClick={() => navigate(`/project/${project.projectId}`)}
                                  index={idx}
                                />
                              ))
                            }
                          </>
                        )
                      }
                    </>
                  );
                case 'submissions':
                  return (
                    <>
                    {
                      userSubmissions?.length === 0 ? (
                        <tr>
                          <td className="px-4 py-3 text-left text-1xl text-gray-400" colSpan={2}>
                            No submissions found.
                          </td>
                        </tr>
                      ) : (
                        userSubmissions.map((submission: any, idx: number) => (
                          <MiniCard
                            key={submission.id}
                            title={submission.title}
                            repoLink={submission.repoLink}
                            type="submission"
                            onClick={() => navigate(`/projects/${submission.projectID}/submissions/${submission.id}`)}
                            index={idx}
                          />
                        ))
                      )
                    }
                    </>
                  );
              }
            })()}
          </tbody>
        </table>
      </div>
    </div>
  )
}