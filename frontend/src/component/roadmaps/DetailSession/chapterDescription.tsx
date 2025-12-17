import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { TagPill } from "../../tag";
import type { Tag } from "../../tag";
import { X } from 'lucide-react';
import { useSelector } from "react-redux";
import type { UserListType } from "@/store/userListSlice";
import type { RoadmapType } from "@/store/roadmapSlice";
import type { PillarType } from "@/store/pillarsSlice";
import type { LinkType } from "@/store/linksSlice";

interface PillarDescription {
    selectedChapterID: number;
}

const ChapterDescription: React.FC<PillarDescription> = ({
    selectedChapterID
}) => {
    const navigate = useNavigate();
    const userID = localStorage.getItem("userID");
    const userData = useSelector((state: any) => state.userList.userList) as UserListType[];
    const roadmapData = useSelector((state: any) => state.roadmap.roadmapList) as RoadmapType[];
    const pillarData = useSelector((state: any) => state.chapter.pillarList) as PillarType[];
    const linksData = useSelector((state: any) => state.link.linkList) as LinkType[];
    const chapterItem = pillarData.find(p => p.chapterID === selectedChapterID);
    if (!chapterItem) return <p className="text-white text-center mt-10">Chapter not found</p>;
    const imageSrc = roadmapData.find(r => r.roadmapID === chapterItem.roadmapID)?.imageSrc || 'placeholder-image.jpg';
    const creator = roadmapData.find(r => r.roadmapID === chapterItem.roadmapID)?.creatorID || 'Unknown Creator';
    const username = userData.find(user => user.userId === creator)?.username || 'Unknown Username';
    const roadmapSlug = roadmapData.find(r => r.roadmapID === chapterItem.roadmapID)?.roadmapSlug || 'Unknown Roadmap Slug';

    const filterLinksData = linksData.filter(data => data.chapterID === selectedChapterID);
    const uniqueModifiedDate = [Date.parse(chapterItem.modifiedDate),
                                ...new Set(filterLinksData.map(data => Date.parse(data.modifiedDate)))];
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
                            src={imageSrc}
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