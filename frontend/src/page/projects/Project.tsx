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
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { ProjectForm } from "./projectForm.tsx";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/component/shadcn/dialog";
import { FieldGroup } from "@/component/shadcn/field";
import { commonBackgroundClass } from "@/lib/styles";


export const Project: React.FC = () => {
    const selections = ["All", ...categoryList];
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState(selections[0]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const projects = useSelector((state: any) => state.projects.projectsList);
    const navigate = useNavigate();

    function handleCategoryChange(value: string) {
        setCategory(value);
    }

    function navigateToProjectDetails(projectId: number) {
        navigate(`/project/${projectId}`);
    }

    function navigateToRandomProject() {
        if (projects.length === 0) return;
        const randomIndex = Math.floor(Math.random() * projects.length);
        const randomProject = projects[randomIndex];
        navigate(`/project/${randomProject.projectId}`);
    }

    const hasProjectsToShow = category === "All" || projects.some((project: ProjectType) => project.category === category);
    return (
        <div className="pt-6 px-3 w-full mx-auto flex">
            <div className="fixed w-65 top-20 bottom-0">
                <RadioGroup
                    options={selections}
                    selected={category}
                    onClick={handleCategoryChange}
                    isHorizontal={false}
                />
            </div>
            <div className="pl-10 grow ml-65">
                <div className="sticky">
                    <h1 className="text-3xl font-bold text-white">Browse the latest trending project ideas here!</h1>
                    <div className="w-[80%] mx-auto my-5">
                        <SearchBar
                            placeholder="Search projects by title or description"
                            query={query}
                            setQuery={setQuery}
                            className="mt-4"
                        />
                        <div className="flex justify-end gap-2.5 mt-4">
                            <Button variant="outline" size="lg" className={commonButtonStyles} onClick={navigateToRandomProject}>
                                <img src={dice_icon} alt="" className={commonIconStyles} />
                                Random Project Idea
                            </Button>
                            <Button variant="default" size="lg" className={commonButtonStyles} onClick={() => navigate("/project/myProjects")}>
                                <img src={folder_icon} alt="" className={commonIconStyles} />
                                My Projects and Submissions
                            </Button>
                            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className={`${commonButtonStyles} h-10`}>+ Add a project</Button>
                                </DialogTrigger>
                                <DialogContent className={`${commonBackgroundClass} flex flex-col sm:gap-0`}>
                                    <DialogHeader>
                                        <DialogTitle>Contribute a new project idea to the community</DialogTitle>
                                        <DialogDescription>
                                            Share your innovative project ideas with others by filling out the form below.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <FieldGroup className={commonBackgroundClass}>
                                        <ProjectForm openAsCreateForm={true} close={() => setDialogOpen(false)} />
                                    </FieldGroup>
                                </DialogContent>
                            </Dialog>

                        </div>
                    </div>
                </div>
                {
                    hasProjectsToShow ?
                        <div className="grid grid-cols-3 gap-2">
                            {projects.map((project: ProjectType) => {
                                if (category !== "All" && project.category !== category) return null;
                                if (query && !project.title.toLowerCase().includes(query.toLowerCase()) &&
                                    !project.shortDescription.toLowerCase().includes(query.toLowerCase())) {
                                    return null;
                                }
                                return (
                                    <ProjectCard key={project.projectId} project={project}
                                        onClick={() => navigateToProjectDetails(project.projectId)}
                                    />
                                );
                            })}
                        </div> :
                        <p className="text-white font-light text-4xl text-center mt-10">No {category === "All" ? "" : category} projects found</p>
                }
            </div>
        </div>
    );
};