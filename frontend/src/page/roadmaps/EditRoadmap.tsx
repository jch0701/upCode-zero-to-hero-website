import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import RoadmapDetailForm from "@/component/roadmaps/Form/roadmapDetailForm";
import type { RoadmapType } from "@/store/roadmapSlice";

export const EditRoadmap: React.FC = () => {
    const roadmapData = useSelector((state: any) => state.roadmap.roadmapList) as RoadmapType[];
    const { roadmapID } = useParams<{ roadmapID: string }>();
    const roadmapItem = roadmapData.find(r => r.roadmapID === Number(roadmapID));
    if (!roadmapItem) return <p className="text-white text-center mt-10">Roadmap not found</p>;
    return (
        <div className="pt-6 p-6 bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
            <RoadmapDetailForm 
                mode = "edit"
                selectedRoadmapID={roadmapItem.roadmapID} 
            />
        </div>
    );
};