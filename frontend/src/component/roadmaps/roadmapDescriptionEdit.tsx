import defaultImageSrc from "../../assets/image/placeholder_image.jpg";
import javaImage from "../../assets/image/java_intro.jpg";
import pythonImage from "../../assets/image/python_intro.jpg"
import javaScriptImage from "../../assets/image/javascript_intro.jpg"
import cImage from "../../assets/image/c++_intro.jpg"
import machinelearningImage from "../../assets/image/machine_learning_intro.jpg"
import devopsImage from "../../assets/image/devop_intro.jpg"
import frontendImage from "../../assets/image/frontend_intro.jpg"
import backendImage from "../../assets/image/backend_intro.jpg"
import reactImage from "../../assets/image/react_intro.jpg"
import apiImage from "../../assets/image/api_intro.jpg"
import angularImage from "../../assets/image/angular_intro.jpg"
import typeScriptImage from "../../assets/image/typescript_intro.png"
import htmlcssImage from "../../assets/image/html_css_intro.jpg"
import sqlImage from "../../assets/image/sql_intro.png"



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from 'lucide-react';
import FormBar from "./formBox";
import { validateDescription, validateTitle } from "./validateFormBox";

interface RoadmapDescriptionEditProps{
    imageSrc : string;
    title: string;
    description: string;
}

const IMAGE_KEYWORD_MAP: { [key: string]: string } = {
    // IMPORTANT: Replace these with the actual public/absolute URLs for your images
    "javascript": javaScriptImage,
    "c++": cImage,
    "java": javaImage, 
    "python": pythonImage,
    "machine-learning": machinelearningImage,
    "devops": devopsImage,
    "frontend": frontendImage,
    "backend": backendImage,
    "react": reactImage,
    "api": apiImage,
    "angular" : angularImage,
    "sql" : sqlImage,
    "typescript": typeScriptImage,
    "css": htmlcssImage,
    "html": htmlcssImage
};

const RoadmapDescriptionEdit: React.FC<RoadmapDescriptionEditProps> = ({
    imageSrc, title, description}) => {
        const navigate = useNavigate();
        const [queryTitle, setQueryTitle] = useState(title);
        const [queryDescription, setQueryDescription] = useState(description)
        const [currentImageSrc, setCurrentImageSrc] = useState(imageSrc);
        const [errors, setErrors] = React.useState<string[]>([]);
        // Function to find the image URL based on the title keyword
        const getDynamicImageSrc = (inputTitle: string): string => {
            const lowerTitle = inputTitle.toLowerCase();
            
            // Check for keywords in the title
            for (const [keyword, url] of Object.entries(IMAGE_KEYWORD_MAP)) {
                // Check if the title includes any of the predefined keywords
                if (lowerTitle.includes(keyword)) {
                    return url;
                }
            }
            // If no keyword is found, return the default image source
            return defaultImageSrc;
        };


        useEffect(() => {
            const newImage = getDynamicImageSrc(queryTitle);
            setCurrentImageSrc(newImage);
                
        }, [queryTitle, defaultImageSrc]);

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            // validate title
            const titleErrors = validateTitle(queryTitle)
            const descriptionErrors = validateDescription(queryDescription)
            const errormsg = [...titleErrors, ...descriptionErrors]
            setErrors(errormsg);
            if (errormsg.length > 0) {
                return;
                } else {
                navigate(-1)
                }
        }

        return (
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
                    <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left Section: Image and Basic Info */}
                        <div className="w-full md:w-[40%]">
                            <div className="relative h-70 bg-gray-700/30 rounded-md mb-4 overflow-hidden">
                                <img
                                    src={currentImageSrc}
                                    alt={queryTitle}
                                    className="w-full h-full object-cover" 
                                    onError={(e) => {
                                        e.currentTarget.src = 'placeholder-image.jpg'; 
                                    }}
                                />
                            </div>
                            <button 
                                className="w-full bg-gray-500/80 hover:bg-gray-500 rounded-lg font-semibold transition shadow-xl"
                                onClick={handleSubmit}
                            >
                                Apply Change
                            </button>
                        </div>
                        {/* Right Section: Tags */}
                        <div className="w-full md:w-[60%]">
                            {/* Title Section */}
                            <h3 className="text-xl font-bold mb-2 text-left">Title</h3>
                                <FormBar query={queryTitle} setQuery={setQueryTitle} placeholder="Enter a title" />
                                <p className="min-h-3 text-left text-[#f60101] text-[12px]" >
                                    {errors.find((e) => e.startsWith("- Title"))}
                                </p>
                                {/* Description Section */}
                                <h3 className="text-xl font-bold mb-2 text-left">Description</h3>
                                {/* Description Text */}
                                <FormBar query={queryDescription} setQuery={setQueryDescription} isDescription={true} />
                                <p className="min-h-3 text-left text-[#f60101] text-[12px]" >
                                    {errors.find((e) => e.startsWith("- Description"))}
                                </p>
                        </div>
                    </div>
                    </form>
                </div>
        );
    }

export default RoadmapDescriptionEdit;