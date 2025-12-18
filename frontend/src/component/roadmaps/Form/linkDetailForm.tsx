import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X } from 'lucide-react';
import FormBar from "../../formBox";
import { validateTitle, validateOrder, validateLink } from "@/component/validateFormBox";
import { defaultImageSrc, bin } from "../../../lib/image";
import { useCreateLink, useDeleteLink, useGetSingleLink, useUpdateLink } from "@/api/roadmaps/linkAPI";

interface LinkDetailFormProps{
    mode: "add" | "edit";
    selectedLinkID?: number;
}

const LinkDetailForm: React.FC<LinkDetailFormProps> = ({
    mode, selectedLinkID}) => {
        const navigate = useNavigate();
        const userID = localStorage.getItem("userID");
        const { chapterID } = useParams<{ chapterID: string}>();

        const { data: linkItem, isLoading, isError} = useGetSingleLink(Number(chapterID), Number(selectedLinkID), userID);

        if ( isLoading ) return <div className="w-72 h-64 bg-gray-800 animate-pulse rounded-lg" />;
        if ( isError || !linkItem && mode==="edit" ) return <p className="text-white text-center mt-10">Link not found</p>;
        
        const createLinkMutation = useCreateLink(Number(chapterID));
        const updateLinkMutation = useUpdateLink(Number(chapterID), Number(selectedLinkID))
        const deleteLinkMutation = useDeleteLink();

        const [queryTitle, setQueryTitle] = useState(mode === "edit" ? linkItem!.title ?? "" : "");
        const [queryOrder, setQueryOrder] = useState(mode === "edit" && linkItem!.order !== undefined ? String(linkItem!.order) : "");
        const [queryLink, setQueryLink] = useState(mode === "edit" ? linkItem!.link ?? "" : "");
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
            if (mode === "add"){
                createLinkMutation.mutate({
                    title: queryTitle,
                    order: Number(queryOrder),
                    link: queryLink,
                })
            }
            if (mode === "edit"){
                updateLinkMutation.mutate({
                    title: queryTitle,
                    order: Number(queryOrder),
                    link: queryLink,
                })
            }
            navigate(-1);
        }

        const handleDelete = () => {
            if (selectedLinkID) {
                deleteLinkMutation.mutate(Number(selectedLinkID));
            }
            navigate(-1);
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