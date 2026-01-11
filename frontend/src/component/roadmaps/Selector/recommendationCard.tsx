import { useGetSingleCareer } from "@/api/careers/careerAPI";
import { useGetByIdComplete } from "@/api/projects/projectsAPI";
import { useCreateRoadmapRecommendation, useDeleteRoadmapRecommendation, useGetRoadmapRecommendation } from "@/api/roadmaps/recommendationAPI";
import { getActiveUserField } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

interface RecommendProps {
  mode: "career" | "project"
  selectedId: number;
}

const RecommendationCard: React.FC<RecommendProps> =({
   mode, selectedId
}) => {
    const userID = getActiveUserField("userId");
    const { chapterID: chapterIdParam, roadmapID: roadmapIdParam } = useParams<{ chapterID: string, roadmapID: string}>();
    const chapterID = chapterIdParam ? Number(chapterIdParam) : 0;
    const roadmapID = roadmapIdParam ? Number(roadmapIdParam) : 0;
    const [localCheckedRecommendation, setLocalCheckedRecommendation] = useState(false);

    const { data: recommendedData = [], isLoading: recommendedLoading } = useGetRoadmapRecommendation();
    const { data: projects } = useGetByIdComplete(mode === "project" ? selectedId : 0, userID!)
    const { data: careers } = useGetSingleCareer(mode === "career" ? selectedId : 0);
``
    const recommendMutation = useCreateRoadmapRecommendation();
    const unrecommendMutation = useDeleteRoadmapRecommendation();

    const title =
    mode === "project" 
      ? projects?.title ?? "Unknown Title"
      : careers?.title ?? "Unknown Title";

    const isRecommended = recommendedData.some(data => {
    return (
        data.sourceId === (mode === "project" ? chapterID : roadmapID) &&
        data.sourceType === (mode === "project" ? "chapter" : "roadmap") &&
        data.targetId === selectedId &&
        data.targetType === (mode === "project" ? "project" : "career")
        );
    });

    useEffect(() => {
        if (isRecommended) {
            setLocalCheckedRecommendation(isRecommended);
        }
    }, [isRecommended]);

    if ( recommendedLoading ) return null;
    if ( !recommendedData ) return <p className="text-white text-center mt-10">Recomendation data not found</p>;;
    
    const recommendedID =
    recommendedData.find(data => {
      return (
        data.sourceId === (mode === "project" ? chapterID : roadmapID) &&
        data.sourceType === (mode === "project" ? "chapter" : "roadmap") &&
        data.targetId === selectedId &&
        data.targetType === (mode === "project" ? "project" : "career")
      );
    })?.recommendationId ?? 0;


    const colorClasses = localCheckedRecommendation
        ? "bg-purple-600/70 border-purple-600 hover:bg-purple-600/90"
        : "bg-pink-100/70 border-pink-300 hover:bg-pink-200/90";
    const colorText = localCheckedRecommendation
        ? "text-white"
        : "text-gray-900";
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!localCheckedRecommendation){
            setLocalCheckedRecommendation(true);
            recommendMutation.mutate({
                sourceId: mode === "project" ? chapterID : roadmapID,
                sourceType: mode === "project" ? "chapter" : "roadmap",
                targetId: selectedId,
                targetType: mode === "project" ? "project" : "career"
            },{ onError: () => setLocalCheckedRecommendation(false)}
            )
        }
        else {
            setLocalCheckedRecommendation(false);
            unrecommendMutation.mutate(Number(recommendedID),
            { onError: () => setLocalCheckedRecommendation(true)})
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