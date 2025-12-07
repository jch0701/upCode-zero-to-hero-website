import ChapterDescription from '@/component/roadmaps/chapterDescription';
import LinkList from '@/component/roadmaps/linkList';
import { useSelector } from "react-redux";
import React from 'react';
import { useParams } from 'react-router-dom';
import type { PillarCardProps } from '@/component/roadmaps/pillarCard';

export const ChapterDetails: React.FC = () => {
    const pillarsData = useSelector((state: any) => state.chapter.pillarList) as PillarCardProps[];
    const { chapterID } = useParams<{ chapterID: string }>();
    const chapterItem = pillarsData.find(pillar => pillar.chapterID === Number(chapterID));
    if (!chapterItem) return <p className="text-white text-center mt-10">Chapter not found</p>;
    return (
        <div className="pt-6 p-6 bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
            <ChapterDescription {...chapterItem} />
            <br></br>
            <LinkList selectedChapterId={chapterItem.chapterID} />
        </div>
    );
};