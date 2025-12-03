import React from "react";
import RoadmapSidebar from "../component/roadmaps/roadmapSidebar";
import RoadmapItemList from "../component/roadmaps/roadmapList";
import SectionBlock from "../component/roadmaps/sectionBlock";
import SearchBar from "../component/searchBar";
import { useState } from "react";
import { roadmapData } from "../dummy";

type Section = {
  id: string;
  title: string;
  tag?: string; // undefined means "no tag filter" (e.g. What's New)
};

const sections: Section[] = [
  { id: "whats-new", title: "What's New" },
  { id: "recently-viewed", title: "Recently Viewed" },
  { id: "java", title: "Java", tag: "Java" },
  { id: "python", title: "Python", tag: "Python" },
  { id: "machine-learning", title: "Machine Learning", tag: "Machine Learning" },
  { id: "devops", title: "DevOps", tag: "DevOps" },
  { id: "frontend", title: "Frontend", tag: "Frontend" },
  { id: "backend", title: "Backend", tag: "Backend" },
  { id: "react", title: "React", tag: "React" },
  { id: "api", title: "API", tag: "API" },
  { id: "your-design", title: "Your Design" },
];

export const Roadmap: React.FC = () => {
  const [query, setQuery] = useState("");

  const availableSections = sections.filter((section) => {
    if (!section.tag) return true; // show "What's New" / "Recently Viewed" even if tag undefined
    // show section only if there is at least one roadmap item with matching tag label
    return roadmapData.some((item) => {
      const matchesTag = item.tags.some((t: any) => t.label === section.tag);
      const matchesQuery =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some((t: any) => t.label.toLowerCase().includes(query.toLowerCase()));
      return matchesTag && matchesQuery;
    });
  });

  const visibleSidebarItems = availableSections.map((s) => ({
    name: s.title,
    id: s.id,
  }));

  const filteredRoadmapData = roadmapData.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.tags.some((t: any) => t.label.toLowerCase().includes(q))
    );
  });

  return (
    <div>
      <div className="fixed">
        <RoadmapSidebar visibleSections={visibleSidebarItems} />
      </div>
      <div className="pl-78 p-10 grow h-screen">
        <SearchBar query={query} setQuery={setQuery} placeholder="Enter a roadmap title / category to see what other people saying about" />
        {availableSections.map((section) => (
          <SectionBlock key={section.id} id={section.id} title={section.title}>
            <RoadmapItemList items={filteredRoadmapData} filterTag={section.tag} />
          </SectionBlock>
        ))}
      </div>
    </div>
  );
};