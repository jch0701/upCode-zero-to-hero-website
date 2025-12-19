import React from 'react';
import type { ProjectType } from '@/lib/projectModuleTypes'; 
import ProjectCard from '@/component/projects/projectCard';
import AddRecommendation from './recommendationAdd';
import { useParams } from 'react-router';
import type { CareerItem } from '@/store/careerSlice';
import type { RecommendationType } from '@/lib/projectModuleTypes'; 
import { CareerItemCard } from '@/component/career/Selector/careerCard';
import { useGetRoadmapRecommendation } from '@/api/roadmaps/recommendationAPI';
import { useGetAllBasicDetailsOnly } from '@/api/projects/projectsAPI';
import { useGetSingleChapter } from '@/api/roadmaps/chapterAPI';
import { useGetSingleRoadmap } from '@/api/roadmaps/roadmapAPI';
import { useGetAllCareers } from '@/api/careers/careerAPI';

interface RecommendationProps {
    mode: "career" | "project"
    selectedID: number;
    navigateDetails?: (Id: number) => void;
    creator: string
}

const Recommendation: React.FC<RecommendationProps> = 
    ({mode, selectedID, navigateDetails, creator }) => {
    const userID = localStorage.getItem("userID");
    const { roadmapID, roadmapSlug } = useParams<{ roadmapID: string, roadmapSlug: string }>();


    const { data: recommendedData = [], isLoading: recommendedLoading} = useGetRoadmapRecommendation();
    const { data: projects = [], isLoading: projectLoading } = useGetAllBasicDetailsOnly(Number(userID));
    const { data: careers = [], isLoading: careerLoading } = useGetAllCareers();
    const { data: pillar, isLoading: chapterLoading } = useGetSingleChapter(Number(roadmapID), selectedID, userID);
    const { data: roadmap, isLoading: roadmapLoading } = useGetSingleRoadmap(Number(roadmapID), userID);

    if ( recommendedLoading || projectLoading || chapterLoading || roadmapLoading || careerLoading ) return <span className="text-amber-50 text-3xl">Loading Data...</span>
    if ( !recommendedData || !projects || !pillar || !roadmap || !careers ) return null;

    let filterRecommendedData: RecommendationType[] = [];
    let chapterProjects: ProjectType[] = [];
    let roadmapCareers: CareerItem[] = [];

    if(mode === "project"){
        filterRecommendedData = recommendedData.filter(data => (data.sourceId === pillar!.chapterID && data.sourceType === "chapter"));
        const uniqueProjectIds = [...new Set(filterRecommendedData.map(data => data.targetId))];
        chapterProjects = projects!.filter((project: ProjectType) => 
            uniqueProjectIds.includes(project.projectId)
        );
    }
    else if(mode === "career"){
        filterRecommendedData = recommendedData.filter(data => (data.sourceId === roadmap!.roadmapID && data.sourceType === "roadmap"));
        const uniqueCareerIds = [...new Set(filterRecommendedData.map(data => data.targetId))];
        roadmapCareers = careers!.filter((career: CareerItem) => 
            uniqueCareerIds.includes(career.id)
        );
    };


    return (
        <>
            {mode === "project" && (
                <div className='pl-5 pr-5'>
                {filterRecommendedData.length > 0 ? (
                    <div className="flex flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden space-x-4">
                    {chapterProjects.map((project: ProjectType) => (
                        <div className="flex-shrink-0 w-70" key={project.projectId}>

                            <ProjectCard 
                                key={project.projectId}
                                {...project}
                                creatorName={project.title}
                                onClick={() => navigateDetails && navigateDetails(project.projectId)}
                            />
                        </div>
                    ))}
                    {userID === creator && (
                    <AddRecommendation extraClass="h-full" link={`/roadmap/${roadmapID}/${roadmapSlug}/${pillar!.chapterID}/${pillar!.chapterSlug}/recommend-project`}/>)}
                </div>
                ) : (
                <>
                {userID === creator ?
                    (<AddRecommendation extraClass=' flex flex-nowrap w-full' link={`/roadmap/${roadmapID}/${roadmapSlug}/${pillar!.chapterID}/${pillar!.chapterSlug}/recommend-project`}/>)
                    :
                    (<p className="pl-5 text-sm text-gray-400">No suggested projects found.</p>)}
                </>
                )
            }
            </div>)}

            {mode === "career" && (
                <div className='pl-5 pr-5'>
                {filterRecommendedData.length > 0 ? (
                    <div className="flex flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden space-x-4">
                    {roadmapCareers.map((career: CareerItem) => (
                        <div className="flex-shrink-0 w-70" key={career.id}>
                            {/* Roadmap Suggested Career */}
                            <CareerItemCard key={career.id} {...career}/>
                        </div>
                    ))}
                    {userID === creator && (
                    <AddRecommendation extraClass=' h-full hover:scale-105 transform transition duration-300' 
                                       link={`/roadmap/${roadmapID}/${roadmapSlug}/recommend-career`}/>)}
                </div>
                ) : (
                <>
                {userID === creator ?
                    (<AddRecommendation extraClass=' flex flex-nowrap w-full hover:scale-105 transform' 
                                        link={`/roadmap/${roadmapID}/${roadmapSlug}/recommend-career`}/>)
                    :
                    (<p className="pl-5 text-sm text-gray-400">No suggested career found.</p>)}
                </>
                )
            }
            </div>)}
        </>
    );
};

export default Recommendation