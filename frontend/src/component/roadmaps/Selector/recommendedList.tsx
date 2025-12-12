import React from "react";
import RecommendationCard from "@/component/roadmaps/Selector/recommendationCard";
import { useSelector } from "react-redux";
import type { ProjectType } from "@/store/projectsSlice";
import type { PillarType } from "@/store/pillarsSlice";

interface recommendationListProps {
    selectedChapterID: number
    selectedSection: string
    searchQuery: string
}

const RecommendedList: React.FC<recommendationListProps> = ({selectedChapterID, selectedSection, searchQuery}) => {
    const projects = useSelector((state: any) => state.projects.projectsList) as ProjectType[];
    const pillars = useSelector((state: any) => state.chapter.pillarList) as PillarType[];

    // Find the chapter/pillar to determine categories (and optionally difficulty)
    const chapter = pillars.find(p => p.chapterID === selectedChapterID);
    if (!chapter) {
        return (
            <div className="w-full mx-auto">
                <p className="text-gray-400 text-center mt-4">Chapter not found.</p>
            </div>
        );
    }

    const chapterCategories = Array.isArray(chapter.category) ? chapter.category : [chapter.category];

    // Candidate projects: match category
    const candidate = projects.filter(project => {
        if(selectedSection === "highly-recommended"){
            if(chapter.difficulty !== project.difficulty) return false;
            return chapterCategories.includes(project.category);
        }
        else if (selectedSection === "fairly-recommended"){
            if(chapter.difficulty === project.difficulty) return false;
            return chapterCategories.includes(project.category);
        }
        else if (selectedSection === "not-recommended")
            return !chapterCategories.includes(project.category);
    })

    const normalizedQuery = searchQuery.toLowerCase().trim();

    const filteredCandidates = candidate.filter(project => {
        if (!normalizedQuery) {
            return true; // If query is empty, show all primary candidates
        }

        // Check if query matches title, category, or difficulty
        const titleMatch = project.title.toLowerCase().includes(normalizedQuery);
        const categoryMatch = project.category.toLowerCase().includes(normalizedQuery);
        const difficultyMatch = project.difficulty.toLowerCase().includes(normalizedQuery);
        
        return titleMatch || categoryMatch || difficultyMatch;
    });

    // Map the final filtered list to project IDs for rendering
    const finalIds = filteredCandidates.map(p => p.projectId);

    return (
        <div className="w-full mx-auto">
            <div className="flex flex-wrap gap-2">
                {finalIds.length === 0 ? (
                    <div className="w-full mx-auto">
                        <p className="text-gray-400 text-center mb-4">No candidate projects found.</p>
                    </div>
                ) : (finalIds.map((projectId) => (
                    <div className='mb-4' key={projectId}>
                        <RecommendationCard selectedId={projectId}/>
                    </div>
                )))}
            </div>
        </div>
    )
}

export default RecommendedList;