import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router';
import { toggleView } from '@/store/pillarsSlice';

// Type and data structure
export interface PillarCardProps {
    chapterID: number;
    chapterSlug: string;
    roadmapID: number;
    title: string;
    description?: string;
    modifiedDate: string;
    difficulty: string;
    category: string;
    prerequisite: string;
    order: number;
    isViewed: boolean;
}

const PillarCard : React.FC<PillarCardProps> = ({
    title, order, isViewed, roadmapID, chapterID, chapterSlug,

}) => {
    // use link to get roadmap slug
    const { roadmapSlug } = useParams<{ roadmapSlug: string }>();
    const dispatch = useDispatch();
    // toggleViewed indicator
    const handleToggleViewed = (e: React.MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();
            dispatch(toggleView(chapterID))
        };
    return (
        <Link to={`/roadmap/${roadmapID}/${roadmapSlug}/${chapterID}/${chapterSlug}`}>
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
                {order}
            </div>

            {/* Title */}
            <div className="flex-grow text-lg font-medium text-gray-900 text-left">
                {title}
            </div>

            {/* Viewed Indicator */}
            <div onClick={handleToggleViewed} className="ml-4 cursor-pointer">
                {isViewed ? (
                    <svg className={"w-6 h-6 text-green-800"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>)
                    :
                    <div className="w-6 h-6 border-2 border-gray-400 rounded-full"></div>}
            </div>
        </div>
        </Link>
    );
}

export default PillarCard;