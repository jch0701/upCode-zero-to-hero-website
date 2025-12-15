import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LinkDetailForm from "@/component/roadmaps/Form/linkDetailForm";
import type { LinkType } from "@/store/linksSlice";

export const EditNode: React.FC = () => {
    const { nodeID } = useParams<{ nodeID: string }>();
    const linksData = useSelector((state: any) => state.link.linkList) as LinkType[];
    const nodeItem = linksData.find(r => r.nodeID === Number(nodeID));
    if (!nodeItem) return <p className="text-white text-center mt-10">Link not found</p>;
    
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