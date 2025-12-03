import React from 'react';
import LinkCard from './linkCard';
import { pillarsData, linksData } from '@/dummy';

interface linkListProps{
    selectedChapterId: number
}

const LinkList: React.FC<linkListProps> = ({ selectedChapterId }) => {
// Filter pillars based on selectedRoadmapId
const filteredLinks = linksData.filter(links => links.chapterID === selectedChapterId);
const chapterTitle = pillarsData.find(p => p.chapterID === selectedChapterId)?.title || 'Unknown Chapter';
// order by 'order' field
filteredLinks.sort((a, b) => a.order - b.order);

return (
    <div className="w-full mx-auto">
            <h3 className="text-3xl font-semibold text-white mb-6 border-b border-gray-700 pb-2 text-left">
                Links for {chapterTitle}
            </h3>
            {filteredLinks.length === 0 ? (
                <p className="text-gray-400 text-center mt-10">No links found for this chapter.</p>
            ) : (filteredLinks.map((links) => (
                <LinkCard 
                    key={links.chapterID}
                    {...links}
                />
            )))}
        </div>
)}


export default LinkList
