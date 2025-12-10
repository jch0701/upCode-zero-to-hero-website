import React, { useState } from 'react';
import PillarCard, { type PillarCardProps } from '../Selector/pillarCard.tsx';
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import type { RoadmapItemCardProps } from './roadmapCard.tsx';
import type { ProjectType } from '@/store/projectsSlice.ts';
import ProjectCard from '@/component/projects/projectCard.tsx';

interface PillarListProps {
    selectedRoadmapId: number; 
}

// Helper component to display projects for a single pillar
const Recommendation: React.FC<{ pillar: PillarCardProps; projects: ProjectType[]; navigateToProjectDetails: (projectId: number) => void }> = 
    ({ pillar, projects, navigateToProjectDetails }) => {
    const chapterProjects = projects.filter(project => {
        if (project.difficulty !== pillar.difficulty) {
            return false;
        }
        const pillarCategories = Array.isArray(pillar.category) ? pillar.category : [pillar.category];
        if (!pillarCategories.includes(project.category)) {
            return false;
        }
        return true;
    });

    const chapterCareers: any[] = [];
    const [activeTab, setActiveTab] = useState<'project' | 'career'>('project');

        return (
            <div className='pl-5 pr-5'>
                {/* small backgroundless navbar */}
                <div className="flex items-center gap-4 mb-3 justify-end">
                    <button
                        type="button"
                        onClick={() => setActiveTab('project')}
                        className={`text-sm font-semibold ${activeTab === 'project' ? 'text-white underline' : 'text-gray-300'}`}>
                        Suggested project
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('career')}
                        className={`text-sm font-semibold ${activeTab === 'career' ? 'text-white underline' : 'text-gray-300'}`}>
                        Suggested career
                    </button>
                </div>

                {activeTab === 'project' && (
                    chapterProjects.length > 0 ? (
                        <div className="flex flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden space-x-4">
                            {chapterProjects.map((project: ProjectType) => (
                                <div className="flex-shrink-0 w-70" key={project.projectId}>
                                    <ProjectCard 
                                        project={project}
                                        onClick={() => navigateToProjectDetails(project.projectId)}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="pl-5 text-sm text-gray-400">No suggested projects found.</p>
                    )
                )}

                {activeTab === 'career' && (
                    chapterCareers.length > 0 ? (
                        <div className="flex flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden space-x-4">
                            {/* TODO: render career cards when careers are available */}
                        </div>
                    ) : (
                        <p className="pl-5 text-sm text-gray-400">No career found.</p>
                    )
                )}
            </div>
        );
};

const PillarList: React.FC<PillarListProps> = ({ selectedRoadmapId }) => {
// Filter pillars based on selectedRoadmapId
const roadmapData = useSelector((state: any) => state.roadmap.roadmapList) as RoadmapItemCardProps[];
const pillarsData = useSelector((state: any) => state.chapter.pillarList) as PillarCardProps[];
const projects = useSelector((state: any) => state.projects.projectsList) as ProjectType[];
const filteredPillars = pillarsData.filter(pillar => pillar.roadmapID === selectedRoadmapId);
const roadmapSlug = roadmapData.find(r => r.roadmapID === selectedRoadmapId)?.roadmapSlug || 'Unknown Roadmap Slug';
const roadmapTitle = roadmapData.find(r => r.roadmapID === selectedRoadmapId)?.title || 'Unknown Roadmap';
const creator = roadmapData.find(r => r.roadmapID === selectedRoadmapId)?.creatorID || 'Unknown creator';
const userID = localStorage.getItem("userID");
// order by 'order' field
filteredPillars.sort((a, b) => a.order - b.order);
const navigate = useNavigate();

function navigateToProjectDetails(projectId: number) {
    navigate(`/project/${projectId}`);
}

// Helper function to check if a pillar has matching projects
function hasProjects(pillar: PillarCardProps): boolean {
    const chapterProjects = projects.filter(project => {
        if (project.difficulty !== pillar.difficulty) {
            return false;
        }
        const pillarCategories = Array.isArray(pillar.category) ? pillar.category : [pillar.category];
        if (!pillarCategories.includes(project.category)) {
            return false;
        }
        return true;
    });
    return chapterProjects.length > 0;
}

const [openChapterId, setOpenChapterId] = useState<number | null>(null);

function toggleProjectsVisibility(chapterID: number) {
    // If the clicked chapter is already open, close it (set to null)
    // Otherwise, open the clicked chapter
    setOpenChapterId(prevId => (prevId === chapterID ? null : chapterID));
}

    return (
        <div className="w-full mx-auto">
            <div className='flex items-center justify-between mb-6'>
                <h3 className="text-3xl font-semibold text-white text-left">
                    Chapters for {roadmapTitle}
                </h3>
                {((Number(userID) === creator) && 
                <Link to={`/roadmap/${selectedRoadmapId}/${roadmapSlug}/add-chapter`}>
                    <button className=' px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition'>
                        Add chapter
                    </button>
                </Link>)}
            </div>
            {filteredPillars.length === 0 ? (
                <p className="text-gray-400 text-center mt-10">No chapters found for this roadmap.</p>
            ) : (filteredPillars.map((pillar) => (
                <div key={pillar.chapterID} className="mb-8">
                    <PillarCard 
                        key={pillar.chapterID}
                        {...pillar}
                        onToggleClick={toggleProjectsVisibility}
                        isOpen={openChapterId === pillar.chapterID}
                        showArrow={hasProjects(pillar)}
                    />
                    {openChapterId === pillar.chapterID && (
                        <Recommendation
                            pillar={pillar}
                            projects={projects}
                            navigateToProjectDetails={navigateToProjectDetails}
                        />
                    )}
                </div>
            )))}
        </div>
    );
};

export default PillarList;