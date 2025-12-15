import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X } from 'lucide-react';
import FormBar from "../../formBox";
import { difficultyOptions, roadmapCategoryOptions } from "@/lib/types";
import { validateTitle, validateOrder, validateDifficulty, validateCategory, validatePrerequisite } from "../../validateFormBox";
import { defaultImageSrc, bin } from "../../../lib/image";
import { useDispatch, useSelector } from "react-redux";
import { addChapter, editChapter, deleteChapter , type PillarType} from "@/store/pillarsSlice";
import { updateRoadmapDate } from "@/store/roadmapSlice";
import { deleteLink, type LinkType } from "@/store/linksSlice";

interface ChapterDetailFormProps{
    mode: "add" | "edit";
    selectedChapterID?: number;
}

const ChapterDetailForm: React.FC<ChapterDetailFormProps> = ({
    mode, selectedChapterID}) => {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const pillarData = useSelector((state: any) => state.chapter.pillarList) as PillarType[];
        const linkData = useSelector((state: any) => state.link.linkList) as LinkType[];
        const chapterItem = pillarData.find(p => p.chapterID === selectedChapterID);
        if (!chapterItem && mode==="edit" ) return <p className="text-white text-center mt-10">Chapter not found</p>;
        const {roadmapID} = useParams<{ roadmapID: string}>();
        const [queryTitle, setQueryTitle] = useState(mode === "edit" ? chapterItem!.title ?? "" : "");
        const [queryDescription, setQueryDescription] = useState(mode === "edit" ? chapterItem!.description ?? "" : "")
        const [queryDifficulty, setQueryDifficulty] = useState(mode === "edit" ? chapterItem!.difficulty?.toLowerCase() ?? "" : "")
        const [queryOrder, setQueryOrder] = useState(mode === "edit" && chapterItem!.order !== undefined ? String(chapterItem!.order) : "");
        const [queryCategory, setQueryCategory] = useState(mode === "edit" ? chapterItem!.category ?? "" : "")
        const [queryPrerequisite, setQueryPrerequisite] = useState(mode === "edit" ? chapterItem!.prerequisite ?? "" : "")
        const [errors, setErrors] = React.useState<string[]>([]);
        const filterLinksData = linkData.filter(data => data.chapterID === selectedChapterID);
        const uniqueLinkIDs = [...new Set(filterLinksData.map(data => data.nodeID))];

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            // validate title
            const titleErrors = validateTitle(queryTitle)
            const difficultyErrors = validateDifficulty(queryDifficulty)
            const orderErrors = validateOrder(Number(queryOrder))
            const categoryErrors = validateCategory(queryCategory)
            const prerequisiteErrors = validatePrerequisite(queryPrerequisite)
            const errormsg = [...titleErrors, ...difficultyErrors, ...orderErrors, ...categoryErrors, ...prerequisiteErrors]
            setErrors(errormsg);
            if (errormsg.length > 0) {
                return;
            } 
            if (mode === 'add'){
                dispatch(
                    addChapter({
                        roadmapID: Number(roadmapID),
                        title: queryTitle,
                        description: queryDescription,
                        difficulty: queryDifficulty.charAt(0).toUpperCase() + queryDifficulty.slice(1).toLowerCase(),
                        category: queryCategory,
                        prerequisite: queryPrerequisite,
                        order: Number(queryOrder)
                    })
                )
            }
            if (mode === 'edit'){
                dispatch(
                    editChapter({
                        chapterID: Number(selectedChapterID),
                        chapterSlug: "",
                        roadmapID: Number(roadmapID),
                        title: queryTitle,
                        description: queryDescription,
                        difficulty: queryDifficulty.charAt(0).toUpperCase() + queryDifficulty.slice(1).toLowerCase(),
                        category: queryCategory,
                        prerequisite: queryPrerequisite,
                        order: Number(queryOrder),
                        isViewed:false,
                        modifiedDate: ""
                    })
                )
            }
            dispatch(
                updateRoadmapDate(Number(roadmapID))
            )
            navigate(-1)
        }

        const handleDelete = () => {
        if (selectedChapterID) {
            for (const l of uniqueLinkIDs) {
                dispatch(deleteLink(l));
                console.log("Delete link:", l);
            }
            dispatch(deleteChapter(selectedChapterID));
            console.log("Delete chapter:", selectedChapterID);
        }
        navigate(-2);
        dispatch(
            updateRoadmapDate(Number(roadmapID))
        )
        };

        return(

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
                        aria-label={ mode === "add" ? "Cancel" : "Close Featured Chapter" }
                        onClick={() => navigate(-1)}
                        >
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left Section: Order, Difficulty, Category, Prerequisite Info */}
                    <div className="w-full md:w-[55%] md:order-none">
                        {/* Order Section */}
                        <h3 className="text-xl font-bold mb-2 text-left">Order</h3>
                        <FormBar query={queryOrder} setQuery={setQueryOrder} placeholder="Enter order (integer)" />
                        <p className="min-h-3 text-left text-[#f60101] text-[12px]" >
                            {errors.find((e) => e.startsWith("- Order"))}
                        </p>
                        {/* Difficulty Section */}
                        <h3 className="text-xl font-bold mb-2 text-left">Difficulty</h3>
                        <FormBar query={queryDifficulty} setQuery={setQueryDifficulty} placeholder="Select difficulties" isOption={true} options={difficultyOptions}/>
                        <p className="min-h-3 text-left text-[#f60101] text-[12px]" >
                            {errors.find((e) => e.startsWith("- Difficulty"))}
                        </p>
                        {/* Category Section */}
                        <h3 className="text-xl font-bold mb-2 text-left">Category</h3>
                        <FormBar query={queryCategory} setQuery={setQueryCategory} placeholder="Select category" isOption={true} options={roadmapCategoryOptions}/>
                        <p className="min-h-3 text-left text-[#f60101] text-[12px]" >
                            {errors.find((e) => e.startsWith("- Category"))}
                        </p>
                        {/* Prerequisite Session*/}
                        <h3 className="text-xl font-bold mb-2 text-left">Prerequisite</h3>
                        <FormBar query={queryPrerequisite} setQuery={setQueryPrerequisite} placeholder="Enter prerequisite" />
                        <p className="min-h-3 text-left text-[#f60101] text-[12px]" >
                            {errors.find((e) => e.startsWith("- Prerequisite"))}
                        </p>
                        <button 
                            className="w-full mt-5 bg-gray-500/80 hover:bg-gray-500 rounded-lg font-semibold transition shadow-xl lg:hidden"
                            onClick={handleSubmit}
                        >
                            { mode === "add" ? "Add Chapter" : "Apply Change" }
                        </button>
                    </div>
                    {/* Right Section: Tags */}
                    <div className="w-full md:w-[45%] order-first md:order-none">
                        {/* Title Section */}
                        <h3 className="text-xl font-bold mb-2 text-left">Chapter Title</h3>
                        <FormBar query={queryTitle} setQuery={setQueryTitle} placeholder="Enter a title" />
                        <p className="min-h-3 text-left text-[#f60101] text-[12px]" >
                            {errors.find((e) => e.startsWith("- Title"))}
                        </p>
                        {/* Description Section */}
                        <h3 className="text-xl font-bold mb-2 text-left">Description</h3>
                        <FormBar query={queryDescription} setQuery={setQueryDescription} isDescription={true} />
                        <div className="hidden sm:block">
                            <br></br>
                            <button 
                                className="w-full bg-gray-500/80 hover:bg-gray-500 rounded-lg font-semibold transition shadow-xl"
                                onClick={handleSubmit}
                            >
                                { mode === "add" ? "Add Chapter" : "Apply Change" }
                            </button>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        );
    }

export default ChapterDetailForm;