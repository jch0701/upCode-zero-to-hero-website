import React from 'react';
import LinkCard, { type LinkCardProps } from './linkCard';
import { useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import type { RoadmapItemCardProps } from './roadmapCard';
import type { PillarCardProps } from './pillarCard';

interface linkListProps{
    selectedChapterId: number
}

const LinkList: React.FC<linkListProps> = ({ selectedChapterId }) => {
// Filter pillars based on selectedRoadmapId
const roadmapData = useSelector((state: any) => state.roadmap.roadmapList) as RoadmapItemCardProps[];
const pillarsData = useSelector((state: any) => state.chapter.pillarList) as PillarCardProps[];
const linksData = useSelector((state: any) => state.link.linkList) as LinkCardProps[];
const filteredLinks = linksData.filter(links => links.chapterID === selectedChapterId);
const chapterSlug = pillarsData.find(p => p.chapterID === selectedChapterId)?.chapterSlug || 'Unknown Chapter Slug';
const chapterTitle = pillarsData.find(p => p.chapterID === selectedChapterId)?.title || 'Unknown Chapter';
const roadmapID = pillarsData.find(p => p.chapterID === selectedChapterId)?.roadmapID || 'Unknown Roadmap ID';
const roadmapSlug = roadmapData.find(r => r.roadmapID === roadmapID)?.roadmapSlug || 'Unknown Roadmap Slug';
const creator = roadmapData.find(r => r.roadmapID === roadmapID)?.creatorID || 'Unknown creator';
const userID = localStorage.getItem("userID");
// order by 'order' field
filteredLinks.sort((a, b) => a.order - b.order);
const location = useLocation();
return (
    <div className="w-full mx-auto">
        <div className='flex items-center justify-between mb-6'>
            <h3 className="text-3xl font-semibold text-white text-left">
                Links for {chapterTitle}
            </h3>
            {((Number(userID) === creator) && 
                <Link to={`/roadmap/${roadmapID}/${roadmapSlug}/${selectedChapterId}/${chapterSlug}/add-node`} 
                    state={{ backgroundLocation: location }}>
                    <button className=' px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition'>
                        Add Link
                    </button>
                </Link>)}
        </div>
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
