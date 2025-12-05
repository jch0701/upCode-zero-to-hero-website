import React from "react";
import { useParams } from "react-router";
import { roadmapData } from "@/dummy";
import RoadmapDescriptionEdit from "@/component/roadmaps/roadmapDescriptionEdit";

export const RoadmapDetailEdit: React.FC = () => {
    const { roadmapID } = useParams<{ roadmapID: string }>();
    const roadmapItem = roadmapData.find(r => r.roadmapID === Number(roadmapID));
    if (!roadmapItem) return <p className="text-white text-center mt-10">Roadmap not found</p>;
    return (
        <div className="pt-6 p-6 bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl mx-auto">
            <RoadmapDescriptionEdit 
                imageSrc={roadmapItem.imageSrc} 
                title={roadmapItem.title}
                description={roadmapItem.description}
            />
        </div>
    );
};