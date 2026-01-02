import React, {useEffect, useState} from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router';
import down from "../../../assets/image/down.png"
import { useGetSingleChapter } from '@/api/roadmaps/chapterAPI';
import { useGetChapterLinks } from '@/api/roadmaps/linkAPI';
import { useCreateChapterRecord, useDeleteChapterRecord } from '@/api/roadmaps/recordAPI';
import { getActiveUserField } from '@/lib/utils';

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
    const location = useLocation();
    const navigate = useNavigate();
    
    // use link to get roadmap slug
    const userID = getActiveUserField("userId");
    const { roadmapID, roadmapSlug } = useParams<{ roadmapID: string, roadmapSlug: string }>();
    const [localChapterItem, setLocalChapterItem] = useState<any>(null);

    const { data: chapterItem , isLoading: chapterLoading } = useGetSingleChapter(Number(roadmapID), selectedChapterID, userID);

    useEffect(() => {
        if (chapterItem) {
            setLocalChapterItem(chapterItem);
        }
    }, [chapterItem]);

    const { data: linksData = [], isLoading: linksLoading } = useGetChapterLinks(selectedChapterID, userID);

    const viewMutation = useCreateChapterRecord();
    const unviewMutation = useDeleteChapterRecord();
    
    // percentage generator
    const generateViewPercentage = () =>  {
        if (!linksData || linksData.length === 0) return 100;
        const viewedCount = linksData.filter(link => link.isViewed).length;
        return Math.round((viewedCount / linksData.length) * 100);
    }

    const viewPercentage = generateViewPercentage();

    useEffect(() => {
        if (!localChapterItem) return;
        if (viewPercentage === 100 && !localChapterItem.isViewed) {
            setLocalChapterItem({ ...localChapterItem, isViewed: true });
            viewMutation.mutate(
                { userID: userID!, recordID: Number(selectedChapterID) },
                { onError: () => setLocalChapterItem({ ...localChapterItem, isViewed: false })}
            );
        }
    }, [viewPercentage]);

    if ( chapterLoading || linksLoading) return null;
    if ( !linksData || !localChapterItem ) return <p className="text-white text-center mt-10">Chapter not found</p>;

    // toggleViewed indicator
    const handleToggleViewed = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (!userID) {
            navigate("/Login", { state: { from: location.pathname } });
            return;
        }

        if (!localChapterItem.isViewed){
            setLocalChapterItem({ ...localChapterItem, isViewed: true });
            viewMutation.mutate(
                { userID: userID!, recordID: Number(selectedChapterID) },
                { onError: () => setLocalChapterItem({ ...localChapterItem, isViewed: false })}
            );
        }
        else {
            if( viewPercentage !== 100){
                setLocalChapterItem({ ...localChapterItem, isViewed: false });
                unviewMutation.mutate(
                    { userID: userID!, recordID: Number(selectedChapterID) },
                    { onError: () => setLocalChapterItem({ ...localChapterItem, isViewed: true })}
                )
            }
            else{
                alert("Cannot unview a fully viewed chapter. Please unview some links first.");
            }
        }

    };

    const handleArrowClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        // Call the function passed from the parent (PillarList)
        onToggleClick(selectedChapterID);
    }

    return (
        <div className='relative p-4 m-2 rounded-xl shadow-lg transition-all duration-300 
                        bg-pink-100/70 border-2 border-opacity-70 border-pink-300
                        cursor-pointer hover:bg-pink-200/90'>
            <Link to={`/roadmap/${roadmapID}/${roadmapSlug}/${selectedChapterID}/${localChapterItem.chapterSlug}`}>
                <div className={`flex items-center`}>
                    {/* Order Number or Checkmark */}
                    <div className=" 
                    flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center 
                    bg-gray-300 text-gray-800 font-bold text-sm mr-4
                    ">
                        {localChapterItem.order}
                    </div>

                    {/* Title */}
                    <div className="flex-grow text-lg font-medium text-gray-900 text-left">
                        {localChapterItem.title}
                    </div>

                    {/* Percentage Viewer */}
                    {viewPercentage !== 100 && 
                    (<div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-300 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 transition-all duration-300"
                                style={{ width: `${viewPercentage}%` }}
                            ></div>
                        </div>
                        <div className="text-gray-700 font-semibold text-sm min-w-[40px]">
                            {viewPercentage}%
                        </div>
                    </div>)}

                    {/* Viewed Indicator */}
                    <div onClick={handleToggleViewed} className="ml-4 cursor-pointer">
                        {localChapterItem.isViewed ? (
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
                alt={localChapterItem.title}
                onClick={handleArrowClick}
                className={`w-5 h-5 rounded-full bg-white border-2 border-pink-300 absolute left-1/2 -bottom-3 ${isOpen ? 'rotate-180' : ''} transform -translate-x-1/2`} 
            />
            )}
        </div>
    );
}

export default PillarCard;