import React from "react";
import { X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import type { Section } from "../Roadmap";
import SectionBlock from "@/component/roadmaps/sectionBlock";

export const RecommendedCareer: React.FC = () => {
    const navigate = useNavigate();
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
                {sections.map((section) => {
                return (
                    <SectionBlock key={section.id} id={section.id} title={section.title}>
                        <p className="font-bold text-gray-800/70">Coming Soon</p>
                    </SectionBlock>
                );
                })}
            </div>
        </div>
    );
};