import React, { useState } from 'react';
// Accept visibleSections from parent (Roadmap page)
type SidebarItem = { name: string; id: string };
type Props = {
    visibleSections: SidebarItem[]; // only show these items
};

const RoadmapSidebar: React.FC<Props> = ({ visibleSections }) => {
    const [activeId, setActiveId] = useState(visibleSections.length > 0 ? visibleSections[0].id : "");

    const handleScrollTo = (id: string) => {
        // Find the element on the page with the matching ID
        const element = document.getElementById(id);

        if (element) {
            // Update the active state immediately on click
            setActiveId(id);

            // Scroll smoothly to the element's position
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start', // Scroll until the top of the element is visible at the top of the viewport
            });
        }
    };

    return (
        <div className="w-64 p-4 text-white min-h-screen bg-cover bg-center">
            <div className="relative h-full flex flex-col justify-start">
                <div className="flex flex-col pt-10">
                    {visibleSections.map((item) => (
                        <a 
                            key={item.id}
                            href={`#${item.id}`} // Standard anchor link for fallback/accessibility
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default hash navigation
                                handleScrollTo(item.id);
                            }}
                            className={`
                                py-2 px-4 rounded-md transition duration-200 
                                text-base font-medium cursor-pointer
                                text-right
                                ${activeId === item.id
                                    ? 'bg-opacity-50 border-t border-b border-white border-opacity-50 shadow-lg' // Active look
                                    : 'hover:bg-gray-600 hover:bg-opacity-60' // Hover effect
                                }
                            `}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                {/* Vertical white line on the right */}
                <div className="absolute right-0 top-0 h-[100vh] w-0.5 bg-white opacity-80"></div>
            </div>
        </div>
    );
};

export default RoadmapSidebar;