import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { TagPill } from "../../tag";
import type { RoadmapItemCardProps } from "../Selector/roadmapCard";
import { generateTags } from '../groupTag';
import { Heart, X } from 'lucide-react';
import { useGetRoadmapProgress, useGetSingleRoadmap } from "@/api/roadmaps/roadmapAPI";
import { IMAGE_MAP, defaultImageSrc } from "@/lib/image";
import { useGetRoadmapChapters } from "@/api/roadmaps/chapterAPI";
import { useCreateFavourite, useDeleteFavourite } from "@/api/roadmaps/recordAPI";
import { getActiveUserField } from "@/lib/utils";
import { useGetSingleProfile } from "@/api/profile/profileAPI";

const RoadmapDescription: React.FC<RoadmapItemCardProps> = ({ selectedRoadmapID }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const userID = getActiveUserField("userId");
    const role = getActiveUserField("role");
    const [localRoadmapItem, setLocalRoadmapItem] = useState<any>(null);

    const { data: roadmapItem, isLoading: roadmapLoading } = useGetSingleRoadmap(selectedRoadmapID, userID);

    useEffect(() => {
        if (roadmapItem) {
            setLocalRoadmapItem(roadmapItem);
        }
    }, [roadmapItem]);

    const { data: pillarsData = [], isLoading: pillarsLoading } = useGetRoadmapChapters(selectedRoadmapID, userID);
    const { data: userProfile, isLoading: userLoading } = useGetSingleProfile(roadmapItem!.creatorID);
    const { data: progress, isLoading: progressLoading } = useGetRoadmapProgress(selectedRoadmapID, userID);

    const favouriteMutation = useCreateFavourite();
    const unfavouriteMutation = useDeleteFavourite();

    if (roadmapLoading || pillarsLoading || userLoading || progressLoading ) return null;
    if (!localRoadmapItem || !pillarsData || progress === undefined || progress === null) return <p className="text-white text-center mt-10">Roadmap not found</p>;

    const username = userProfile?.username ?? 'Unknown username';


    const handleToggleFavourite = () => {
        if (!userID) {
            navigate("/Login", { state: { from: location.pathname } });
            return;
        }

        if (!localRoadmapItem.isFavourite) {
            setLocalRoadmapItem({ ...localRoadmapItem, isFavourite: true });
            favouriteMutation.mutate(
                { userID: userID!, recordID: Number(selectedRoadmapID) },
                { onError: () => setLocalRoadmapItem({ ...localRoadmapItem, isFavourite: false })}
            );
        } 
        else {
            setLocalRoadmapItem({ ...localRoadmapItem, isFavourite: false });
            unfavouriteMutation.mutate(
                { userID: userID!, recordID: Number(selectedRoadmapID) },
                { onError: () => setLocalRoadmapItem({ ...localRoadmapItem, isFavourite: true })}
            );
        }
    };

    const displayImage = IMAGE_MAP[localRoadmapItem.imageSrc] || localRoadmapItem.imageSrc;

    return (
        <div className="max-w-5xl mx-auto text-white">
            {/* Close button */}
            <div className="flex justify-end">
                <button
                    className="text-white hover:text-gray-400 p-1"
                    aria-label="Close Featured Roadmap"
                    onClick={() => navigate("/roadmap")}
                >
                    <X size={20} />
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Section */}
                <div className="w-full md:w-[40%]">
                    <div className="relative h-70 bg-gray-700/30 rounded-md mb-4 overflow-hidden">
                        <img
                            src={displayImage}
                            alt={localRoadmapItem.title}
                            className="w-full h-full object-cover"
                            onError={(e) => e.currentTarget.src = defaultImageSrc}
                        />
                        {(userID !== localRoadmapItem.creatorID) && (
                            <button
                                className="absolute top-3 left-3 p-2 bg-black/40 rounded-full hover:bg-black/60 transition"
                                onClick={handleToggleFavourite}
                                aria-label={localRoadmapItem.isFavourite ? "Remove from favourites" : "Add to favourites"}
                            >
                                <Heart
                                    size={20}
                                    fill={localRoadmapItem.isFavourite ? '#f80b0bff' : 'transparent'}
                                    stroke="white"
                                />
                            </button>
                        )}
                    </div>

                    <h2 className="text-3xl font-bold mb-4 text-left">{localRoadmapItem.title}</h2>

                    {(userID !== localRoadmapItem.creatorID)
                        ? <button
                            className="w-full bg-gray-900/80 hover:bg-gray-900 rounded-lg font-semibold transition shadow-xl"
                            onClick={handleToggleFavourite}
                        >
                            {localRoadmapItem.isFavourite ? "Unfavourite" : "Save as Favourite"}
                        </button>
                        : <Link to={`/roadmap/${selectedRoadmapID}/${localRoadmapItem.roadmapSlug}/edit`}>
                            <button className="w-full bg-gray-900/80 hover:bg-gray-900 rounded-lg font-semibold transition shadow-xl">
                                Edit
                            </button>
                        </Link>
                    }
                    {(role === "admin" && userID !== localRoadmapItem.creatorID) &&
                        <div className="mt-1">
                            <Link to={`/roadmap/${selectedRoadmapID}/${localRoadmapItem.roadmapSlug}/edit`}>
                                <button className="w-full bg-gray-900/80 hover:bg-gray-900 rounded-lg font-semibold transition shadow-xl">
                                    Edit
                                </button>
                            </Link>
                        </div>

                    }
                </div>

                {/* Right Section */}
                <div className="w-full md:w-[60%]">
                    <div className="flex flex-wrap gap-2 down mb-6 text-black">
                        {generateTags(selectedRoadmapID, pillarsData).map((tag, idx) => <TagPill key={idx} tag={tag} />)}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6 text-left">
                        {(userID !== localRoadmapItem.creatorID) && (
                            <div>
                                <h3 className="font-semibold">Creator</h3>
                                <Link to={`/profile/${localRoadmapItem.creatorID}`}>
                                    <p className="mt-1 text-gray-300">{username}</p>
                                </Link>
                            </div>
                        )}
                        <div >
                            <h3 className="font-semibold">Overall Progress</h3>
                            <div className="flex items-center gap-2">
                                <div className="w-62 h-2 bg-gray-300 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-green-500 transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <p className="mt-1 text-gray-300">
                                    {`${progress}%`}
                                </p>
                            </div>
                        </div>
                        {(userID === localRoadmapItem.creatorID) && <br></br>}
                        <div>
                            <h3 className="font-semibold">Created On</h3>
                            <p className="mt-1 text-gray-300">{localRoadmapItem.createdDate}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Last Modified</h3>
                            <p className="mt-1 text-gray-300">{localRoadmapItem.modifiedDate}</p>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-left">Description</h3>
                    <p className="text-gray-300 leading-relaxed text-base whitespace-pre-wrap text-justify">
                        {localRoadmapItem.description}
                    </p>
                </div>
            </div>

            <hr className="border-t border-gray-600 my-4" />
        </div>
    );
};

export default RoadmapDescription;
