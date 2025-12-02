import React from "react";
import Navbar from "../component/navbar";
import RoadmapSidebar from "../component/roadmapSidebar";
import type {RoadmapItemCardProps } from "../component/cardDetail";
import javaImage from "../assets/image/java_intro.jpg";
import pythonImage from "../assets/image/python_intro.jpg";
import RoadmapItemList from "../component/itemList";
import SectionBlock from "../component/sectionBlock";

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

const roadmapData: RoadmapItemCardProps[] = [
  {
    imageSrc: javaImage,
    title: "Java Fundamentals",
    date: "2025-10-20",
    tags: [
      { type: "Difficulty", label: "Beginner" },
      { type: "Category", label: "Java" },
      { type: "Prerequisite", label: "None" },
    ],
  },
  {
    imageSrc: pythonImage,
    title: "Python Basics",
    date: "2025-11-05",
    tags: [
      { type: "Difficulty", label: "Intermediate" },
      { type: "Category", label: "Python" },
      { type: "Prerequisite", label: "Basic Programming" },
    ],
  },
  {
    imageSrc: pythonImage,
    title: "JavaScript Essentials",
    date: "2025-11-15",
    tags: [
      { type: "Difficulty", label: "Beginner" },
      { type: "Category", label: "JavaScript" },
      { type: "Prerequisite", label: "None" },
    ],
  },
  {
    imageSrc: pythonImage,
    title: "React for Beginners",
    date: "2025-11-25",
    tags: [
      { type: "Difficulty", label: "Intermediate" },
      { type: "Category", label: "React" },
      { type: "Prerequisite", label: "JavaScript Basics" },
    ],
  },
  {
    imageSrc: pythonImage,
    title: "Node.js Fundamentals",
    date: "2025-12-05",
    tags: [
      { type: "Difficulty", label: "Intermediate" },
      { type: "Category", label: "Node.js" },
      { type: "Prerequisite", label: "JavaScript Basics" },
    ],
  },
  {
    imageSrc: pythonImage,
    title: "SQL Basics",
    date: "2025-12-15",
    tags: [
      { type: "Difficulty", label: "Beginner" },
      { type: "Category", label: "Database" },
      { type: "Prerequisite", label: "None" },
    ],
  },
  {
    imageSrc: javaImage,
    title: "HTML & CSS Fundamentals",
    date: "2025-12-20",
    tags: [
      { type: "Difficulty", label: "Beginner" },
      { type: "Category", label: "Web Development" },
      { type: "Prerequisite", label: "None" },
    ],
  },
  {
    imageSrc: javaImage,
    title: "TypeScript Basics",
    date: "2026-01-05",
    tags: [
      { type: "Difficulty", label: "Intermediate" },
      { type: "Category", label: "TypeScript" },
      { type: "Prerequisite", label: "JavaScript Basics" },
    ],
  },
  {
    imageSrc: javaImage,
    title: "Angular Fundamentals",
    date: "2026-01-15",
    tags: [
      { type: "Difficulty", label: "Advanced" },
      { type: "Category", label: "Angular" },
      { type: "Prerequisite", label: "TypeScript Basics" },
    ],
  },
  {
    imageSrc: pythonImage,
    title: "Python Advanced Concepts",
    date: "2026-01-25",
    tags: [
      { type: "Difficulty", label: "Advanced" },
      { type: "Category", label: "Python" },
      { type: "Prerequisite", label: "Python Basics" },
    ],
  },
  {
    imageSrc: javaImage,
    title: "Java Advanced Topics",
    date: "2026-02-05",
    tags: [
      { type: "Difficulty", label: "Advanced" },
      { type: "Category", label: "Java" },
      { type: "Prerequisite", label: "Java Fundamentals" },
    ],
  },
  {
    imageSrc: javaImage,
    title: "React Advanced Patterns",
    date: "2026-02-15",
    tags: [
      { type: "Difficulty", label: "Advanced" },
      { type: "Category", label: "React" },
      { type: "Prerequisite", label: "React for Beginners" },
    ],
  },
];

export const Roadmap: React.FC = () => {

    const availableSections = sections.filter((section) => {
        if (!section.tag) return true; // show "What's New" / "Recently Viewed" even if tag undefined
        // show section only if there is at least one roadmap item with matching tag label
        return roadmapData.some((item) => item.tags.some((t) => t.label === section.tag));
    });

    const visibleSidebarItems = availableSections.map((s) => ({
        name: s.title,
        id: s.id,
    }));

    return (
        <div className="flex max-h-screen max-w-screen" 
        style={{ backgroundColor: '#1a202c'}}>
            <Navbar />
            <div className="fixed top-0 left-10 pt-5">
                <RoadmapSidebar visibleSections={visibleSidebarItems} />
            </div>
            <div className="pl-75 p-10 flex-grow overflow-y-auto h-screen"> 
                {availableSections.map((section) => (
                    <SectionBlock key={section.id} id={section.id} title={section.title}>
                        <RoadmapItemList items={roadmapData} filterTag={section.tag} />
                    </SectionBlock>
                ))}
            </div>
        </div>
    );
};