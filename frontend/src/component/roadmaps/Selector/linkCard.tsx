import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleView, autosetViewTrue } from '@/store/linksSlice';
import { useGetSingleLink } from '@/api/roadmaps/linkAPI';
import { useGetSingleRoadmap } from '@/api/roadmaps/roadmapAPI';


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
    const userID = localStorage.getItem("userID");
    const { roadmapID, roadmapSlug, chapterID, chapterSlug } = useParams<{ roadmapID: string, roadmapSlug: string,  chapterID: string, chapterSlug: string }>();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userID = localStorage.getItem("userID");
        setIsLoggedIn(userID && userID !== "0" ? true : false);
    }, [location]); // re-check when route changes

    const { data: roadmapItem, isLoading: roadmapLoading, isError: roadmapError} = useGetSingleRoadmap(Number(roadmapID), userID);
    const { data: linkItem, isLoading: linkLoading, isError: linkError} = useGetSingleLink(Number(chapterID), selectedNodeID, userID)

    if (roadmapLoading || linkLoading ) return <div className="w-72 h-64 bg-gray-800 animate-pulse rounded-lg" />;
    if (roadmapError || linkError || !linkItem ) return null;

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

    const creator = roadmapItem?.creatorID ?? 'Unknown creator';

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
            
            {creator != Number(userID) ? (
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
            <Link to ={`/roadmap/${roadmapID}/${roadmapSlug}/${chapterID}/${chapterSlug}/${linkItem.nodeID}/edit`}>
                <button onClick={directLink}
                        className=" px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition">
                    Link
                </button>
            </Link>)}
        </div>
    );
    return (
        <>
        {creator == Number(userID) ? (
            // If creator → internal edit link
                <Link to={`/roadmap/${roadmapID}/${roadmapSlug}/${chapterID}/${chapterSlug}/${linkItem.nodeID}/edit`}
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