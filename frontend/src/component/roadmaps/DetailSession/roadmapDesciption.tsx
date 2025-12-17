import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { TagPill } from "../../tag";
import type { RoadmapItemCardProps } from "../Selector/roadmapCard";
import { generateTags } from '../groupTag';
import { Heart, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleFavourite } from "@/store/roadmapSlice";
import type { LinkType } from "@/store/linksSlice";
import { useGetSingleRoadmap } from "@/api/roadmaps/roadmapAPI";
import { IMAGE_MAP, defaultImageSrc } from "@/lib/image";
import { useGetRoadmapChapters } from "@/api/roadmaps/chapterAPI";
import type { PillarType } from "@/store/pillarsSlice";
import { useGetSingleUser } from "@/api/roadmaps/userAPI";
import { useGetAllLinks } from "@/api/roadmaps/linkAPI";



const RoadmapDescription: React.FC<RoadmapItemCardProps> = ({
    selectedRoadmapID}) => {
    const userID = localStorage.getItem("userID");
    const { data: roadmapItem, isLoading, isError } = useGetSingleRoadmap(selectedRoadmapID, userID);
    const { data: userData } = useGetSingleUser(roadmapItem.creatorID);
    const username = userData?.username ?? 'Unknown Username';
    const { data: pillarsData } = useGetRoadmapChapters(selectedRoadmapID, userID) as { data: PillarType[]};
    const { data: linksData } = useGetAllLinks(userID) as { data: LinkType[] }
    if (isLoading) return <div className="w-72 h-64 bg-gray-800 animate-pulse rounded-lg" />;
    if (isError || !roadmapItem) return null;

    const uniqueChapterID = [...new Set(pillarsData.map(data => data.chapterID))];
    const filterLinksData = linksData.filter(data => {
        return uniqueChapterID.includes(data.chapterID);
    });
    const uniqueModifiedDate = [(Date.parse(roadmapItem.modifiedDate)),
                                ...new Set(pillarsData.map(data => Date.parse(data.modifiedDate))),
                                ...new Set(filterLinksData.map(data => Date.parse(data.modifiedDate)))];
    let latestModifiedDate: string;
    if (uniqueModifiedDate.length > 0) {
        const maxTimestamp: number = Math.max(...uniqueModifiedDate);
        const latestDateObject: Date = new Date(maxTimestamp);
        latestModifiedDate = latestDateObject.toISOString().slice(0,10);

    } 
    else {
        latestModifiedDate = roadmapItem.modifiedDate;
    }
    const dispatch = useDispatch();   
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
            const userID = localStorage.getItem("userID");
            setIsLoggedIn(userID && userID !== "0" ? true : false);
    }, [location]); // re-check when route changes

    const handleToggleFavourite = () => {
        if (isLoggedIn){
            dispatch(toggleFavourite(selectedRoadmapID))
        }
        else{
            navigate("/Login", { state: { from: location.pathname } });
        }
    };
    const displayImage = IMAGE_MAP[roadmapItem.imageSrc] || roadmapItem.imageSrc;

    return (
        <div className=" max-w-5xl mx-auto text-white">
            {/* Top Right Icon */}
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
                {/* Left Section: Image and Basic Info */}
                <div className="w-full md:w-[40%]">
                    <div className="relative h-70 bg-gray-700/30 rounded-md mb-4 overflow-hidden">
                        <img
                            src={displayImage}
                            alt={roadmapItem.title}
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                                e.currentTarget.src = defaultImageSrc; 
                            }}
                        />
                        {(Number(userID) !== roadmapItem.creatorID) && (
                        <button 
                            className="absolute top-3 left-3 p-2 bg-black/40 rounded-full cursor-pointer hover:bg-black/60 transition"
                            onClick={handleToggleFavourite}
                            aria-label={roadmapItem.isFavourite ? "Remove from favourites" : "Add to favourites"}
                        >
                            <Heart 
                                size={20} 
                                fill={roadmapItem.isFavourite ? '#f80b0bff' : 'transparent'}
                                stroke="white" 
                            />
                        </button>)}
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-left">{roadmapItem.title}</h2>
                    {/* Save as Favourite Button */}
                    {(Number(userID) !== roadmapItem.creatorID)
                        ?
                        <button 
                            className="w-full bg-gray-900/80 hover:bg-gray-900 rounded-lg font-semibold transition shadow-xl"
                            onClick={handleToggleFavourite}
                        >
                            {roadmapItem.isFavourite ? "Unfavourite" : "Save as Favourite"}
                        </button>
                        :
                        <Link to={`/roadmap/${selectedRoadmapID}/${roadmapItem.roadmapSlug}/edit`}>
                            <button 
                                className="w-full bg-gray-900/80 hover:bg-gray-900 rounded-lg font-semibold transition shadow-xl"
                            >
                                Edit
                            </button>
                        </Link>
                        }
                </div>
                {/* Right Section: Tags */}
                <div className="w-full md:w-[60%]">
                    {/* Tags Section */}
                    <div className="flex flex-wrap gap-2 down mb-6 text-black">
                        {(generateTags(selectedRoadmapID, pillarsData)
                        ).map((tag, index) => (
                                <TagPill key={index} tag={tag} />
                        ))}
                    </div>
                    {/* Creator / Date Info */} 
                    {/*Show like grid with 3 columns*/}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-left">
                        {(Number(userID) !== roadmapItem.creatorID) && (
                        <>
                            <div>
                                <h3 className="font-semibold text-left">Creator</h3>
                                <Link to={`/profile/${roadmapItem.creatorID}`}>
                                    <p className="mt-1 text-gray-300">{username}</p>
                                </Link>
                            </div>
                            <br></br>
                        </>)}
                        <div>
                            <h3 className="font-semibold text-left">Created On</h3>
                            <p className="mt-1 text-gray-300">{roadmapItem.createdDate}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-left">Last Modified</h3>
                            <p className="mt-1 text-gray-300">{latestModifiedDate}</p>
                        </div>
                    </div>
                    {/* Description Section */}
                    <h3 className="text-xl font-bold mb-2 text-left">Description</h3>
                    {/* Description Text */}
                    <p className="text-gray-300 leading-relaxed text-base whitespace-pre-wrap text-justify">
                        {roadmapItem.description}
                    </p>
                </div>
            </div>
            <hr className="border-t border-gray-600 my-4" />
        </div>
    );
}

export default RoadmapDescription;


