import ChapterDescriptionEdit from "@/component/roadmaps/chapterDescriptionEdit";
import { pillarsData } from "@/dummy";
import React from "react";
import { useParams } from "react-router";

export const RoadmapChapterEdit: React.FC = () => {
    const { chapterID } = useParams<{ chapterID: string }>();
    const chapterItem = pillarsData.find(r => r.chapterID === Number(chapterID));
    if (!chapterItem) return <p className="text-white text-center mt-10">Chapter not found</p>;
    return (
        <div className="pt-6 p-6 bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
            <ChapterDescriptionEdit 
                title={chapterItem.title} 
                description={chapterItem.description ?? ''} 
                difficulty={chapterItem.difficulty}  
                order={chapterItem.order} 
                category={chapterItem.category} 
                prerequisite={chapterItem.prerequisite}
            />
        </div>
    );
};