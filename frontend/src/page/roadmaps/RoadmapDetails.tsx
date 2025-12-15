import React, { useEffect, useRef } from "react";
import RoadmapDescription from "../../component/roadmaps/DetailSession/roadmapDesciption";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PillarList from "@/component/roadmaps/Selector/pillarList";
import { update_Activity } from "@/component/activity/activity_tracker";
import type { RoadmapType } from "@/store/roadmapSlice";

export const RoadmapDetails: React.FC = () => {
    const roadmapData = useSelector((state: any) => state.roadmap.roadmapList) as RoadmapType[];
    const { roadmapID } = useParams<{ roadmapID: string }>(); // get id from URL
    const roadmapItem = roadmapData.find(r => r.roadmapID === Number(roadmapID)); // find the data by id
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

    if (!roadmapItem) return <p className="text-white text-center mt-10">Roadmap not found</p>;
    return (
        <div className="pt-6 p-6 bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
            <RoadmapDescription selectedRoadmapID={roadmapItem.roadmapID} />
            <br></br>
            <PillarList selectedRoadmapId={roadmapItem.roadmapID} />
        </div>
    );
};