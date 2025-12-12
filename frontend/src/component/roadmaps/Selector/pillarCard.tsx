import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { toggleView, autosetViewTrue, type PillarType } from '@/store/pillarsSlice';
import { useSelector } from "react-redux";
import down from "../../../assets/image/down.png"
import type { LinkType } from '@/store/linksSlice';

// Type and data structure
export interface PillarCardProps {
    selectedChapterID: number;
    onToggleClick: (chapterID: number) => void;
    isOpen: boolean;
    showArrow?: boolean;
}

const PillarCard : React.FC<PillarCardProps> = ({
    selectedChapterID, onToggleClick, isOpen, showArrow = true

}) => {
    // use link to get roadmap slug
    const { roadmapSlug } = useParams<{ roadmapSlug: string }>();
    const dispatch = useDispatch();
    const linksData = useSelector((state: any) => state.link.linkList) as LinkType[];
    const pillarData = useSelector((state: any) => state.chapter.pillarList) as PillarType[];
    const chapterItem = pillarData.find(p => p.chapterID === selectedChapterID);
    if (!chapterItem) return <p className="text-white text-center mt-10">Chapter not found</p>;
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
            const userID = localStorage.getItem("userID");
            setIsLoggedIn(userID && userID !== "0" ? true : false);
    }, [location]); // re-check when route changes
    
    // toggleViewed indicator
    const handleToggleViewed = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if(isLoggedIn){
            dispatch(toggleView(chapterItem.chapterID))
        }
        else{
            navigate("/Login", { state: { from: location.pathname } });
        }
    };

    const handleArrowClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        // Call the function passed from the parent (PillarList)
        onToggleClick(chapterItem.chapterID);
    }

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
        <div className='relative p-4 m-2 rounded-xl shadow-lg transition-all duration-300 
                        bg-pink-100/70 border-2 border-opacity-70 border-pink-300
                        cursor-pointer hover:bg-pink-200/90'>
            <Link to={`/roadmap/${chapterItem.roadmapID}/${roadmapSlug}/${chapterItem.chapterID}/${chapterItem.chapterSlug}`}>
                <div className={`flex items-center`}>
                    {/* Order Number or Checkmark */}
                    <div className=" 
                    flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center 
                    bg-gray-300 text-gray-800 font-bold text-sm mr-4
                    ">
                        {chapterItem.order}
                    </div>

                    {/* Title */}
                    <div className="flex-grow text-lg font-medium text-gray-900 text-left">
                        {chapterItem.title}
                    </div>

                    {/* Percentage Viewer */}
                    {generateViewPercentage(chapterItem.chapterID)!==100 && generateViewPercentage(chapterItem.chapterID)!==0 && 
                    (<div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-300 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 transition-all duration-300"
                                style={{ width: `${generateViewPercentage(chapterItem.chapterID)}%` }}
                            ></div>
                        </div>
                        <div className="text-gray-700 font-semibold text-sm min-w-[40px]">
                            {generateViewPercentage(chapterItem.chapterID)}%
                        </div>
                    </div>)}

                    {/* Viewed Indicator */}
                    <div onClick={handleToggleViewed} className="ml-4 cursor-pointer">
                        {chapterItem.isViewed ? (
                            <svg className={"w-6 h-6 text-green-800"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>)
                            :
                            <div className="w-6 h-6 border-2 border-gray-400 rounded-full"></div>}
                    </div>
                </div>
            </Link>
            {showArrow && (
            <img
                src={down}
                alt={chapterItem.title}
                onClick={handleArrowClick}
                className={`w-5 h-5 rounded-full bg-white border-2 border-pink-300 absolute left-1/2 -bottom-3 ${isOpen ? 'rotate-180' : ''} transform -translate-x-1/2`} 
            />
            )}
        </div>
    );
}

export default PillarCard;