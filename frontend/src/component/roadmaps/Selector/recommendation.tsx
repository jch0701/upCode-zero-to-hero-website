import React from 'react';
import type { ProjectType } from '@/store/projectsSlice';
import ProjectCard from '@/component/projects/projectCard';
import AddRecommendation from './recommendationAdd';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import type { PillarType } from '@/store/pillarsSlice';
import type { RoadmapType } from '@/store/roadmapSlice';
import type { CareerItem } from '@/store/careerSlice';
import { CareerItemCard } from '@/component/career/Selector/careerCard';

interface Recommendation {
  recommendationId: number;
  sourceId: number;
  targetId: number;
  sourceType: string;
  targetType: string;
}

interface RecommendationProps {
    mode: "career" | "project"
    selectedID: number;
    projects?: ProjectType[];
    careers?: CareerItem[];
    navigateDetails: (Id: number, slug: string) => void;
    creator: string
}

const Recommendation: React.FC<RecommendationProps> = 
    ({mode, selectedID, projects, careers, navigateDetails, creator }) => {
    const recommendedData = useSelector((state: any) => state.recommendations.recommendations) as Recommendation[];
    let pillar: PillarType | undefined;
    let roadmap: RoadmapType | undefined;
    let filterRecommendedData: Recommendation[] = [];
    let chapterProjects: ProjectType[] = [];
    let roadmapCareers: CareerItem[] = [];

    if(mode === "project"){
        const pillarData = useSelector((state: any) => state.chapter.pillarList) as PillarType[];
        pillar = pillarData.find(r => r.chapterID === selectedID)
        if(!pillar) return <p className="text-white text-center mt-10">Chapter not found</p>;
        filterRecommendedData = recommendedData.filter(data => (data.sourceId === pillar!.chapterID && data.sourceType === "Chapter"));
        const uniqueProjectIds = [...new Set(filterRecommendedData.map(data => data.targetId))];
        chapterProjects = projects!.filter((project: ProjectType) => 
            uniqueProjectIds.includes(project.projectId)
        );
    }
    else if(mode === "career"){
        const roadmapData = useSelector((state: any) => state.roadmap.roadmapList) as RoadmapType[];
        roadmap = roadmapData.find(r => r.roadmapID === selectedID)
        if(!roadmap) return <p className="text-white text-center mt-10">Roadmap not found</p>;
        filterRecommendedData = recommendedData.filter(data => (data.sourceId === roadmap!.roadmapID && data.sourceType === "Roadmap"));
        const uniqueCareerIds = [...new Set(filterRecommendedData.map(data => data.targetId))];
        roadmapCareers = careers!.filter((career: CareerItem) => 
            uniqueCareerIds.includes(career.id)
        );
    };

    const userID = localStorage.getItem("userID");
    const { roadmapID, roadmapSlug } = useParams<{ roadmapID: string, roadmapSlug: string }>();


    return (
        <>
            {mode === "project" && (
                <div className='pl-5 pr-5'>
                {filterRecommendedData.length > 0 ? (
                    <div className="flex flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden space-x-4">
                    {chapterProjects.map((project: ProjectType) => (
                        <div className="flex-shrink-0 w-70" key={project.projectId}>

                            <ProjectCard 
                                projectId={project.projectId}
                                onClick={() => navigateDetails(project.projectId, "")}
                            />
                        </div>
                    ))}
                    {userID === creator && (
                    <AddRecommendation link={`/roadmap/${roadmapID}/${roadmapSlug}/${pillar!.chapterID}/${pillar!.chapterSlug}/recommend-project`}/>)}
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
                    <AddRecommendation extraClass=' h-100 ' link={`/roadmap/${roadmapID}/${roadmapSlug}/recommend-career`}/>)}
                </div>
                ) : (
                <>
                {userID === creator ?
                    (<AddRecommendation extraClass=' flex flex-nowrap w-full' link={`/roadmap/${roadmapID}/${roadmapSlug}/recommend-career`}/>)
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