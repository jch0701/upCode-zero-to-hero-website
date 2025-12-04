import React from "react";
import SearchBar from "@/component/searchBar";
import { Button } from "@/component/shadcn/button";
import { useState } from "react";
import dice_icon from "../../assets/projects/dice_icon.png";
import folder_icon from "../../assets/projects/folder_icon.png";
import RadioGroup from "../../component/projects/radioGroup.tsx";
import type { ProjectType } from "../../store/projectsSlice.ts";
import { useSelector } from "react-redux";
import { categoryList } from "@/lib/types.ts";
import { commonButtonStyles, commonIconStyles } from "../../lib/styles.ts";
import { useNavigate } from "react-router";
import ProjectCard from "../../component/projects/projectCard.tsx";

export const Project: React.FC = () => {
    const selections = ["All", ...categoryList];
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState(selections[0]);
    const projects = useSelector((state: any) => state.projects.projectsList);
    const navigate = useNavigate();
    function handleCategoryChange(value: string) {
        setCategory(value);
    }
    function navigateToProjectDetails(projectId: string) {
        navigate(`/project/${projectId}`);
    }
    return (
        <div className="pt-6 w-[90%] mx-auto">
            <h1 className="text-3xl font-bold text-white">Browse the latest trending project ideas here!</h1>
            <div className="w-[80%] mx-auto">
                <SearchBar
                    placeholder="Enter a project title here and see what others are saying about it!"
                    query={query}
                    setQuery={setQuery}
                    className="mt-4"
                />
                <div className="flex justify-end gap-2.5 mt-4">
                    <Button variant="outline" size="lg" className={commonButtonStyles}>
                        <img src={dice_icon} alt="" className={commonIconStyles} />
                        Random Project Idea
                    </Button>
                    <Button variant="default" size="lg" className={commonButtonStyles}>
                        <img src={folder_icon} alt="" className={commonIconStyles} />
                        My Projects and Submissions
                    </Button>
                </div>
            </div>
            <div className="h-full backdrop-blur-sm bg-white/10 rounded-md p-6 mt-6 grid grid-cols-[2fr_8fr] gap-4">
                <RadioGroup
                    options={selections}
                    selected={category}
                    onClick={handleCategoryChange}
                    isHorizontal={false}
                />
                <div className="grid grid-cols-3 gap-2">
                    {projects.map((project: ProjectType) => {
                        if (category !== "All" && project.category !== category) return null;
                        return (
                            <ProjectCard key={project.projectId} project={project}
                                onClick={() => navigateToProjectDetails(project.projectId)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};