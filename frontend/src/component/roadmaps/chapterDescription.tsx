import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { TagPill } from "../tag";
import type { Tag } from "../tag";
import type { PillarCardProps } from "./pillarCard";
import { X } from 'lucide-react';
import { useSelector } from "react-redux";
import type { RoadmapItemCardProps } from "./roadmapCard";

const ChapterDescription: React.FC<PillarCardProps> = ({
    chapterID, chapterSlug, title, description, modifiedDate, difficulty, category, prerequisite, roadmapID
}) => {
    const navigate = useNavigate();
    const userID = localStorage.getItem("userID");
    const roadmapData = useSelector((state: any) => state.roadmap.roadmapList) as RoadmapItemCardProps[];
    const imageSrc = roadmapData.find(r => r.roadmapID === roadmapID)?.imageSrc || 'placeholder-image.jpg';
    const creator = roadmapData.find(r => r.roadmapID === roadmapID)?.creator || 'Unknown Creator';
    const roadmapSlug = roadmapData.find(r => r.roadmapID === roadmapID)?.roadmapSlug || 'Unknown Roadmap Slug';
    const tags: Tag[] = [
        { type: 'Difficulty', label: difficulty },
        { type: 'Category', label: category },
        { type: 'Prerequisite', label: prerequisite },
    ];
    // Get image source and creator based on roadmapID
    return (
        <div className="max-w-5xl mx-auto text-white">
            {/* Top Right Close Icon */}
            <div className="flex justify-end">
                <button
                    className="text-white hover:text-gray-400 p-1"
                    aria-label="Close Chapter Description"
                    onClick={() => navigate(-1)}
                >
                    <X size={20} />
                </button>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Picture */}
                <div className="w-full md:w-[40%]">
                    <div className="relative h-70 bg-gray-700/30 rounded-md mb-4 overflow-hidden">
                        <img
                            src={imageSrc}
                            alt={title}
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                                e.currentTarget.src = 'placeholder-image.jpg'; 
                            }}
                        />
                    </div>
                    {(Number(userID) === creator) && 
                    (<Link to={`/roadmap/${roadmapID}/${roadmapSlug}/${chapterID}/${chapterSlug}/edit`}>
                            <button 
                                className="w-full bg-gray-900/80 hover:bg-gray-900 rounded-lg font-semibold transition shadow-xl"
                            >
                                Edit
                            </button>
                    </Link>)}
                </div>
                {/* Details */}
                <div className="w-full md:w-[60%]">
                    {/* Tags Section */}
                    <div className="flex flex-wrap gap-2 down mb-6 text-black">
                        {tags.filter(tag => tag.label.trim() !== "")
                             .map((tag, index) => (
                            <TagPill key={index} tag={tag} />
                        ))}
                    </div>
                    {/* Title */}
                    <h2 className="text-3xl font-bold mb-4 text-left">{title}</h2>
                    {/* Creator and  Modified date info */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-left">
                        {((Number(userID) !== creator) && 
                        <div>
                            <h3 className="font-semibold text-left">Creator</h3>
                            <p className="mt-1 text-gray-300">{creator}</p>
                        </div>)}
                        <div>
                            <h3 className="font-semibold text-left">Last Modified</h3>
                            <p className="mt-1 text-gray-300">{modifiedDate}</p>
                        </div>
                    </div>
                    {/* Description */}
                    {description && (
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-left">Description</h3>
                            <p className="text-gray-300 leading-relaxed text-base whitespace-pre-wrap text-justify">
                                {description}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default ChapterDescription;