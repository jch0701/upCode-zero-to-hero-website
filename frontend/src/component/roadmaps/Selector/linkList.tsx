import React from 'react';
import LinkCard from './linkCard';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useGetSingleChapter } from '@/api/roadmaps/chapterAPI';
import { useGetSingleRoadmap } from '@/api/roadmaps/roadmapAPI';
import { useGetChapterLinks } from '@/api/roadmaps/linkAPI';

interface linkListProps{
    selectedChapterId: number
}

const LinkList: React.FC<linkListProps> = ({ selectedChapterId }) => {
const location = useLocation();
const userID = localStorage.getItem("userID");
const { roadmapID } = useParams<{ roadmapID: string }>();
const { data: roadmapItem, isLoading: roadmapLoading, isError: roadmapError } = useGetSingleRoadmap(Number(roadmapID), userID);
const { data: chapterItem, isLoading : chapterLoading, isError: chapterError } = useGetSingleChapter(Number(roadmapID),selectedChapterId, userID);
const { data: linksData = [], isLoading: linkLoading, isError: linkError } = useGetChapterLinks(selectedChapterId, userID);

if (roadmapLoading || chapterLoading || linkLoading ) return <div className="w-72 h-64 bg-gray-800 animate-pulse rounded-lg" />;
if (roadmapError || chapterError || !chapterItem || linkError ) return null;

const chapterSlug = chapterItem?.chapterSlug ?? 'Unknown Chapter Slug';
const chapterTitle = chapterItem?.title ?? 'Unknown Chapter';
const roadmapSlug = roadmapItem?.roadmapSlug ?? 'Unknown roadmap Slug';
const creator = roadmapItem?.creatorID ?? 'Unknown creator ID';



// order by 'order' field
linksData.sort((a, b) => a.order - b.order);
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
        </div >
            {linksData.length === 0 ? (
                <p className="text-gray-400 text-center mt-10">No links found for this chapter.</p>
            ) : (linksData.map((links) => (
                <div className='mb-4' key={links.nodeID}>
                    <LinkCard 
                        key={links.nodeID}
                        selectedNodeID={links.nodeID}
                    />
                </div>
            )))}
        </div>
)}


export default LinkList