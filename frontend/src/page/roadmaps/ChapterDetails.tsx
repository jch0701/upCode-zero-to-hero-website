import ChapterDescription from '@/component/roadmaps/DetailSession/chapterDescription';
import LinkList from '@/component/roadmaps/Selector/linkList';
import { useSelector } from "react-redux";
import React, {useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import type { PillarCardProps } from '@/component/roadmaps/Selector/pillarCard';
import { update_Activity } from '@/component/activity/activity_tracker';

export const ChapterDetails: React.FC = () => {
    const pillarsData = useSelector((state: any) => state.chapter.pillarList) as PillarCardProps[];
    const { chapterID } = useParams<{ chapterID: string }>();
    const chapterItem = pillarsData.find(pillar => pillar.chapterID === Number(chapterID));

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

    if (!chapterItem) return <p className="text-white text-center mt-10">Chapter not found</p>;

    return (
        <div className="pt-6 p-6 bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
            <ChapterDescription {...chapterItem} />
            <br></br>
            <LinkList selectedChapterId={chapterItem.chapterID} />
        </div>
    );
};