import React, { useState } from "react";
import { X } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom";
import type { Section } from "../Roadmap";
import SectionBlock from "@/component/roadmaps/sectionBlock";
import SearchBar from "@/component/searchBar";
import RecommendedList from "@/component/roadmaps/Selector/recommendedList";

export const RecommendedCareer: React.FC = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { roadmapID } = useParams<{ roadmapID: string }>();
    const sections: Section[] = [
            { id: "highly-recommended", title: "Highly Recommended" },
            { id: "fairly-recommended", title: "Fairly Recommended" },
            { id: "not-recommended", title: "Not Recommended"},
        ]
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-gray-700/70 w-full max-w-2xl rounded-xl shadow-2xl p-6">
                <div className="flex justify-end">
                    <button
                        className="text-white hover:text-gray-400 p-1"
                        aria-label="Close Chapter Description"
                        onClick={() => navigate(-1)}
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="pb-5">
                    <SearchBar query={query} setQuery={setQuery} placeholder="Enter title of career / tags to see what career come true..." />
                </div>
                {sections.map((section) => {
                return (
                    <SectionBlock key={section.id} id={section.id} title={section.title}>
                        <RecommendedList mode = "career"
                                         selectedID={Number(roadmapID)} 
                                         selectedSection={section.id}
                                         searchQuery={query} />
                    </SectionBlock>
                );
                })}
            </div>
        </div>
    );
};