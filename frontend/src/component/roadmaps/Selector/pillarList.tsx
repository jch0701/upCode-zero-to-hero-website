import React, { useState } from 'react';
import PillarCard from '../Selector/pillarCard.tsx';
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Recommendation from './recommendation.tsx';
import type { RecommendationType } from '@/store/recommendationSlice.ts';
import type { PillarType } from '@/store/pillarsSlice.ts';
import { useGetSingleRoadmap } from '@/api/roadmaps/roadmapAPI.ts';
import { useGetRoadmapChapters } from '@/api/roadmaps/chapterAPI.ts';


interface PillarListProps {
    selectedRoadmapId: number; 
}

const PillarList: React.FC<PillarListProps> = ({ selectedRoadmapId }) => {

const userID = localStorage.getItem("userID");
const { roadmapID } = useParams<{ roadmapID: string }>();
const { data: roadmapData = []} = useGetSingleRoadmap(Number(roadmapID), userID)
const { data: pillarsData = []} = useGetRoadmapChapters(selectedRoadmapId, userID) as {data: PillarType[]}

// Filter pillars based on selectedRoadmapId
const recommendedData = useSelector((state: any) => state.recommendations.recommendations) as RecommendationType[];
const roadmapSlug = roadmapData?.roadmapSlug || 'Unknown Roadmap Slug';
const roadmapTitle = roadmapData?.title || 'Unknown Roadmap';
const creator = roadmapData?.creatorID || 'Unknown creator';

// order by 'order' field
pillarsData.sort((a, b) => a.order - b.order);
const navigate = useNavigate();

function navigateToProjectDetails(projectId: number) {
    navigate(`/project/${projectId}`);
}

// Helper function to check if a pillar has project in recommended data
function hasProjects(pillar: PillarType): boolean {
    if(Number(userID) === creator) return true;
    const filterRecommendedData = recommendedData.filter(data => (data.sourceId === pillar.chapterID && data.sourceType === "Chapter"));
    const uniqueChapterIds = [...new Set(filterRecommendedData.map(data => data.sourceId))];
    if(uniqueChapterIds.includes(pillar.chapterID)) return true;
    return false;
}

// Helper function to check if a roadmap has career in recommended data
function hasCareer(): boolean {
    if(Number(userID) === creator) return true;
    const filterRecommendedData = recommendedData.filter(data => (data.sourceId === selectedRoadmapId && data.sourceType === "Roadmap"));
    const uniqueRoadmapIds = [... new Set(filterRecommendedData.map(data => data.sourceId))];
    if(uniqueRoadmapIds.includes(selectedRoadmapId)) return true;
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
            {pillarsData.length === 0 ? (
                <p className="text-gray-400 text-center mt-10">No chapters found for this roadmap.</p>
            ) : (pillarsData.map((pillar) => (
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
                            mode="project"
                            selectedID={pillar.chapterID}
                            navigateDetails={navigateToProjectDetails}
                            creator={creator.toString()}
                        />
                    )}
                </div>
            )))}

                {hasCareer() && (
                    <div>
                        <hr className="border-t border-gray-600 my-4" />
                        <br></br>
                        <h3 className='text-3xl font-semibold text-white text-left'>Recommended Career</h3>
                        <Recommendation
                            mode="career"
                            selectedID={selectedRoadmapId}
                            creator={creator.toString()}
                        />
                    </div>
                )}
        </div>
    );
};

export default PillarList;