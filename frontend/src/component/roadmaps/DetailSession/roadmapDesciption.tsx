import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { TagPill } from "../../tag";
import type { RoadmapItemCardProps } from "../Selector/roadmapCard";
import { generateTags } from '../groupTag';
import { useSelector } from "react-redux";
import { Heart, X } from 'lucide-react';
import type { PillarCardProps } from "../Selector/pillarCard";
import { useDispatch } from 'react-redux';
import { toggleFavourite } from "@/store/roadmapSlice";
import type { UserListType } from "@/store/userListSlice";

const RoadmapDescription: React.FC<RoadmapItemCardProps> = ({
    creator,imageSrc, title, description, createdDate, tags,
    modifiedDate, isFavourite, roadmapID: roadmapIDProp}) => {
    const userData = useSelector((state: any) => state.userList.userList) as UserListType[];
    const username = userData.find(user => user.userId === creator)?.username || 'Unknown Username';
    const pillarsData = useSelector((state: any) => state.chapter.pillarList) as PillarCardProps[];
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
            dispatch(toggleFavourite(Number(roadmapID)))
        }
        else{
            navigate("/Login");
        }
    };

    const userID = localStorage.getItem("userID");
    const { roadmapID, roadmapSlug } = useParams<{ roadmapID: string, roadmapSlug: string }>();

    return (
        <div className=" max-w-5xl mx-auto text-white">
            {/* Top Right Icon */}
            <div className="flex justify-end">
                <button
                    className="text-white hover:text-gray-400 p-1"
                    aria-label="Close Featured Roadmap"
                    onClick={() => navigate(-1)}
                >
                    <X size={20} />
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Section: Image and Basic Info */}
                <div className="w-full md:w-[40%]">
                    <div className="relative h-70 bg-gray-700/30 rounded-md mb-4 overflow-hidden">
                        <img
                            src={imageSrc}
                            alt={title}
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                                e.currentTarget.src = 'placeholder-image.jpg'; 
                            }}
                        />
                        {(Number(userID) !== creator) && (
                        <button 
                            className="absolute top-3 left-3 p-2 bg-black/40 rounded-full cursor-pointer hover:bg-black/60 transition"
                            onClick={handleToggleFavourite}
                            aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
                        >
                            <Heart 
                                size={20} 
                                fill={isFavourite ? '#f80b0bff' : 'transparent'}
                                stroke="white" 
                            />
                        </button>)}
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-left">{title}</h2>
                    {/* Save as Favourite Button */}
                    {(Number(userID) !== creator)
                        ?
                        <button 
                            className="w-full bg-gray-900/80 hover:bg-gray-900 rounded-lg font-semibold transition shadow-xl"
                            onClick={handleToggleFavourite}
                        >
                            {isFavourite ? "Unfavourite" : "Save as Favourite"}
                        </button>
                        :
                        <Link to={`/roadmap/${roadmapID}/${roadmapSlug}/edit`}>
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
                        {((tags && tags.length)
                            ? tags
                            : generateTags(Number(roadmapIDProp ?? roadmapID), pillarsData)
                        ).map((tag, index) => (
                                <TagPill key={index} tag={tag} />
                        ))}
                    </div>
                    {/* Creator / Date Info */} 
                    {/*Show like grid with 3 columns*/}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-left">
                        {(Number(userID) !== creator) && (
                        <>
                            <div>
                                <h3 className="font-semibold text-left">Creator</h3>
                                <p className="mt-1 text-gray-300">{username}</p>
                            </div>
                            <br></br>
                        </>)}
                        <div>
                            <h3 className="font-semibold text-left">Created On</h3>
                            <p className="mt-1 text-gray-300">{createdDate}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-left">Last Modified</h3>
                            <p className="mt-1 text-gray-300">{modifiedDate}</p>
                        </div>
                    </div>
                    {/* Description Section */}
                    <h3 className="text-xl font-bold mb-2 text-left">Description</h3>
                    {/* Description Text */}
                    <p className="text-gray-300 leading-relaxed text-base whitespace-pre-wrap text-justify">
                        {description}
                    </p>
                </div>
            </div>
            <hr className="border-t border-gray-600 my-4" />
        </div>
    );
}

export default RoadmapDescription;


