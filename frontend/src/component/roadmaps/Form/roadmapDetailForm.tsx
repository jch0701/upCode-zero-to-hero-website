import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X } from 'lucide-react';
import FormBar from "../formBox";
import { validateDescription, validateTitle } from "../validateFormBox";
import { defaultImageSrc, bin, IMAGE_KEYWORD_MAP} from "../image";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";
import { addRoadmap, editRoadmap, deleteRoadmapAndCascade } from "@/store/roadmapSlice";
import { update_Activity } from "@/component/activity/activity_tracker";

interface RoadmapDetailFormProps{
    mode: "add" | "edit";
    imageSrc?: string;
    title?: string;
    description?: string;
}

const RoadmapDetailForm: React.FC<RoadmapDetailFormProps> = ({
    mode, imageSrc, title, description}) => {
        const navigate = useNavigate();
        const dispatch = useDispatch<AppDispatch>();
        const userID = localStorage.getItem("userID");
        const {roadmapID} = useParams<{ roadmapID: string}>();
        const [queryTitle, setQueryTitle] = useState(mode === "edit" ? title ?? "" : "");
        const [queryDescription, setQueryDescription] = useState( mode === "edit" ? description ?? "" : "")
        const [currentImageSrc, setCurrentImageSrc] = useState(mode === "edit" ? (imageSrc ?? defaultImageSrc) : defaultImageSrc);
        const [errors, setErrors] = React.useState<string[]>([]);
        // Function to find the image URL based on the title keyword
        const getDynamicImageSrc = (inputTitle: string): string => {
            const lowerTitle = inputTitle.toLowerCase();
            // Check for keywords in the title
            for (const [keyword, image] of Object.entries(IMAGE_KEYWORD_MAP)) {
                // Check if the title includes any of the predefined keywords
                if (lowerTitle.includes(keyword)) {
                    return image;
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
            } 
            if (mode === 'add'){
                dispatch(
                    addRoadmap({
                        creatorID: Number(userID),
                        imageSrc:currentImageSrc,
                        title: queryTitle,
                        description: queryDescription,
                        isFavourite: false,
                    })
                )
                 update_Activity((activity) => {
                    activity.roadmap_created = (activity.roadmap_created || 0) + 1;
                }, { type: "roadmap_created", id: queryTitle });
            }
            if (mode === 'edit'){
                dispatch(
                    editRoadmap({
                        roadmapID: Number(roadmapID),
                        roadmapSlug: "",
                        creatorID: Number(userID),
                        imageSrc:currentImageSrc,
                        title: queryTitle,
                        description: queryDescription,
                        createdDate: "",
                        modifiedDate: "",
                        isFavourite: false,
                    })
                )
            }
            navigate(-1);
        }

        const handleDelete = () => {
            if (roadmapID) {
            dispatch(deleteRoadmapAndCascade(Number(roadmapID)));
            update_Activity((activity) => {
            activity.roadmap_deleted = (activity.roadmap_deleted || 0) + 1;
        }, { type: "roadmap_deleted", id: queryTitle });
        }
        navigate(-2);
        };
        

        return (
                <div className=" max-w-5xl mx-auto text-white">
                    <div className={`w-full flex items-center ${mode === "edit" ? "justify-between" : "justify-end"}`}>
                        {/* Top Left Icon */}
                        {mode==="edit" && (
                        <div className="h-7 w-7">
                            <img
                                src={bin}
                                alt="delete-button"
                                className="w-full h-full object-cover" 
                                onClick={handleDelete}
                                onError={(e) => {
                                    e.currentTarget.src = defaultImageSrc; 
                                }}
                            />
                        </div>)}
                        {/* Top Right Icon */}
                        <button
                            className="text-white hover:text-gray-400 p-1"
                            aria-label={ mode === "add" ? "Cancel" : "Close Featured Roadmap" }
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
                                        e.currentTarget.src = defaultImageSrc; 
                                    }}
                                />
                            </div>
                            <button 
                                className="w-full bg-gray-500/80 hover:bg-gray-500 rounded-lg font-semibold transition shadow-xl"
                                onClick={handleSubmit}
                            >
                                { mode === "add" ? "Add Roadmap" : "Apply Change" }
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

export default RoadmapDetailForm;