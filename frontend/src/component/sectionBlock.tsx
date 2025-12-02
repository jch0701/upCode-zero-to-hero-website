import React from "react";
import type { ReactNode } from "react";

interface SectionBlockProps {
    id: string;
    title: string;
    children?: ReactNode;
}

const SectionBlock: React.FC<SectionBlockProps> = ({ id, title, children }) => {
    // Use normal JS if-statement before return
    if (id === "your-design") {
        return (
            <section id={id} className="pt-20">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-white text-left">{title}</h2>

                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition">
                        Create New
                    </button>
                </div>

                {children}
            </section>
        );
    }

    // Default section
    return (
        <section id={id} className="pt-20">
            <h2 className="text-2xl font-semibold text-white text-left">{title}</h2>
            {children}
        </section>
    );
};

export default SectionBlock;