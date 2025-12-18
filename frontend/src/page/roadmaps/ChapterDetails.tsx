import ChapterDescription from '@/component/roadmaps/DetailSession/chapterDescription';
import LinkList from '@/component/roadmaps/Selector/linkList';
import React, {useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { update_Activity } from '@/component/activity/activity_tracker';
import { useGetSingleChapter } from '@/api/roadmaps/chapterAPI';

export const ChapterDetails: React.FC = () => {
    const { roadmapID, chapterID } = useParams<{ roadmapID: string, chapterID: string }>();
    const userID = localStorage.getItem("userID");

    //  Use ref instead of useState to avoid warnings
    const hasCountedRef = useRef(false);
    useEffect(()=> {
        if(!chapterID)return;
        if (hasCountedRef.current) return;
        
        update_Activity(activity =>{
            activity.opened.chapters[chapterID] = (
                activity.opened.chapters[chapterID]||0)+1;
        },{ type: "chapter", id: chapterID });
        hasCountedRef.current = true;//marked as counted
    },[chapterID]);

    const { data: chapterItem, isLoading, isError } = useGetSingleChapter(Number(roadmapID), Number(chapterID), userID);
    if (isLoading) return <div className="w-72 h-64 bg-gray-800 animate-pulse rounded-lg" />;
    if (isError || !chapterItem) return null;

    if (!chapterItem) return <p className="text-white text-center mt-10">Chapter not found</p>;

    return (
        <div className="pt-6 p-6 bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
            <ChapterDescription selectedChapterID={chapterItem.chapterID} />
            <br></br>
            <LinkList selectedChapterId={chapterItem.chapterID} />
        </div>
    );
};