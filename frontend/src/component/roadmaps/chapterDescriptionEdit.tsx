import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from 'lucide-react';
import FormBar from "./formBox";

interface ChapterDescriptionEditProps{
    title : string;
    description: string;
    difficulty: string;
    order: number;
    category: string;
    prerequisite: string
}

const ChapterDescriptionEdit: React.FC<ChapterDescriptionEditProps> = ({
    title, description, difficulty, order, category, prerequisite}) => {
        const navigate = useNavigate();
        const [queryTitle, setQueryTitle] = useState(title);
        const [queryDescription, setQueryDescription] = useState(description)
        const [queryDifficulty, setQueryDifficulty] = useState(difficulty)
        const [queryOrder, setQueryOrder] = useState(String(order))
        const [queryCategory, setQueryCategory] = useState(category)
        const [queryPrerequisite, setQueryPrerequisite] = useState(prerequisite)
        return(
            <div className=" max-w-5xl mx-auto text-white">
                {/* Top Right Icon */}
                <div className="flex justify-end">
                    <button
                        className="text-white hover:text-gray-400 p-1"
                        aria-label="Close Featured Roadmap"
                        onClick={() => navigate(-1)}
                        >
                        <X size={20} />
                    </button>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Section: Order, Difficulty, Category, Prerequisite Info */}
                    <div className="w-full md:w-[55%]">
                        {/* Order Section */}
                        <h3 className="text-xl font-bold mb-2 text-left">Order</h3>
                        <FormBar query={queryOrder} setQuery={setQueryOrder} placeholder="Enter order (integer)" />
                        <br></br>
                        {/* Difficulty Section */}
                        <h3 className="text-xl font-bold mb-2 text-left">Difficulty</h3>
                        <FormBar query={queryDifficulty} setQuery={setQueryDifficulty} placeholder="Enter category (Beginner/Intermediate/Advanced)" />
                        <br></br>
                        {/* Category Section */}
                        <h3 className="text-xl font-bold mb-2 text-left">Category</h3>
                        <FormBar query={queryCategory} setQuery={setQueryCategory} placeholder="Enter tag category" />
                        <br></br>
                        {/* Prerequisite Session*/}
                        <h3 className="text-xl font-bold mb-2 text-left">Prerequisite</h3>
                        <FormBar query={queryPrerequisite} setQuery={setQueryPrerequisite} placeholder="Enter prerequisite" />
                    </div>
                    {/* Right Section: Tags */}
                    <div className="w-full md:w-[45%]">
                        {/* Title Section */}
                        <h3 className="text-xl font-bold mb-2 text-left">Chapter Title</h3>
                        <FormBar query={queryTitle} setQuery={setQueryTitle} placeholder="Enter a title" />
                        <br></br>
                        {/* Description Section */}
                        <h3 className="text-xl font-bold mb-2 text-left">Description</h3>
                        <FormBar query={queryDescription} setQuery={setQueryDescription} isDescription={true} />
                        <br></br>
                        <button 
                            className="w-full bg-gray-500/80 hover:bg-gray-500 rounded-lg font-semibold transition shadow-xl"
                            onClick={() => navigate(-1)}
                        >
                            Apply Change
                        </button>
                    </div>
                </div>
            </div>
        );
    }

export default ChapterDescriptionEdit;