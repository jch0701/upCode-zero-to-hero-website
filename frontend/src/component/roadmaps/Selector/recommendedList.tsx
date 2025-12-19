import React from "react";
import RecommendationCard from "@/component/roadmaps/Selector/recommendationCard";
import { useSelector } from "react-redux";
import type { ProjectType } from "@/lib/projectModuleTypes";
import type { CareerItem } from "@/store/careerSlice";
import { getDifficultyLabel } from "../groupTag";
import { useParams } from "react-router";
import { useGetRoadmapChapters, useGetSingleChapter } from "@/api/roadmaps/chapterAPI";
import { useGetAllBasicDetailsOnly } from "@/api/projects/projectsAPI";

interface recommendationListProps {
    mode: "project" | "career"
    selectedID: number
    selectedSection: string
    searchQuery: string
}

const RecommendedList: React.FC<recommendationListProps> = ({mode, selectedID, selectedSection, searchQuery}) => {
    const userID = localStorage.getItem("userID");
    const { roadmapID } = useParams<{ roadmapID: string }>();
    const careers = useSelector((state: any) => state.career.careerList) as CareerItem[];
    let finalIds: number[] = []
    
    // Find the chapter/pillar to determine categories (and optionally difficulty)
    if (mode === "project"){
        const { data: chapter, isLoading: chapterLoading } = useGetSingleChapter(Number(roadmapID), selectedID, userID);
        const { data: projects = [], isLoading: projectLoading } = useGetAllBasicDetailsOnly(Number(userID))
        if ( chapterLoading || projectLoading ) <span className="text-amber-50 text-3xl">Loading Data...</span>
        if ( !chapter || !projects ) return <p className="text-gray-400 text-center mt-4">Recommended project not found.</p>;

        const categories = Array.isArray(chapter.category) ? chapter.category : [chapter.category];
        const prerequisites = Array.isArray(chapter.prerequisite) ? chapter.prerequisite : [chapter.prerequisite];
        const tags = [...categories, ...prerequisites];

        // Candidate projects: match category
        const candidate = projects.filter((project: ProjectType) => {
            if(selectedSection === "highly-recommended"){
                if(chapter.difficulty !== project.difficulty) return false;
                return tags.includes(project.category);
            }
            else if (selectedSection === "fairly-recommended"){
                if(chapter.difficulty === project.difficulty) return false;
                return tags.includes(project.category);
            }
            else if (selectedSection === "not-recommended")
                return !tags.includes(project.category);
        })

        const normalizedQuery = searchQuery.toLowerCase().trim();
        const filteredCandidates = candidate.filter((project: ProjectType) => {
            if (!normalizedQuery) {return true;}
            // Check if query matches title, category, or difficulty
            const titleMatch = project.title.toLowerCase().includes(normalizedQuery);
            const categoryMatch = project.category.toLowerCase().includes(normalizedQuery);
            const difficultyMatch = project.difficulty.toLowerCase().includes(normalizedQuery);
            return titleMatch || categoryMatch || difficultyMatch;
        });
        
        // Map the final filtered list to project IDs for rendering
        finalIds = filteredCandidates.map((p: ProjectType) => p.projectId);
    }
    else if (mode === "career"){
        const { data: relatedPillars, isLoading: chapterLoading } = useGetRoadmapChapters(selectedID, userID);
        if ( chapterLoading ) return <span className="text-amber-50 text-3xl">Loading Data...</span>
        if ( !relatedPillars ) return <p className="text-gray-400 text-center mt-4">Recommended career not found.</p>;
        const categories = relatedPillars.flatMap(p =>
            Array.isArray(p.category) ? p.category : [p.category]
        );
        const prerequisites = relatedPillars.flatMap(p =>
            Array.isArray(p.prerequisite) ? p.prerequisite : [p.prerequisite]
        );
        const difficulties = relatedPillars.flatMap(p =>
            Array.isArray(p.difficulty) ? p.difficulty : [p.difficulty]
        );
        const overallDifficulties = getDifficultyLabel(difficulties);

        
        const tags = [...categories, ...prerequisites];
        const candidate = careers.filter(careers => {
            if(selectedSection === "highly-recommended"){
                if(overallDifficulties !== careers.level) return false;
                return tags.includes(careers.prerequisites);
            }
            else if (selectedSection === "fairly-recommended"){
                if(overallDifficulties === careers.level) return false;
                return tags.includes(careers.prerequisites);
            }
            else if (selectedSection === "not-recommended")
                return !tags.includes(careers.prerequisites);
        })

        const normalizedQuery = searchQuery.toLowerCase().trim();
        const filteredCandidates = candidate.filter(careers => {
            if (!normalizedQuery) {return true;}
            // Check if query matches title, category, or difficulty
            const titleMatch = careers.title.toLowerCase().includes(normalizedQuery);
            const categoryMatch = careers.category.toLowerCase().includes(normalizedQuery);
            const prerequisiteMatch = Array.isArray(careers.prerequisites)
                                    ? careers.prerequisites.some(l => l.toLowerCase().includes(normalizedQuery))
                                    : (careers.prerequisites ?? '').toLowerCase().includes(normalizedQuery);
            const difficultyMatch = (careers.level ?? '').toLowerCase().includes(normalizedQuery);
            return titleMatch || prerequisiteMatch || categoryMatch || difficultyMatch ;
        });
        // Map the final filtered list to project IDs for rendering
        finalIds = filteredCandidates.map(c => c.id);
    }

    return (
        <div className="w-full mx-auto">
            <div className="flex flex-wrap gap-2">
                {finalIds.length === 0 ? (
                    <div className="w-full mx-auto">
                        <p className="text-gray-400 text-center mb-4">
                            No candidate {mode === "project" ? "projects" : "careers"} found.
                        </p>
                    </div>
                ) : (finalIds.map((Id) => (
                    <div className='mb-4' key={Id}>
                        <RecommendationCard mode={mode} selectedId={Id}/>
                    </div>
                )))}
            </div>
        </div>
    )
}

export default RecommendedList;