import React from "react";
import { useParams } from "react-router";
import RoadmapDetailForm from "@/component/roadmaps/Form/roadmapDetailForm";
import { useGetSingleRoadmap } from "@/api/roadmaps/roadmapAPI";
import { Spinner } from "@/component/shadcn/spinner";

export const EditRoadmap: React.FC = () => {
    const { roadmapID } = useParams<{ roadmapID: string }>();
    const userID = localStorage.getItem("userID");
    const { data: roadmapItem, isLoading} = useGetSingleRoadmap(Number(roadmapID), userID);

    if ( isLoading)  {
        return(
        <div className="flex h-screen -translate-y-12 w-full items-center justify-center">
            <Spinner className="size-20 text-amber-50" />
            <span className="text-amber-50 text-3xl">Loading Roadmap...</span>
        </div>
        )
    };
    
    if ( !roadmapItem ) return <p className="text-white text-center mt-10">Roadmap not found</p>;
    
    return (
        <div className="pt-6 p-6 bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
            <RoadmapDetailForm 
                mode = "edit"
                selectedRoadmapID={roadmapItem.roadmapID} 
            />
        </div>
    );
};