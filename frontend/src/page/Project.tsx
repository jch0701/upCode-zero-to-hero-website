import React from "react";
import SearchBar from "@/component/searchBar";
import { Button } from "@/component/shadcn/button";
import { useState } from "react";
import dice_icon from "../assets/projects/dice_icon.png";
import folder_icon from "../assets/projects/folder_icon.png";
import people_icon from "../assets/projects/people_icon.png";
import submission_icon from "../assets/projects/submission_icon.png";
import VerticalRadio from "../component/projects/verticalRadio";
import type { ProjectType } from "../store/projectsSlice";
import { useSelector } from "react-redux";
import { Card, CardTitle, CardDescription, CardFooter } from "@/component/shadcn/card";

export const Project: React.FC = () => {
    const [query, setQuery] = useState("");
    const projects = useSelector((state: any) => state.projects.projectsList);
    console.log("Projects from store:", projects);
    const commonIconStyles = "w-5 h-auto";
    const commonButtonStyles = "cursor-pointer";
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
            <div className="backdrop-blur-sm bg-white/10 rounded-md p-6 mt-6 grid grid-cols-[2fr_8fr] gap-4">
                <VerticalRadio
                    options={["All", "Web Development", "Mobile Apps", "Machine Learning", "Game Development", "Data Science"]}
                    onClick={(value) => console.log("Selected category:", value)}
                />
                <div className="grid grid-cols-3 gap-2">
                    {projects.map((project: ProjectType) => (
                        <Card key={project.projectId} className="bg-white/10">
                            <CardTitle className="text-lg text-white">
                                {project.title}
                            </CardTitle>
                            <CardDescription className="text-white/80">
                                <div>
                                    <p>Created by: {project.creator}</p>
                                    <ul className="flex gap-2 list-none">
                                        <li className=""><span>{project.difficulty}</span></li>
                                        <li><span>{project.category}</span></li>
                                    </ul>
                                    {project.shortDescription}
                                </div>
                            </CardDescription>
                            <CardFooter>
                                <div>
                                    <span>
                                        <img src={people_icon} alt="" className={commonIconStyles}/>
                                        {project.trackCount} Started
                                    </span>
                                    <span>
                                        <img src={submission_icon} alt="" className={commonIconStyles}/>
                                        {project.submissionCount} Submissions
                                    </span>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};