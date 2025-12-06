import React from 'react';
import PillarCard, { type PillarCardProps } from './pillarCard.tsx';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import type { RoadmapItemCardProps } from './roadmapCard.tsx';

interface PillarListProps {
    selectedRoadmapId: number; 
}

const PillarList: React.FC<PillarListProps> = ({ selectedRoadmapId }) => {
// Filter pillars based on selectedRoadmapId
const roadmapData = useSelector((state: any) => state.roadmap.roadmapList) as RoadmapItemCardProps[];
const pillarsData = useSelector((state: any) => state.chapter.pillarList) as PillarCardProps[];
const filteredPillars = pillarsData.filter(pillar => pillar.roadmapID === selectedRoadmapId);
const roadmapSlug = roadmapData.find(r => r.roadmapID === selectedRoadmapId)?.roadmapSlug || 'Unknown Roadmap Slug';
const roadmapTitle = roadmapData.find(r => r.roadmapID === selectedRoadmapId)?.title || 'Unknown Roadmap';
const creator = roadmapData.find(r => r.roadmapID === selectedRoadmapId)?.creator || 'Unknown creator';
const userID = localStorage.getItem("userID");
// order by 'order' field
filteredPillars.sort((a, b) => a.order - b.order);

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
                <PillarCard 
                    key={pillar.chapterID}
                    {...pillar}
                />
            )))}
        </div>
    );
};

export default PillarList;