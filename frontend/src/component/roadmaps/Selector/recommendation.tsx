import React from 'react';
import type { ProjectType, RecommendationType } from '@/lib/projectModuleTypes'; 
import ProjectCard from '@/component/projects/projectCard';
import AddRecommendation from './recommendationAdd';
import { useParams } from 'react-router';
import type { CareerItem } from '@/store/careerSlice';
import { CareerItemCard } from '@/component/career/Selector/careerCard';
import { useGetRoadmapRecommendation } from '@/api/roadmaps/recommendationAPI';
import { useGetAllBasicDetailsOnly } from '@/api/projects/projectsAPI';
import { useGetSingleChapter } from '@/api/roadmaps/chapterAPI';
import { useGetAllCareers } from '@/api/careers/careerAPI';
import { getActiveUserField } from '@/lib/utils';

interface RecommendationProps {
    mode: "career" | "project" | "roadmapProject" | "roadmapCareer"
    selectedID: number;
    navigateDetails?: (Id: number) => void;
    creator: string
}

const Recommendation: React.FC<RecommendationProps> = 
    ({mode, selectedID, creator }) => {
    const userID = getActiveUserField("userId");
    const role = getActiveUserField("role");
    const { roadmapID, roadmapSlug } = useParams<{ roadmapID: string, roadmapSlug: string }>();


    const { data: recommendedData = [], isLoading: recommendedLoading} = useGetRoadmapRecommendation();
    const { data: projects = [], isLoading: projectLoading } = useGetAllBasicDetailsOnly(userID!);
    const { data: careers = [], isLoading: careerLoading } = useGetAllCareers();
    const { data: pillar, isLoading: chapterLoading } = useGetSingleChapter(Number(roadmapID), selectedID, userID);

    if ( recommendedLoading || projectLoading || chapterLoading || careerLoading ) return <span className="text-amber-50 text-3xl">Loading Data...</span>
    type ProjectWithCreator = ProjectType & { creatorName: string };
    let filterRecommendedData: RecommendationType[] = [];
    let chapterProjects: ProjectWithCreator[] = [];
    let roadmapProjects: ProjectWithCreator[] = [];
    let roadmapCareers: CareerItem[] = [];

    if(mode === "project"){
        filterRecommendedData = recommendedData.filter(data => (data.sourceId === selectedID && data.sourceType === "chapter"));
        const uniqueProjectIds = [...new Set(filterRecommendedData.map(data => data.targetId))];
        chapterProjects = projects.filter((project: ProjectType) => 
            uniqueProjectIds.includes(project.projectId)
        );
    }

    if(mode === "roadmapProject"){
        filterRecommendedData = recommendedData.filter(data => (data.targetId === selectedID && data.targetType === "roadmap"));
        const uniqueProjectIds = [...new Set(filterRecommendedData.map(data => data.sourceId))];
        roadmapProjects = projects.filter((project: ProjectType) => 
            uniqueProjectIds.includes(project.projectId)
        );
    }

    if(mode === "career"){
        filterRecommendedData = recommendedData.filter(data => (data.sourceId === selectedID && data.sourceType === "roadmap"));
        const uniqueCareerIds = [...new Set(filterRecommendedData.map(data => data.targetId))];
        roadmapCareers = careers.filter((career: CareerItem) => 
            uniqueCareerIds.includes(career.career_id)
        );
    };

    if(mode === "roadmapCareer"){
        filterRecommendedData = recommendedData.filter(data => (data.targetId === selectedID && data.targetType === "roadmap"));
        const uniqueCareerIds = [...new Set(filterRecommendedData.map(data => data.sourceId))];
        roadmapCareers = careers.filter((career: CareerItem) => 
            uniqueCareerIds.includes(career.career_id)
        );
    };


    return (
        <>
            {mode === "project" && (
                <div className='pl-5 pr-5'>
                {filterRecommendedData.length > 0 ? (
                    <div className="flex flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden space-x-4">
                    {chapterProjects.map((project: ProjectWithCreator ) => (
                        <div className="flex-shrink-0 w-70" key={project.projectId}>

                            <ProjectCard 
                                key={project.projectId}
                                project={project}
                            />
                        </div>
                    ))}
                    {(userID === creator || role === "admin") && (
                    <AddRecommendation extraClass="h-full" link={`/roadmap/${roadmapID}/${roadmapSlug}/${pillar!.chapterID}/${pillar!.chapterSlug}/recommend-project`}/>)}
                </div>
                ) : (
                <>
                {(userID === creator || role === "admin") ?
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
                        <div className="flex-shrink-0 w-70" key={career.career_id}>
                            {/* Roadmap Suggested Career */}
                            <CareerItemCard key={career.career_id} {...career}/>
                        </div>
                    ))}
                    {(userID === creator || role === "admin") && (
                    <AddRecommendation extraClass=' h-full hover:scale-105 transform transition duration-300' 
                                       link={`/roadmap/${roadmapID}/${roadmapSlug}/recommend-career`}/>)}
                </div>
                ) : (
                <>
                {(userID === creator || role === "admin") ?
                    (<AddRecommendation extraClass=' flex flex-nowrap w-full hover:scale-105 transform' 
                                        link={`/roadmap/${roadmapID}/${roadmapSlug}/recommend-career`}/>)
                    :
                    (<p className="pl-5 text-sm text-gray-400">No suggested career found.</p>)}
                </>
                )
            }
            </div>)}

            {mode === "roadmapProject" && (
                <>
                <div className='pl-5 pr-5'>
                {filterRecommendedData.length > 0 ? (
                    <div className="flex flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden space-x-4">
                    {roadmapProjects.map((project: ProjectWithCreator ) => (
                        <div className="flex-shrink-0 w-70" key={project.projectId}>
                            <ProjectCard 
                                key={project.projectId}
                                project={project}
                            />
                        </div>
                    ))}
                    </div>
                ) : (
                <p className="pl-5 text-sm text-gray-400">No suggested projects found.</p>
                )
                }
                </div>
            </>)}

             {mode === "roadmapCareer" && (
                <>
                <div className='pl-5 pr-5'>
                {filterRecommendedData.length > 0 ? (
                    <div className="flex flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden space-x-4">
                    {roadmapCareers.map((career: CareerItem) => (
                        <div className="flex-shrink-0 w-70" key={career.career_id}>
                            {/* Roadmap Suggested Career */}
                            <CareerItemCard key={career.career_id} {...career}/>
                        </div>
                    ))}
                    </div>
                ) : (
                <p className="pl-5 text-sm text-gray-400">No suggested projects found.</p>
                )
                }
                </div>
            </>)}
        </>
    );
};

export default Recommendation