import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetSingleLink } from '@/api/roadmaps/linkAPI';
import { useGetSingleRoadmap } from '@/api/roadmaps/roadmapAPI';
import { useCreateLinkRecord, useDeleteLinkRecord } from '@/api/roadmaps/recordAPI';
import { getActiveUserField } from '@/lib/utils';


// Type and data structure
export interface LinkCardProps {
    selectedNodeID: number;
}

const LinkCard : React.FC<LinkCardProps> = ({
    selectedNodeID,
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const userID = getActiveUserField("userId");
    const role = getActiveUserField("role");
    const { roadmapID, roadmapSlug, chapterID, chapterSlug } = useParams<{ roadmapID: string, roadmapSlug: string,  chapterID: string, chapterSlug: string }>();
    const [localLinkItem, setLocalLinkItem] = useState<any>(null);


    const { data: roadmapItem, isLoading: roadmapLoading } = useGetSingleRoadmap(Number(roadmapID), userID);
    const { data: linkItem, isLoading: linkLoading } = useGetSingleLink(Number(chapterID), selectedNodeID, userID)

    useEffect(() => {
        if (linkItem) {
            setLocalLinkItem(linkItem);
        }
    }, [linkItem]);

    const viewMutation = useCreateLinkRecord();
    const unviewMutation = useDeleteLinkRecord();

    if ( roadmapLoading || linkLoading ) return null;
    if ( !roadmapItem || !localLinkItem ) return <p className="text-white text-center mt-10">Link not found</p>;;

    // seperate click
    const directLink = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if(userID && !localLinkItem.isViewed){
            setLocalLinkItem({ ...localLinkItem, isViewed: true });
            viewMutation.mutate(
                { userID: userID!, recordID: Number(selectedNodeID) },
                { onError: () => setLocalLinkItem({ ...localLinkItem, isViewed: false })}
            );
        }
        window.open(localLinkItem.link, "_blank")
    }
    // toggleViewed indicator
    const handleToggleViewed = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (!userID) {
            navigate("/Login", { state: { from: location.pathname } });
            return;
        }

        if (!localLinkItem.isViewed){
            setLocalLinkItem({ ...localLinkItem, isViewed: true });
            viewMutation.mutate(
                { userID: userID!, recordID: Number(selectedNodeID) },
                { onError: () => setLocalLinkItem({ ...localLinkItem, isViewed: false })}
            );
        }
        else {
            setLocalLinkItem({ ...localLinkItem, isViewed: false });
            unviewMutation.mutate(
                { userID: userID!, recordID: Number(selectedNodeID) },
                { onError: () => setLocalLinkItem({ ...localLinkItem, isViewed: true })}
            )
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
                {localLinkItem.order}
            </div>

            {/* Title */}
            <div className="flex-grow text-lg font-medium text-gray-900 text-left">
                {localLinkItem.title}
            </div>
            
            {(creator !== userID && role !== "admin") ? (
            // Viewed Indicator
            <div onClick={handleToggleViewed} className="ml-4 cursor-pointer">
                {localLinkItem.isViewed ? (
                    <svg className={"w-6 h-6 text-green-800"} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>)
                    :
                    <div className="w-6 h-6 border-2 border-gray-400 rounded-full"></div>}
            </div>
            ):(
            // Button
            <button onClick={directLink}
                className=" px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition">
                Link
            </button>)}
        </div>
    );
    return (
        <>
        {(creator == userID || role === "admin") ? (
            // If creator → internal edit link
                <Link to={`/roadmap/${roadmapID}/${roadmapSlug}/${chapterID}/${chapterSlug}/${localLinkItem.nodeID}/edit`}
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