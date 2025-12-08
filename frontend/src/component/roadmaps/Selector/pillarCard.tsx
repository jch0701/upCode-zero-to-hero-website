import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router';
import { toggleView, autosetViewTrue } from '@/store/pillarsSlice';
import { useSelector } from "react-redux";
import type { LinkCardProps } from './linkCard';

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
    const linksData = useSelector((state: any) => state.link.linkList) as LinkCardProps[];
    // toggleViewed indicator
    const handleToggleViewed = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(toggleView(chapterID))
    };
    // percentage generator
    const generateViewPercentage = (chapterID: number) => {
        const filtered = linksData.filter(p => p.chapterID === chapterID);
        if (filtered.length === 0) {
            return 0; // Return 0% for chapters with no links
        }
        const viewArr = filtered.map(p => p.isViewed);

        const viewScore = (level: boolean) => (level ? 1 : 0);

        const getPercentage = (arr: boolean[]) => {
            const avg = arr.reduce((sum, d) => sum + viewScore(d), 0) / arr.length;
            return avg;
        }
        const percentage = getPercentage(viewArr) * 100;
        const percentText = Math.round(percentage);
        if(percentText == 100){
            dispatch(autosetViewTrue(chapterID))
        }
        return percentText
    }

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

            {/* Percentage Viewer */}
            {generateViewPercentage(chapterID)!==100 && generateViewPercentage(chapterID)!==0 && 
            (<div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-gray-300 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 transition-all duration-300"
                        style={{ width: `${generateViewPercentage(chapterID)}%` }}
                    ></div>
                </div>
                <div className="text-gray-700 font-semibold text-sm min-w-[40px]">
                    {generateViewPercentage(chapterID)}%
                </div>
            </div>)}

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