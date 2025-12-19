import ChapterDetailForm from "@/component/roadmaps/Form/chapterDetailForm";
import React from "react";
import { useParams } from "react-router";
import { useGetSingleChapter } from "@/api/roadmaps/chapterAPI";
import { Spinner } from "@/component/shadcn/spinner";

export const EditChapter: React.FC = () => {
    const userID = localStorage.getItem("userID");
    const { roadmapID, chapterID } = useParams<{ roadmapID: string, chapterID: string }>();
    const { data: chapterItem, isLoading } = useGetSingleChapter(Number(roadmapID),Number(chapterID),userID);
    
    if ( isLoading )  {
        return(
        <div className="flex h-screen -translate-y-12 w-full items-center justify-center">
            <Spinner className="size-20 text-amber-50" />
            <span className="text-amber-50 text-3xl">Loading Chapter...</span>
        </div>
        )
    };

    if ( !chapterItem ) return <p className="text-white text-center mt-10">Chapter not found</p>;
    return (
        <div className="pt-6 p-6 bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
            <ChapterDetailForm
                mode="edit"
                selectedChapterID={chapterItem.chapterID}
            />
        </div>
    );
};