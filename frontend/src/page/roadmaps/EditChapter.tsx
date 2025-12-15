import ChapterDetailForm from "@/component/roadmaps/Form/chapterDetailForm";
import { useSelector } from "react-redux";
import React from "react";
import { useParams } from "react-router";
import type { PillarType } from "@/store/pillarsSlice";

export const EditChapter: React.FC = () => {
    const pillarsData = useSelector((state: any) => state.chapter.pillarList) as PillarType[];
    const { chapterID } = useParams<{ chapterID: string }>();
    const chapterItem = pillarsData.find(r => r.chapterID === Number(chapterID));
    if (!chapterItem) return <p className="text-white text-center mt-10">Chapter not found</p>;
    return (
        <div className="pt-6 p-6 bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
            <ChapterDetailForm
                mode="edit"
                selectedChapterID={chapterItem.chapterID}
            />
        </div>
    );
};