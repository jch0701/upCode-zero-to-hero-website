import { useGetAllBasicDetailsOnly } from "@/api/projects/projectsAPI";
import { useGetRoadmaps } from "@/api/roadmaps/roadmapAPI";
import { loadUserInfo } from "@/lib/utils";
import { useNavigate } from "react-router";
import { RoadmapItemCard } from "../roadmaps/Selector/roadmapCard";
import ProjectCard from "../projects/projectCard";

export function WhatsNew() {
  const navigate = useNavigate();
  const userId = loadUserInfo()?.userId;
  const { data: projectsData, status: projectsStatus } = useGetAllBasicDetailsOnly(userId);
  const { data: roadmapsData, status: roadmapsStatus } = useGetRoadmaps(userId);
  if (projectsStatus === "pending" || roadmapsStatus === "pending") {
    return <p className="text-white/95 text-2xl">Loading...</p>;
  }
  if (projectsStatus === "error" || roadmapsStatus === "error") {
    return <p className="text-white/95 text-2xl">Error loading latest roadmaps and projects.</p>;
  }
  let latestProjects: any[] = [], latestRoadmaps: any[] = [];

  if (projectsData && roadmapsData) {
    latestProjects = (projectsData || [])
      .slice()
      .sort((a: any, b: any) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
      .slice(0, 3);
    latestRoadmaps = (roadmapsData || [])
      .slice()
      .sort((a: any, b: any) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
      .slice(0, 3);
  }

  return (
    <div className="space-y-8 flex flex-col">
      {/* Latest Roadmaps */}
      <div>
        <h3 className="text-2xl text-left font-semibold text-white mb-4">
          <span onClick={() => navigate('/roadmap')} className="cursor-pointer hover:text-amber-200">
            The Latest Roadmaps
          </span>
        </h3>
        {latestRoadmaps.length === 0 ? (
          <p className="text-white/95 text-2xl">No roadmaps available.</p>
        ) : (
          <div className="flex justify-start gap-3 scroll-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {latestRoadmaps.map((roadmap: any) => (
              <RoadmapItemCard key={roadmap.id} selectedRoadmapID={roadmap.roadmapID} />
            ))}
          </div>
        )}
      </div>
      {/* Latest Projects */}
      <div>
        <h3 className="text-2xl text-left font-semibold text-white mb-4">
          <span onClick={() => navigate('/project')} className="cursor-pointer hover:text-amber-200">
            The Latest Projects
          </span>
        </h3>
        {latestProjects.length === 0 ? (
          <p className="text-white/95 text-2xl">No projects available.</p>
        ) : (
          <div className="flex justify-start gap-3 scroll-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {latestProjects.map((project: any) => (
              <ProjectCard
                key={project.projectId}
                project={project}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )

}
