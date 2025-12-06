import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from 'lucide-react';
import FormBar from "./formBox";
import { validateTitle, validateOrder, validateLink } from "@/component/roadmaps/validateFormBox";
import { defaultImageSrc, bin } from "./image";

interface LinkDetailFormProps{
    mode: "add" | "edit";
    title?: string;
    order?: number;
    link?: string;
}

const LinkDetailForm: React.FC<LinkDetailFormProps> = ({
    mode, title, order, link}) => {
        const navigate = useNavigate();
        const [queryTitle, setQueryTitle] = useState(mode === "edit" ? title ?? "" : "");
        const [queryOrder, setQueryOrder] = useState(mode === "edit" && order !== undefined ? String(order) : "");
        const [queryLink, setQueryLink] = useState(mode === "edit" ? link ?? "" : "");
        const [errors, setErrors] = React.useState<string[]>([]);
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault()
            // validate title
            const titleErrors = validateTitle(queryTitle)
            const orderErrors = validateOrder(Number(queryOrder))
            const linkErrors = validateLink(queryLink)
            const errormsg = [...titleErrors, ...orderErrors, ...linkErrors]
            setErrors(errormsg);
            if (errormsg.length > 0) {
                return;
            } 
            else {
                navigate(-1)
            }
        }
    
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
                        onClick={() => navigate(-1)}
                        onError={(e) => {
                            e.currentTarget.src = defaultImageSrc; 
                        }}
                    />
                </div>)}
                {/* Top Right Icon */}
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
                <div className="w-full">
                    {/* Title Section */}
                    <h3 className="text-xl font-bold mb-2 text-left">Link Title</h3>
                    <FormBar query={queryTitle} setQuery={setQueryTitle} placeholder="Enter a title" />
                    <p className="min-h-3 text-left text-[#f60101] text-[12px]" >
                        {errors.find((e) => e.startsWith("- Title"))}
                    </p>
                    {/* Order Section */}
                    <h3 className="text-xl font-bold mb-2 text-left">Order</h3>
                    <FormBar query={queryOrder} setQuery={setQueryOrder} placeholder="Enter order (integer)" />
                    <p className="min-h-3 text-left text-[#f60101] text-[12px]" >
                        {errors.find((e) => e.startsWith("- Order"))}
                    </p>
                    {/* Link Section */}
                    <h3 className="text-xl font-bold mb-2 text-left">Link</h3>
                    <FormBar query={queryLink} setQuery={setQueryLink} placeholder="Enter link" />
                    <p className="min-h-3 text-left text-[#f60101] text-[12px]" >
                        {errors.find((e) => e.startsWith("- Link"))}
                    </p>
                    <br></br>
                    <button 
                        className="w-full bg-gray-500/80 hover:bg-gray-500 rounded-lg font-semibold transition shadow-xl"
                        onClick={handleSubmit}
                    >
                        { mode === "add" ? "Add Link" : "Apply Change" }
                    </button>
                </div>
            </div>
            </form>
        </div>
    )
}

export default LinkDetailForm


