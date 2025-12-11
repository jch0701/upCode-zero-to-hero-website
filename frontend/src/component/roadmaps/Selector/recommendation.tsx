import React from 'react';
import type { ProjectType } from '@/store/projectsSlice';
import ProjectCard from '@/component/projects/projectCard';
import AddRecommendation from './recommendationAdd';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import type { PillarType } from '@/store/pillarsSlice';

interface Recommendation {
  recommendationId: number;
  sourceId: number;
  targetId: number;
  sourceType: string;
  targetType: string;
}

const Recommendation: React.FC<{ pillar: PillarType ; projects: ProjectType[]; navigateToProjectDetails: (projectId: number) => void; creator: string }> = 
    ({pillar, projects, navigateToProjectDetails, creator }) => {
    const recommendedData = useSelector((state: any) => state.recommendations.recommendations) as Recommendation[];
    const filterRecommendedData = recommendedData.filter(data => (data.sourceId === pillar.chapterID && data.sourceType === "Roadmap"));
    const uniqueProjectIds = [...new Set(filterRecommendedData.map(data => data.targetId))];
    const userID = localStorage.getItem("userID");
    const { roadmapID, roadmapSlug } = useParams<{ roadmapID: string, roadmapSlug: string }>();
    const chapterProjects = projects.filter((project: ProjectType) => 
        uniqueProjectIds.includes(project.projectId)
    );

    return (
        <div className='pl-5 pr-5'>
            {filterRecommendedData.length > 0 ? (
                <div className="flex flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden space-x-4">
                {chapterProjects.map((project: ProjectType) => (
                    <div className="flex-shrink-0 w-70" key={project.projectId}>

                        <ProjectCard 
                            projectId={project.projectId}
                            onClick={() => navigateToProjectDetails(project.projectId)}
                        />
                    </div>
                ))}
                {userID === creator && (
                <AddRecommendation link={`/roadmap/${roadmapID}/${roadmapSlug}/${pillar.chapterID}/${pillar.chapterSlug}/recommend-project`}/>)}
            </div>
            ) : (
            <>
            {userID === creator ?
                (<AddRecommendation extraClass='mx-auto' link={`/roadmap/${roadmapID}/${roadmapSlug}/${pillar.chapterID}/${pillar.chapterSlug}/recommend-project`}/>)
                :
                (<p className="pl-5 text-sm text-gray-400">No suggested projects found.</p>)}
            </>
            )
        }
        </div>
    );
};

export default Recommendation