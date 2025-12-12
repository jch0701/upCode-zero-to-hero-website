import React, { useState } from "react";
import RoadmapSidebar from "../../component/roadmaps/sidebar";
import RoadmapItemList from "../../component/roadmaps/Selector/roadmapList";
import SectionBlock from "../../component/roadmaps/sectionBlock";
import SearchBar from "../../component/searchBar";
import { generateTags } from "../../component/roadmaps/groupTag";
import { useSelector } from "react-redux";

export type Section = {
  id: string;
  title: string;
  tag?: string; // undefined means "no tag filter" (e.g. What's New)
};

const sections: Section[] = [
  { id: "whats-new", title: "What's New" },
  { id: "recently-viewed", title: "Recently Viewed" },
  { id: "javascript", title: "JavaScript", tag: "JavaScript"},
  { id: "c++", title: "C++", tag: "C++"},
  { id: "java", title: "Java", tag: "Java" },
  { id: "python", title: "Python", tag: "Python" },
  { id: "machine-learning", title: "Machine Learning", tag: "Machine Learning" },
  { id: "devops", title: "DevOps", tag: "DevOps" },
  { id: "frontend", title: "Frontend", tag: "Frontend" },
  { id: "backend", title: "Backend", tag: "Backend" },
  { id: "react", title: "React", tag: "React" },
  { id: "api", title: "API", tag: "API" },
  { id: "angular", title: "Angular", tag: "Angular" },
  { id: "sql", title: "SQL", tag: "SQL" },
  { id: "typescript", title: "TypeScript", tag: "TypeScript" },
  { id: "your-design", title: "Your Design" },
];

export const Roadmap: React.FC = () => {
  const [query, setQuery] = useState("");
  const userID = localStorage.getItem("userID");
  const isLoggedIn = userID && userID !== "0";

  const roadmapData = useSelector((state: any) => state.roadmap.roadmapList);
  const pillarsData = useSelector((state: any) => state.chapter.pillarList);
  const linksData = useSelector((state: any) => state.link.linkList);

  const getRecentlyViewedRoadmaps = (sourceData: any[]) => {
    return sourceData.filter((roadmap: any) => {const roadmapID = Number(roadmap.roadmapID);

      // Get all chapters under the roadmap
      const chapters = pillarsData.filter(
        (chapter: any) => Number(chapter.roadmapID) === roadmapID
      );

      // Check if any chapter is viewed
      const chapterViewed = chapters.some((chapter: any) => chapter.isViewed === true);
      if (chapterViewed) return true;

      // If no chapter viewed → check if any link is viewed
      const chapterIds = new Set(chapters.map((c: any) => c.chapterID));
      const linkViewed = linksData.some((link: any) => chapterIds.has(link.chapterID) && link.isViewed === true);
      return linkViewed;
    });
  };

  const filteredRoadmapData = roadmapData.filter((item: any) => {
    const q = query.toLowerCase();
    const effectiveTags = (item.tags && item.tags.length) ? item.tags : generateTags(item.roadmapID, pillarsData);
    return (
      item.title.toLowerCase().includes(q) ||
      effectiveTags.some((t: any) => t.label.toLowerCase().includes(q))
    );
  });

  const getItemsForSection = (section: Section) => {
    // User own designs
    if (section.id === "your-design" && isLoggedIn && userID) {
      return filteredRoadmapData.filter(
        (item: any) => item.creatorID === Number(userID)
      );
    }

    // New content that is not created by the user
    if (section.id === "whats-new" && isLoggedIn && userID) {
      return filteredRoadmapData.filter(
        (item: any) => item.creatorID !== Number(userID)
      );
    }

    // Recently viewed roadmaps
    if (section.id === "recently-viewed" && isLoggedIn) {
      return getRecentlyViewedRoadmaps(filteredRoadmapData);
    }

    // Tag-based sections
    if (section.tag) {
      return filteredRoadmapData.filter((item: any) => {
        const effectiveTags =
          item.tags?.length > 0
            ? item.tags
            : generateTags(item.roadmapID, pillarsData);

        return effectiveTags.some((t: any) => t.label === section.tag);
      });
    }

    // Default → show all filtered data
    return filteredRoadmapData;
  };

  const availableSections = sections.filter((section) => {
    // Hide certain sections for guest users
    if (!isLoggedIn && ["recently-viewed", "your-design"].includes(section.id)) {
      return false;
    }

    const items = getItemsForSection(section);

    // For dynamic sections like "What's New" & "Recently Viewed"
    if (!section.tag) {
      if (["whats-new", "recently-viewed"].includes(section.id)) {
        return items.length > 0;
      }
      return true;
    }

    return items.length > 0;
  });


  const visibleSidebarItems = availableSections.map((s) => ({
    name: s.title,
    id: s.id,
  }));

  return (
    <div className="flex">
      <div className="fixed hidden md:block">
        <RoadmapSidebar visibleSections={visibleSidebarItems} />
      </div>
      <div className="flex-1 min-w-0 pl-5 pr-5 md:pl-72">
        <SearchBar query={query} setQuery={setQuery} placeholder="Enter a roadmap title / category to see what other people saying about" />
        {availableSections.map((section) => {
          const items = getItemsForSection(section);

          if (items.length === 0 && section.id !== "your-design") return null;

          return (
            <SectionBlock key={section.id} id={section.id} title={section.title} extraClass="pt-18 w-full">
              <RoadmapItemList items={items} filterTag={section.tag} />
            </SectionBlock>
          );
        })}
      </div>
    </div>
  );
};