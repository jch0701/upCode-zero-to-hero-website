import React from "react";
import RoadmapDescription from "../../component/roadmaps/roadmapDesciption";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PillarList from "../../component/roadmaps/pillarList";
import type { RoadmapItemCardProps } from "@/component/roadmaps/roadmapCard";

export const RoadmapDetails: React.FC = () => {
    const roadmapData = useSelector((state: any) => state.roadmap.roadmapList) as RoadmapItemCardProps[];
    const { roadmapID } = useParams<{ roadmapID: string }>(); // get id from URL
    const roadmapItem = roadmapData.find(r => r.roadmapID === Number(roadmapID)); // find the data by id

    if (!roadmapItem) return <p className="text-white text-center mt-10">Roadmap not found</p>;
    return (
        <div className="pt-6 p-6 bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
            <RoadmapDescription {...roadmapItem} />
            <br></br>
            <PillarList selectedRoadmapId={roadmapItem.roadmapID} />
        </div>
    );
};