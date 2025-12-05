import ChapterDetailForm from "@/component/roadmaps/chapterDetailForm";
import React from "react";

export const AddChapter: React.FC = () => {
    return (
        <div className="pt-6 p-6 bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
            <ChapterDetailForm
                mode="add"
            />
        </div>
    );
};