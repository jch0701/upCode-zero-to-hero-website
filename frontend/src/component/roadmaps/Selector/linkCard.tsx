import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleView, autosetViewTrue, type LinkType } from '@/store/linksSlice';
import type { RoadmapType } from '@/store/roadmapSlice';
import type { PillarType } from '@/store/pillarsSlice';


// Type and data structure
export interface LinkCardProps {
    selectedNodeID: number;
}

const LinkCard : React.FC<LinkCardProps> = ({
    selectedNodeID,
}) => {
    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const linkData = useSelector((state: any) => state.link.linkList) as LinkType[];
    const linkItem = linkData.find(p => p.nodeID === selectedNodeID);
    if (!linkItem) return <p className="text-white text-center mt-10">Link not found</p>;

    useEffect(() => {
        const userID = localStorage.getItem("userID");
        setIsLoggedIn(userID && userID !== "0" ? true : false);
    }, [location]); // re-check when route changes

    // seperate click
    const directLink = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if(isLoggedIn){
            dispatch(autosetViewTrue(selectedNodeID));
        }
        window.open(linkItem.link, "_blank")
    }
    // toggleViewed indicator
    const handleToggleViewed = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if(isLoggedIn){
            dispatch(toggleView(linkItem.nodeID))
        }
        else{
            navigate("/Login", { state: { from: location.pathname } });
        }
    };
    const roadmapData = useSelector((state: any) => state.roadmap.roadmapList) as RoadmapType[];
    const pillarsData = useSelector((state: any) => state.chapter.pillarList) as PillarType[];
    const chapterSlug = pillarsData.find(p => p.chapterID === linkItem.chapterID)?.chapterSlug || 'Unknown Chapter Slug';
    const roadmapID = pillarsData.find(p => p.chapterID === linkItem.chapterID)?.roadmapID || 'Unknown Roadmap ID';
    const roadmapSlug = roadmapData.find(r => r.roadmapID === roadmapID)?.roadmapSlug || 'Unknown Roadmap Slug';
    const creator = roadmapData.find(r => r.roadmapID === roadmapID)?.creatorID || 'Unknown creator';
    const userID = localStorage.getItem("userID");

    const CardContent = (
        <div className={`
        flex items-center p-4 m-2 rounded-xl shadow-lg transition-all duration-300 
        bg-pink-100/70 border-2 border-opacity-70 border-pink-300
        cursor-pointer hover:bg-pink-200/90
        `}>
            {/* Order Number or Checkmark */}
            <div className=" 
            flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center 
            bg-gray-300 text-gray-800 font-bold text-sm mr-4
            ">
                {linkItem.order}
            </div>

            {/* Title */}
            <div className="flex-grow text-lg font-medium text-gray-900 text-left">
                {linkItem.title}
            </div>
            
            {creator != userID ? (
            // Viewed Indicator
            <div onClick={handleToggleViewed} className="ml-4 cursor-pointer">
                {linkItem.isViewed ? (
                    <svg className={"w-6 h-6 text-green-800"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>)
                    :
                    <div className="w-6 h-6 border-2 border-gray-400 rounded-full"></div>}
            </div>
            ):(
            // Button
            <Link to ={`/roadmap/${roadmapID}/${roadmapSlug}/${linkItem.chapterID}/${chapterSlug}/${linkItem.nodeID}/edit`}>
                <button onClick={directLink}
                        className=" px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition">
                    Link
                </button>
            </Link>)}
        </div>
    );
    return (
        <>
        {creator == userID ? (
            // If creator → internal edit link
                <Link to={`/roadmap/${roadmapID}/${roadmapSlug}/${linkItem.chapterID}/${chapterSlug}/${linkItem.nodeID}/edit`}
                state={{ backgroundLocation: location }}
                >
                    {CardContent}
                </Link>
        ):(
            // Not creator → open external resource
                <div onClick={directLink}>
                    {CardContent}
                </div>
        )}
        </>
    )
}

export default LinkCard;