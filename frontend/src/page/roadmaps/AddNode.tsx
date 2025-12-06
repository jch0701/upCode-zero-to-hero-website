import LinkDetailForm from "@/component/roadmaps/linkDetailForm";
import React from "react";

export const AddNode: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-gray-700/70 w-full max-w-2xl rounded-xl shadow-2xl p-6">
                <LinkDetailForm 
                    mode="add"
                />
            </div>
        </div>
    );
};