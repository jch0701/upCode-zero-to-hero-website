import React , { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X } from 'lucide-react';
import FormBar from "@/component/roadmaps/formBox";
import { linksData } from "@/dummy";
import { validateTitle, validateOrder, validateLink } from "@/component/roadmaps/validateFormBox";

export const RoadmapChapterNode: React.FC = () => {
    const navigate = useNavigate();
    const { nodeID } = useParams<{ nodeID: string }>();
    const nodeItem = linksData.find(r => r.nodeID === Number(nodeID));
    if (!nodeItem) return <p className="text-white text-center mt-10">Link not found</p>;
    const [queryTitle, setQueryTitle] = useState(nodeItem.title);
    const [queryOrder, setQueryOrder] = useState(String(nodeItem.order));
    const [queryLink, setQueryLink] = useState (nodeItem.link);
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
        } else {
            navigate(-1)
        }
    }
    
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-gray-700/70 w-full max-w-2xl rounded-xl shadow-2xl p-6">
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
                                Apply Change
                            </button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    );
};