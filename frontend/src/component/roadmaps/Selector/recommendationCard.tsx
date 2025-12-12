import type { ProjectType } from "@/store/projectsSlice";
import { createRecommendation, removeRecommendation, type RecommendationType } from "@/store/recommendationSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

interface RecommendProps {
  selectedId: number;
  mode?: "career" | "project"
}

const RecommendationCard: React.FC<RecommendProps> =({
   selectedId
}) => {
    const dispatch = useDispatch();
    const projects = useSelector((state: any) => state.projects.projectsList) as ProjectType[];
    const projectTitle = projects.find(p => p.projectId === selectedId)?.title || 'Unknown Title';
    const { chapterID } = useParams<{ chapterID: string }>();
    const recommendedData = useSelector((state: any) => state.recommendations.recommendations) as RecommendationType[];
    const recommendedID = recommendedData.find(data => (
        data.sourceId === Number(chapterID) && 
        data.sourceType === "Chapter" && 
        data.targetId === selectedId &&
        data.targetType === "Project"
    ))?.recommendationId;
    const filterRecommendedData = recommendedData.filter(data => (data.sourceId === Number(chapterID) && data.sourceType === "Chapter"));
    const uniqueProjectIds = [...new Set(filterRecommendedData.map(data => data.targetId))];
    const isRecommended = uniqueProjectIds.includes(selectedId);
    const colorClasses = isRecommended
        ? "bg-purple-600/70 border-purple-600 hover:bg-purple-600/90"
        : "bg-pink-100/70 border-pink-300 hover:bg-pink-200/90";
    const colorText = isRecommended
        ? "text-white"
        : "text-gray-900";
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!isRecommended){
            dispatch(
                createRecommendation({
                    sourceId: Number(chapterID),
                    sourceType: "Chapter",
                    targetId: selectedId,
                    targetType: "Project"
                })
            )
        }
        else {
            dispatch(
                removeRecommendation(Number(recommendedID))
            )
        }
    }

    return(
            <span className={`
                inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap 
                ${colorClasses} cursor-pointer border-2 border-opacity-70
                `}
                onClick={handleSubmit}
            >
                    {/* Title */}
                    <div className={`flex-grow text-lg font-medium ${colorText} text-left`}>
                        {projectTitle}
                    </div>
            </span>
    )
}

export default RecommendationCard;