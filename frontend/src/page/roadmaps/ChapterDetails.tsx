import ChapterDescription from '@/component/roadmaps/chapterDescription';
import LinkList from '@/component/roadmaps/linkList';
import { pillarsData } from '@/dummy';
import React from 'react';
import { useParams } from 'react-router-dom';

export const ChapterDetails: React.FC = () => {
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