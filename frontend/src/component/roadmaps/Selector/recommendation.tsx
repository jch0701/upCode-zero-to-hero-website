import React, { useState } from 'react';
import type { PillarCardProps } from './pillarCard';
import type { ProjectType } from '@/store/projectsSlice';
import ProjectCard from '@/component/projects/projectCard';
import AddRecommendation from './recommendationAdd';
import { useParams } from 'react-router';


const Recommendation: React.FC<{ pillar: PillarCardProps; projects: ProjectType[]; navigateToProjectDetails: (projectId: number) => void; creator: string }> = 
    ({ pillar, projects, navigateToProjectDetails, creator }) => {
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
    const userID = localStorage.getItem("userID");
    const { roadmapID, roadmapSlug } = useParams<{ roadmapID: string, roadmapSlug: string }>();

        return (
            <div className='pl-5 pr-5'>
                {/* small backgroundless navbar */}
                <div className="flex items-center gap-4 mb-3 justify-end">
                    {(chapterProjects.length > 0 || userID === creator) && (<button
                        type="button"
                        onClick={() => setActiveTab('project')}
                        className={`text-sm font-semibold ${activeTab === 'project' ? 'text-white underline' : 'text-gray-300'}`}>
                        Suggested project
                    </button>)}
                    {(chapterCareers.length > 0 || userID === creator) && (<button
                        type="button"
                        onClick={() => setActiveTab('career')}
                        className={`text-sm font-semibold ${activeTab === 'career' ? 'text-white underline' : 'text-gray-300'}`}>
                        Suggested career
                    </button>)}
                </div>

                {activeTab === 'project' && (
                    chapterProjects.length > 0 ? (
                        <div className="flex flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden space-x-4">
                            {chapterProjects.map((project: ProjectType) => (
                                <div className="flex-shrink-0 w-70" key={project.projectId}>

                                    <ProjectCard 
                                        projectId={project.projectId}
                                        onClick={() => navigateToProjectDetails(project.projectId)}
                                    />
                                </div>
                            ))}
                            {userID === creator && (
                            <AddRecommendation extraClass='flex-shrink-0' link={`/roadmap/${roadmapID}/${roadmapSlug}/${pillar.chapterID}/${pillar.chapterSlug}/recommend-project`}/>)}
                        </div>
                    ) : (
                        <>
                        {userID === creator ?
                            (<AddRecommendation extraClass='mx-auto h-58' link={`/roadmap/${roadmapID}/${roadmapSlug}/${pillar.chapterID}/${pillar.chapterSlug}/recommend-project`}/>)
                            :
                            (<p className="pl-5 text-sm text-gray-400">No suggested projects found.</p>)}
                        </>
                    )
                )}

                {activeTab === 'career' && (
                    chapterCareers.length > 0 ? (
                        <div className="flex flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden space-x-4">
                            {userID === creator && (
                            <AddRecommendation extraClass='flex-shrink-0' link={`/roadmap/${roadmapID}/${roadmapSlug}/${pillar.chapterID}/${pillar.chapterSlug}/recommend-career`}/>)}
                        </div>
                    ) : (
                        <>
                        {userID === creator ?
                            (<AddRecommendation extraClass='mx-auto h-58' link={`/roadmap/${roadmapID}/${roadmapSlug}/${pillar.chapterID}/${pillar.chapterSlug}/recommend-career`}/>)
                            :
                            (<p className="pl-5 text-sm text-gray-400">No suggested career found.</p>)}
                        </>
                    )
                )}
            </div>
        );
};

export default Recommendation