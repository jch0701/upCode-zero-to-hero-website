import ChapterDetailForm from "@/component/roadmaps/Form/chapterDetailForm";
import React from "react";
import { useParams } from "react-router";
import { useGetSingleChapter } from "@/api/roadmaps/chapterAPI";

export const EditChapter: React.FC = () => {
    const userID = localStorage.getItem("userID");
    const { roadmapID, chapterID } = useParams<{ roadmapID: string, chapterID: string }>();
    const { data: chapterItem, isLoading, isError } = useGetSingleChapter(Number(roadmapID),Number(chapterID),userID);
    
    if ( isLoading) return <div className="w-72 h-64 bg-gray-800 animate-pulse rounded-lg" />;
    if (isError || !chapterItem ) return <p className="text-white text-center mt-10">Chapter not found</p>;
    return (
        <div className="pt-6 p-6 bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
            <ChapterDetailForm
                mode="edit"
                selectedChapterID={chapterItem.chapterID}
            />
        </div>
    );
};