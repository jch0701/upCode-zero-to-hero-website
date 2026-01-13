import React, { useMemo } from 'react';
import { useGetAllBasicDetailsOnly } from '@/api/projects/projectsAPI';
import { useGetRoadmaps } from '@/api/roadmaps/roadmapAPI';
import ProjectCard from '@/component/projects/projectCard';
import { RoadmapItemCard } from '@/component/roadmaps/Selector/roadmapCard';
import { getActiveUserField } from '@/lib/utils';
import type { CareerItem } from '@/store/careerSlice';
import { LoadingIcon } from '@/component/LoadingIcon';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import search_icon from "../../assets/search_icon.png"

interface CareerRecommendationsProps {
  career: CareerItem;
}

export const CareerRecommendations: React.FC<CareerRecommendationsProps> = ({ career }) => {
  const userID = getActiveUserField('userId');
  
  // Fetch all projects and roadmaps
  const { data: projects = [], isLoading: isLoadingProjects } = useGetAllBasicDetailsOnly(userID);
  const { data: roadmaps = [], isLoading: isLoadingRoadmaps } = useGetRoadmaps(userID);

  const tags = useMemo(() => {
     const t = [];
     if (career.category) t.push(career.category.toLowerCase());
     if (career.prerequisites) {
         t.push(...career.prerequisites.map(p => p.toLowerCase()));
     }
     return t;
  }, [career]);

  const recommendedProjects = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    
    return projects.filter((project: any) => {
        // Match Category (Exact or Partial)
        const projCategory = project.category?.toLowerCase() || '';
        if (tags.some(tag => projCategory.includes(tag) || tag.includes(projCategory))) return true;

        // Match Difficulty if available (e.g. "Beginner" career -> "Beginner" or "Easy" project)
        if (career.level && project.difficulty) {
             const careerLevel = career.level.toLowerCase();
             const projDiff = project.difficulty.toLowerCase();
             if (careerLevel === projDiff) return true;
        }

        // Match Title keywords
        const projTitle = project.title.toLowerCase();
        if (tags.some(tag => projTitle.includes(tag))) return true;

        return false;
    }).slice(0, 4); // Limit to 4 recommendations
  }, [projects, tags, career.level]);

  const recommendedRoadmaps = useMemo(() => {
      if (!roadmaps || roadmaps.length === 0) return [];

      return roadmaps.filter((roadmap: any) => {
          const roadmapTitle = roadmap.title?.toLowerCase() || '';
          
          // Match Title with tags
          if (tags.some(tag => roadmapTitle.includes(tag))) return true;
          
          return false;
      }).slice(0, 4); // Limit to 4 recommendations
  }, [roadmaps, tags]);

  if (isLoadingProjects || isLoadingRoadmaps) {
      return <LoadingIcon text="Loading recommendations..." />;
  }

  // If nothing found, don't show the section at all? 
  // Or show it empty like InterModuleRelations does with "No related..."?
  // Let's hide it if fully empty to avoid clutter, unless user prefers consistency.
  // InterModuleRelations shows "No related..." if array is empty. 
  // But here we are filtering automatically. Let's defaults to hiding if absolutely nothing to show.
  if (recommendedProjects.length === 0 && recommendedRoadmaps.length === 0) {
      return null;
  }

  return (
    <Collapsible className="w-full rounded-2xl p-[0.1rem] text-sm font-semibold bg-gray-800 text-white">
      <CollapsibleTrigger className="p-2 rounded-2xl w-full cursor-pointer">
        <div className="flex items-center pl-5 justify-between gap-4 px-4 text-white">
          <p>Related Projects and Roadmaps</p>
          <img src={search_icon} alt="Toggle" className="w-7 rotate-90 cursor-pointer hover:bg-gray-600/80 p-1 rounded-xl" />
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent className="pl-5 my-2 pb-5 pt-3 px-4 space-y-3 border-t-2 border-gray-700">
        <div>
            <h1 className="text-2xl">Related Projects</h1>
            <span className="text-[1rem] italic font-extralight">
                Look at these projects to practice the skills needed for this career!
            </span>
            <div className="mt-2">
                 {recommendedProjects.length === 0 ? <p>No related projects found.</p> :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
                        {recommendedProjects.map((project: any) => (
                            <ProjectCard key={project.projectId} project={project} />
                        ))}
                    </div>
                 }
            </div>
        </div>

        <div>
            <h1 className="text-2xl">Related Roadmaps</h1>
            <span className="text-[1rem] italic font-extralight">
                Explore these roadmaps to learn the necessary concepts.
            </span>
            <div className="mt-2">
                 {recommendedRoadmaps.length === 0 ? <p>No related roadmaps found.</p> :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
                        {recommendedRoadmaps.map((roadmap: any) => (
                            <RoadmapItemCard 
                                key={roadmap.roadmapID} 
                                selectedRoadmapID={roadmap.roadmapID}
                                customTitle={roadmap.title}
                            />
                        ))}
                    </div>
                 }
            </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
