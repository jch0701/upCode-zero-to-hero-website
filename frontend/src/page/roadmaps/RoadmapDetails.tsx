import React, { useEffect, useRef } from "react";
import RoadmapDescription from "../../component/roadmaps/DetailSession/roadmapDesciption";
import { useParams } from "react-router-dom";
import PillarList from "@/component/roadmaps/Selector/pillarList";
import { update_Activity } from "@/component/activity/activity_tracker";
import { useGetSingleRoadmap } from "@/api/roadmaps/roadmapAPI";
import { Spinner } from "@/component/shadcn/spinner";

export const RoadmapDetails: React.FC = () => {
    const { roadmapID } = useParams<{ roadmapID: string }>(); // get id from URL
    const userID = localStorage.getItem("userID");
    
    //for profile usage
    const hasCountedRef = useRef(false);
    useEffect(() => {
        if (!roadmapID) return;
        if(hasCountedRef.current) return;
        update_Activity(activity => {
            // count once
            activity.opened.main_topic[roadmapID] =
            (activity.opened.main_topic[roadmapID] || 0) + 1;
        },{ type: "roadmap", id: roadmapID });
        
        hasCountedRef.current = true;
    }, [roadmapID]);

    const { data: roadmapItem, isLoading } = useGetSingleRoadmap(Number(roadmapID), userID);
    if (isLoading) {
        return(
        <div className="flex h-screen -translate-y-12 w-full items-center justify-center">
            <Spinner className="size-20 text-amber-50" />
            <span className="text-amber-50 text-3xl">Loading Roadmap...</span>
        </div>
        )
    };

    if (!roadmapItem) return <p className="text-white text-center mt-10">Roadmap not found</p>;
    return (
        <div className="pt-6 p-6 bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
            <RoadmapDescription selectedRoadmapID={roadmapItem.roadmapID} />
            <br></br>
            <PillarList selectedRoadmapId={roadmapItem.roadmapID} />
        </div>
    );
};