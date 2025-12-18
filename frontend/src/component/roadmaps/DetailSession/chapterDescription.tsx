import React from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { TagPill } from "../../tag";
import type { Tag } from "../../tag";
import { X } from 'lucide-react';
import { useGetSingleChapter } from "@/api/roadmaps/chapterAPI";
import { useGetSingleRoadmap } from "@/api/roadmaps/roadmapAPI";
import { useGetChapterLinks } from "@/api/roadmaps/linkAPI";
import { useGetSingleUser } from "@/api/roadmaps/userAPI";
import { IMAGE_MAP } from "@/lib/image";

interface PillarDescription {
    selectedChapterID: number;
}

const ChapterDescription: React.FC<PillarDescription> = ({
    selectedChapterID
}) => {
    const navigate = useNavigate();
    const userID = localStorage.getItem("userID");
    const { roadmapID } = useParams<{ roadmapID: string }>();

    const { data: roadmapItem, isLoading: roadmapLoading, isError: roadmapError } = useGetSingleRoadmap(Number(roadmapID), userID);
    const { data: chapterItem , isLoading: chapterLoading, isError: chapterError } = useGetSingleChapter(Number(roadmapID),selectedChapterID,userID);
    const { data: linksData = [] } = useGetChapterLinks(selectedChapterID,userID);
    const { data: userData } = useGetSingleUser(Number(userID))

    if (roadmapLoading || chapterLoading) return <div className="w-72 h-64 bg-gray-800 animate-pulse rounded-lg" />;
    if (roadmapError || chapterError || !chapterItem ) return null;

    const imageSrc = roadmapItem?.imageSrc ?? 'Unknown Image'
    const creator = roadmapItem?.creatorID ?? 'Unknown Creator';
    const username = userData?.username ?? 'Unknown Username';
    const roadmapSlug = roadmapItem?.roadmapSlug ?? 'Unknown Roadmap Slug';
    const displayImage = IMAGE_MAP[imageSrc] || imageSrc;

    const uniqueModifiedDate = [Date.parse(chapterItem.modifiedDate),
                                ...new Set(linksData.map(data => Date.parse(data.modifiedDate)))];
    let latestModifiedDate: string;

    
    if (uniqueModifiedDate.length > 0) {
        const maxTimestamp: number = Math.max(...uniqueModifiedDate);
        const latestDateObject: Date = new Date(maxTimestamp);
        latestModifiedDate = latestDateObject.toISOString().slice(0,10);

    } 
    else latestModifiedDate = chapterItem.modifiedDate ?? "";

    const tags: Tag[] = [
        { type: 'Difficulty', label: chapterItem.difficulty },
        { type: 'Category', label: chapterItem.category },
        { type: 'Prerequisite', label: chapterItem.prerequisite },
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
                            src={displayImage}
                            alt={chapterItem.title}
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                                e.currentTarget.src = 'placeholder-image.jpg'; 
                            }}
                        />
                    </div>
                    {(Number(userID) === creator) && 
                    (<Link to={`/roadmap/${chapterItem.roadmapID}/${roadmapSlug}/${chapterItem.chapterID}/${chapterItem.chapterSlug}/edit`}>
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
                    <h2 className="text-3xl font-bold mb-4 text-left">{chapterItem.title}</h2>
                    {/* Creator and  Modified date info */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-left">
                        {((Number(userID) !== creator) && 
                        <div>
                            <h3 className="font-semibold text-left">Creator</h3>
                            <Link to={`/profile/${creator}`}>
                                <p className="mt-1 text-gray-300">{username}</p>
                            </Link>
                        </div>)}
                        <div>
                            <h3 className="font-semibold text-left">Last Modified</h3>
                            <p className="mt-1 text-gray-300">{latestModifiedDate}</p>
                        </div>
                    </div>
                    {/* Description */}
                    {chapterItem.description && (
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-left">Description</h3>
                            <p className="text-gray-300 leading-relaxed text-base whitespace-pre-wrap text-justify">
                                {chapterItem.description}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default ChapterDescription;