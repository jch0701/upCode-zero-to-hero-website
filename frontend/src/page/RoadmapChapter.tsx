import ChapterDescription from '@/component/roadmaps/chapterDescription';
import { pillarsData } from '@/dummy';
import React from 'react';
import { useParams } from 'react-router-dom';

export const RoadmapChapter: React.FC = () => {
    const { chapterID } = useParams<{ chapterID: string }>();
    const chapterItem = pillarsData.find(pillar => pillar.chapterID === Number(chapterID));
    if (!chapterItem) return <p className="text-white text-center mt-10">Chapter not found</p>;
    return (
        <div className="pt-6" style={{ backgroundColor: '#1a202c', minHeight: '100vh' }}>
            <ChapterDescription {...chapterItem} />
        </div>
    );
};