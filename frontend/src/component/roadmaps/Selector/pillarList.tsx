import React, { useState } from 'react';
import PillarCard from '../Selector/pillarCard.tsx';
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import type { ProjectType } from '@/store/projectsSlice.ts';
import Recommendation from './recommendation.tsx';
import type { RecommendationType } from '@/store/recommendationSlice.ts';
import type { RoadmapType } from '@/store/roadmapSlice.ts';
import type { PillarType } from '@/store/pillarsSlice.ts';


interface PillarListProps {
    selectedRoadmapId: number; 
}

const PillarList: React.FC<PillarListProps> = ({ selectedRoadmapId }) => {
// Filter pillars based on selectedRoadmapId
const roadmapData = useSelector((state: any) => state.roadmap.roadmapList) as RoadmapType[];
const pillarsData = useSelector((state: any) => state.chapter.pillarList) as PillarType[];
const projects = useSelector((state: any) => state.projects.projectsList) as ProjectType[];
const recommendedData = useSelector((state: any) => state.recommendations.recommendations) as RecommendationType[];
const filteredPillars = pillarsData.filter(pillar => pillar.roadmapID === selectedRoadmapId);
const roadmapSlug = roadmapData.find(r => r.roadmapID === selectedRoadmapId)?.roadmapSlug || 'Unknown Roadmap Slug';
const roadmapTitle = roadmapData.find(r => r.roadmapID === selectedRoadmapId)?.title || 'Unknown Roadmap';
const creator = roadmapData.find(r => r.roadmapID === selectedRoadmapId)?.creatorID || 'Unknown creator';
const userID = localStorage.getItem("userID");
// order by 'order' field
filteredPillars.sort((a, b) => a.order - b.order);
const navigate = useNavigate();

function navigateToProjectDetails(projectId: number) {
    navigate(`/project/${projectId}`);
}

// Helper function to check if a pillar has project in recommended data
function hasProjects(pillar: PillarType): boolean {
    if(Number(userID) === creator) return true;
    const filterRecommendedData = recommendedData.filter(data => (data.sourceId === pillar.chapterID && data.sourceType === "Roadmap"));
    const uniqueChapterIds = [...new Set(filterRecommendedData.map(data => data.sourceId))];
    if(uniqueChapterIds.includes(pillar.chapterID)) return true;
    return false;
}

const [openChapterId, setOpenChapterId] = useState<number | null>(null);

function toggleProjectsVisibility(chapterID: number) {
    // If the clicked chapter is already open, close it (set to null)
    // Otherwise, open the clicked chapter
    setOpenChapterId(prevId => (prevId === chapterID ? null : chapterID));
}

    return (
        <div className="w-full mx-auto">
            <div className='flex items-center justify-between mb-6'>
                <h3 className="text-3xl font-semibold text-white text-left">
                    Chapters for {roadmapTitle}
                </h3>
                {((Number(userID) === creator) && 
                <Link to={`/roadmap/${selectedRoadmapId}/${roadmapSlug}/add-chapter`}>
                    <button className=' px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition'>
                        Add chapter
                    </button>
                </Link>)}
            </div>
            {filteredPillars.length === 0 ? (
                <p className="text-gray-400 text-center mt-10">No chapters found for this roadmap.</p>
            ) : (filteredPillars.map((pillar) => (
                <div key={pillar.chapterID} className='mb-4'>
                    <PillarCard 
                        key={pillar.chapterID}
                        selectedChapterID={pillar.chapterID}
                        onToggleClick={toggleProjectsVisibility}
                        isOpen={openChapterId === pillar.chapterID}
                        showArrow={hasProjects(pillar)}
                    />
                    {openChapterId === pillar.chapterID && (
                        <Recommendation
                            pillar={pillar}
                            projects={projects}
                            navigateToProjectDetails={navigateToProjectDetails}
                            creator={creator.toString()}
                        />
                    )}
                </div>
            )))}
        </div>
    );
};

export default PillarList;