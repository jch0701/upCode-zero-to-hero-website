import React from "react";
import RoadmapDescription from "../component/roadmapDesciption";
import { roadmapData} from "../dummy";
import { useParams } from "react-router-dom";
import PillarList from "@/component/pillarList";

export const RoadmapDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // get id from URL
    const roadmapItem = roadmapData.find(r => r.id === Number(id)); // find the data by id

    if (!roadmapItem) return <p className="text-white text-center mt-10">Roadmap not found</p>;
    return (
        <div className="pt-6" style={{ backgroundColor: '#1a202c', minHeight: '100vh' }}>
                <RoadmapDescription {...roadmapItem} />
                <PillarList selectedRoadmapId={roadmapItem.id} />
        </div>
    );
};