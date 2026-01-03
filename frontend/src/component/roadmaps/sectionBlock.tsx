import React from "react";
import type { ReactNode } from "react";
import { Link } from 'react-router-dom';

interface SectionBlockProps {
    id: string;
    title: string;
    extraClass?: string;
    children?: ReactNode;
}

const SectionBlock: React.FC<SectionBlockProps> = ({ id, title, extraClass, children}) => {
    return (
        <section id={id} className={`scroll-mt-24 ${extraClass || ''}`}>
            <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-white text-left">{title}</h2>
                    {id === "your-design" && (
                        <Link to ={"/roadmap/add-roadmap"}>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition">
                                Create New
                            </button>
                        </Link>
                    )}
                </div>
            {children}
            
            {/* Partially visible horizontal line - Made sharper and more visible */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-gray-400/50 to-transparent my-10 w-full rounded-full" />
        </section>
    );
};

export default SectionBlock;