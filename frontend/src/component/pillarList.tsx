import React from 'react';
import PillarCard from '../component/pillarCard';
import { roadmapData, pillarsData } from '../dummy';

interface PillarListProps {
    // This is the foreign key you want to filter by
    selectedRoadmapId: number; 
}

const PillarList: React.FC<PillarListProps> = ({ selectedRoadmapId }) => {
// Filter pillars based on selectedRoadmapId
const filteredPillars = pillarsData.filter(pillar => pillar.roadmapid === selectedRoadmapId);
const roadmapTitle = roadmapData.find(r => r.id === selectedRoadmapId)?.title || 'Unknown Roadmap';
// order by 'order' field
filteredPillars.sort((a, b) => a.order - b.order);

    return (
        <div className="p-4 sm:p-8 w-full mx-auto">
            <h3 className="text-3xl font-semibold text-white mb-6 border-b border-gray-700 pb-2 text-left">
                Chapters for {roadmapTitle}
            </h3>
            {filteredPillars.length === 0 ? (
                <p className="text-gray-400 text-center mt-10">No chapters found for this roadmap.</p>
            ) : (filteredPillars.map((pillar) => (
                <PillarCard 
                    key={pillar.id}
                    {...pillar}
                />
            )))}
        </div>
    );
};

export default PillarList;