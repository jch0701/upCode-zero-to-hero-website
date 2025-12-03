import React from "react";
import RoadmapDescription from "../component/roadmaps/roadmapDesciption";
import { roadmapData} from "../dummy";
import { useParams } from "react-router-dom";
import PillarList from "../component/roadmaps/pillarList";

export const RoadmapDetails: React.FC = () => {
    const { roadmapID } = useParams<{ roadmapID: string }>(); // get id from URL
    const roadmapItem = roadmapData.find(r => r.roadmapID === Number(roadmapID)); // find the data by id

    if (!roadmapItem) return <p className="text-white text-center mt-10">Roadmap not found</p>;
    return (
        <div className="pt-6">
                <RoadmapDescription {...roadmapItem} />
                <PillarList selectedRoadmapId={roadmapItem.roadmapID} />
        </div>
    );
};