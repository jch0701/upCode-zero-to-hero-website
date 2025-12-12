import React, { useState } from "react";
import RoadmapSidebar from "@/component/roadmaps/sidebar";
import SectionBlock from "@/component/roadmaps/sectionBlock";
import SearchBar from "@/component/searchBar";
import CareerItemList from "@/component/career/Selector/careerList";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // ✅ for navigation
import { Button } from "@/component/shadcn/button"; // ✅ styled button

type Section = {
  id: string;
  title: string;
  tag?: string; // undefined means "no tag filter"
};

const careerSections: Section[] = [
  { id: "whats-new", title: "What's New" },
  { id: "recently-viewed", title: "Recently Viewed" },
  { id: "software-engineer", title: "Software Engineer" },
  { id: "data-scientist", title: "Data Scientist" },
  { id: "ai-analytics", title: "AI Analytics" },
  { id: "software-developer", title: "Software Developer" },
  { id: "rnd", title: "R&D" },
  { id: "cybersecurity", title: "Cybersecurity" },
  { id: "official", title: "Official" },
  { id: "your-applications", title: "Your Applications" },
];

export const Career: React.FC = () => {
  const [query, setQuery] = useState("");
  const userID = localStorage.getItem("userID");
  const isLoggedIn = userID && userID !== "0";

  const careerData = useSelector(
    (state: any) => state.career?.careerList || []
  );
  const applicationsData = useSelector(
    (state: any) => state.application?.applicationList || []
  );
  const interactionsData = useSelector(
    (state: any) => state.interaction?.interactionList || []
  );

  const getRecentlyViewedCareers = (sourceData: any[]) => {
    return sourceData.filter((career: any) => {
      const careerID = Number(career.id);
      if (career.isViewed) return true;
      const apps = applicationsData.filter(
        (app: any) => Number(app.careerID) === careerID
      );
      if (apps.some((app: any) => app.isViewed)) return true;
      const appIds = new Set(apps.map((a: any) => a.id));
      const interactionViewed = interactionsData.some(
        (interaction: any) =>
          appIds.has(interaction.applicationID) && interaction.isViewed === true
      );
      return interactionViewed;
    });
  };

  const filteredCareerData = careerData.filter((item: any) => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q)
    );
  });

  const getItemsForSection = (section: Section) => {
    if (section.id === "whats-new") {
      return filteredCareerData.filter((item: any) => item.isNew);
    }
    if (section.id === "recently-viewed" && isLoggedIn) {
      return getRecentlyViewedCareers(filteredCareerData);
    }
    if (section.id === "your-applications" && isLoggedIn) {
      return filteredCareerData.filter((item: any) => item.isUserApplication);
    }
    return filteredCareerData.filter(
      (item: any) => item.category === section.title
    );
  };

  const availableSections = careerSections.filter((section) => {
    if (
      !isLoggedIn &&
      ["recently-viewed", "your-applications"].includes(section.id)
    ) {
      return false;
    }
    // Always show these sections, even if empty
    if (["cybersecurity", "your-applications"].includes(section.id)) {
      return true;
    }
    const items = getItemsForSection(section);
    return items.length > 0;
  });

  const visibleSidebarItems = availableSections.map((s) => ({
    name: s.title,
    id: s.id,
  }));

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed">
        <RoadmapSidebar visibleSections={visibleSidebarItems} />
      </div>

      {/* Main content */}
      <div className="flex-1 pl-80 pr-5">
        <div className="pt-6 p-6 bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">Career Page</h1>
          <SearchBar
            query={query}
            setQuery={setQuery}
            placeholder="Search career paths, roles, or applications..."
          />

          {/* Add Career button beneath search bar */}
          <div className="flex justify-end mt-4">
            <Link to="/career/addCareer">
              <Button className="bg-green-600 text-white hover:bg-green-500 transition">
                + Add Career
              </Button>
            </Link>
          </div>

          {availableSections.map((section) => {
            const items = getItemsForSection(section);
            if (items.length === 0) return null;

            return (
              <SectionBlock
                key={section.id}
                id={section.id}
                title={section.title}
              >
                <CareerItemList items={items} filterTag={section.title} />

                {/* Circular Add Career card at the end */}
                <div className="flex justify-center mt-6">
                  <Link
                    to="/career/addCareer"
                    className="flex items-center justify-center bg-gray-800 border border-gray-700 rounded-full shadow-xl hover:scale-105 transform transition duration-300 cursor-pointer h-32 w-32"
                  >
                    <span className="text-4xl font-bold text-white">+</span>
                  </Link>
                </div>
              </SectionBlock>
            );
          })}
        </div>
      </div>
    </div>
  );
};
