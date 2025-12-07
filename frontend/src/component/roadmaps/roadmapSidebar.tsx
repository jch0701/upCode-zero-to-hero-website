import React, { useState, useEffect } from 'react';
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

    // Update activeId based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            for (const section of visibleSections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Adjust threshold (100) as needed
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveId(section.id);

                        // Scroll the sidebar item into view if it is outside the viewport
                        const sidebarItem = document.getElementById(`sidebar-${section.id}`);
                        if (sidebarItem) {
                            sidebarItem.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [visibleSections]);

    return (
        <nav className="w-64 text-white fixed overflow-y-auto top-16 bottom-0 pb-20 border-r-2" role="navigation">
            <div className="flex flex-col border-white">
                {visibleSections.map((item) => (
                    <a 
                        key={item.id}
                        id={`sidebar-${item.id}`}
                        href={`#${item.id}`} // Standard anchor link for fallback/accessibility
                        onClick={(e) => {
                            e.preventDefault(); // Prevent default hash navigation
                            handleScrollTo(item.id);
                        }}
                        className={`
                            p-2 w-full text-right mb-2 cursor-pointer transition-colors
                            ${activeId === item.id
                                ? 'bg-white/80 text-black font-semibold' // Active look
                                : 'text-white hover:bg-white/10' // Hover effect
                            }`}
                        aria-current={activeId === item.id ? 'page' : undefined}
                    >
                        {item.name}
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default RoadmapSidebar;