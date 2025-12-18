import React from "react";
import { useParams } from "react-router-dom";
import LinkDetailForm from "@/component/roadmaps/Form/linkDetailForm";
import { useGetSingleLink } from "@/api/roadmaps/linkAPI";

export const EditNode: React.FC = () => {
    const userID = localStorage.getItem("userID");
    const { chapterID, nodeID } = useParams<{ chapterID: string, nodeID: string }>();
    const { data: nodeItem, isLoading, isError } = useGetSingleLink(Number(chapterID), Number(nodeID), userID);

    if ( isLoading) return <div className="w-72 h-64 bg-gray-800 animate-pulse rounded-lg" />;
    if ( isError || !nodeItem ) return <p className="text-white text-center mt-10">Link not found</p>;
    
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-gray-700/70 w-full max-w-2xl rounded-xl shadow-2xl p-6">
                <LinkDetailForm 
                    mode="edit"
                    selectedLinkID={nodeItem.nodeID}
                />
            </div>
        </div>
    );
};