import React, { useEffect, useRef } from "react";
import RoadmapDescription from "../../component/roadmaps/DetailSession/roadmapDesciption";
import { useParams } from "react-router-dom";
import PillarList from "@/component/roadmaps/Selector/pillarList";
import { trackNewActivity } from "@/component/activity/activity_tracker";
import { useGetSingleRoadmap } from "@/api/roadmaps/roadmapAPI";
import { Spinner } from "@/component/shadcn/spinner";
import { getActiveUserField } from "@/lib/utils";
import { useGetMyProfile } from "@/api/profile/profileAPI";
export const RoadmapDetails: React.FC = () => {
    const { roadmapID } = useParams<{ roadmapID: string }>(); // get id from URL
    const userID = getActiveUserField("userId");
    const hasCountedRef = useRef(false);
    //for profile usage
    const { data: userProfile, isLoading: isProfileLoading } = useGetMyProfile();

    useEffect(() => {
        if (!roadmapID) return;
        // Wait for profile to load before deciding to track
        if (isProfileLoading) return; 
        if (hasCountedRef.current) return;
        // If Admin mark it as "counted" (to stop retries) but not track.
        if (userProfile?.role === 'admin') {
            hasCountedRef.current = true;
            return; 
        }
        // If user, track it.
        trackNewActivity("roadmap", roadmapID);
        hasCountedRef.current = true;

    }, [roadmapID, userProfile, isProfileLoading]);

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