import React from "react";
import { useParams } from "react-router-dom";
import LinkDetailForm from "@/component/roadmaps/Form/linkDetailForm";
import { useGetSingleLink } from "@/api/roadmaps/linkAPI";
import { Spinner } from "@/component/shadcn/spinner";
import { getActiveUserField } from "@/lib/utils";

export const EditNode: React.FC = () => {
    const userID = getActiveUserField("userId");
    const { chapterID, nodeID } = useParams<{ chapterID: string, nodeID: string }>();
    const { data: nodeItem, isLoading } = useGetSingleLink(Number(chapterID), Number(nodeID), userID);

    if ( isLoading)  {
        return(
        <div className="flex h-screen -translate-y-12 w-full items-center justify-center">
            <Spinner className="size-20 text-amber-50" />
            <span className="text-amber-50 text-3xl">Loading Link...</span>
        </div>
        )
    };

    if ( !nodeItem ) return <p className="text-white text-center mt-10">Link not found</p>;
    
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