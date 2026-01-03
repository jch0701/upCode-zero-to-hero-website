
import { useEffect, useState } from 'react';
import Api from "@/api/index";
import ProjectCard from "@/component/projects/projectCard";
import { LoadingIcon } from "@/component/LoadingIcon";

interface ProfileProjectsProps {
  userId: string;
}

export function ProfileProjects({ userId }: ProfileProjectsProps) {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!userId) return;
      setIsLoading(true);
      try {
        // Direct call to avoid modifying projectsAPI.ts
        const { data } = await Api.get(`/projects/getAllRelatedToUser/${userId}`);
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects for profile:", err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingIcon text="Loading Projects..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-400 text-center py-20">
        Failed to load projects.
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-gray-400 text-center py-20">
        No projects found for this user.
      </div>
    );
  }

  return (
    <div>
      <label className="block text-center text-indigo-600 text-6xl font-bold pt-1 mt-2 -mb-15">
        Projects
      </label>
      <div className="w-full flex justify-center items-center py-20">
        <div className="w-full max-w-6xl bg-gray-800/70 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <ProjectCard key={project.projectId} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
