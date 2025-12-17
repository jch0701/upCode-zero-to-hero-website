import type { CareerItem } from "@/store/careerSlice";
import { updateChapterDate } from "@/store/pillarsSlice";
import type { ProjectType } from "@/store/projectsSlice";
import { createRecommendation, removeRecommendation, type RecommendationType } from "@/store/recommendationSlice";
import { updateRoadmapDate } from "@/store/roadmapSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

interface RecommendProps {
  mode: "career" | "project"
  selectedId: number;
}

const RecommendationCard: React.FC<RecommendProps> =({
   mode, selectedId
}) => {
    const dispatch = useDispatch();
    const { chapterID: chapterIdParam, roadmapID: roadmapIdParam } = useParams<{ chapterID: string, roadmapID: string}>();
    const chapterID = chapterIdParam ? Number(chapterIdParam) : 0;
    const roadmapID = roadmapIdParam ? Number(roadmapIdParam) : 0;
    const recommendedData = useSelector((state: any) => state.recommendations.recommendations) as RecommendationType[];
    const projects = useSelector((state: any) => state.projects.projectsList) as ProjectType[];
    const careers = useSelector((state: any) => state.career.careerList) as CareerItem[];

    const title =
    mode === "project"
      ? projects.find(p => p.projectId === selectedId)?.title || "Unknown Title"
      : careers.find(c => c.id === selectedId)?.title || "Unknown Title";

    const isRecommended = recommendedData.some(data => {
    return (
        data.sourceId === (mode === "project" ? chapterID : roadmapID) &&
        data.sourceType === (mode === "project" ? "Chapter" : "Roadmap") &&
        data.targetId === selectedId &&
        data.targetType === (mode === "project" ? "Project" : "Career")
        );
    });
    
    const recommendedID =
    recommendedData.find(data => {
      return (
        data.sourceId === (mode === "project" ? chapterID : roadmapID) &&
        data.sourceType === (mode === "project" ? "Chapter" : "Roadmap") &&
        data.targetId === selectedId &&
        data.targetType === (mode === "project" ? "Project" : "Career")
      );
    })?.recommendationId ?? 0;


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
                    sourceId: mode === "project" ? chapterID : roadmapID,
                    sourceType: mode === "project" ? "Chapter" : "Roadmap",
                    targetId: selectedId,
                    targetType: mode === "project" ? "Project" : "Career"
                })
            )
            dispatch(
                updateRoadmapDate(Number(roadmapID)),
                mode === "project" && updateChapterDate(Number(chapterID))
            )
        }
        else {
            dispatch(
                removeRecommendation(Number(recommendedID))
            )
            dispatch(
                updateRoadmapDate(Number(roadmapID)),
                mode === "project" && updateChapterDate(Number(chapterID))
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
                        {title}
                    </div>
            </span>
    )
}

export default RecommendationCard;