import React, { useState } from "react";
import RoadmapSidebar from "@/component/roadmaps/sidebar";
import SectionBlock from "@/component/roadmaps/sectionBlock";
import SearchBar from "@/component/searchBar";
import CareerItemList from "@/component/roadmaps/Selector/careerList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/component/shadcn/button";
import type { RootState } from "@/store";
import { careerCategories } from "./CareerCategories";

type Section = {
  id: string;
  title: string;
  tag?: string;
};

const careerSections: Section[] = [
  { id: "whats-new", title: "What's New" },
  { id: "recently-viewed", title: "Recently Viewed" },
  ...careerCategories,
  { id: "your-applications", title: "Your Applications" },
];

export const Career: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Active user from localStorage
  const activeUser = JSON.parse(localStorage.getItem("activeUser") || "{}");
  const userRole = activeUser?.role; // "Student" | "Mentor" | "Company"

  const careerData = useSelector(
    (state: RootState) => state.career?.careerList || []
  );
  const applicationsData = useSelector(
    (state: RootState) => state.application?.applicationList || []
  );
  const interactionsData = useSelector(
    (state: RootState) => state.interaction?.interactionList || []
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
    if (section.id === "whats-new")
      return filteredCareerData.filter((item: any) => item.isNew);
    if (section.id === "recently-viewed")
      return getRecentlyViewedCareers(filteredCareerData);
    if (section.id === "your-applications")
      return filteredCareerData.filter((item: any) => item.isUserApplication);
    return filteredCareerData.filter(
      (item: any) => item.category === section.title
    );
  };

  const availableSections = careerSections.filter((section) => {
    if (
      ["recently-viewed", "your-applications"].includes(section.id) &&
      userRole === "Company"
    ) {
      return false; // hide for company users
    }
    if (["cybersecurity", "your-applications"].includes(section.id))
      return true;
    const items = getItemsForSection(section);
    return items.length > 0;
  });

  const visibleSidebarItems = availableSections.map((s) => ({
    name: s.title,
    id: s.id,
  }));

  // Company users only see their own careers (ownership by postedBy = username)
  const visibleCareers =
    userRole === "Company"
      ? careerData.filter((c: any) => c.postedBy === activeUser.username)
      : careerData;

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed">
        <RoadmapSidebar visibleSections={visibleSidebarItems} />
      </div>

      {/* Main content */}
      <div className="flex-1 pl-80 pr-5">
        <div className="pt-6 p-6 bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">
              Career Opportunities
            </h1>

            {userRole === "Company" && (
              <Button
                onClick={() => navigate("/career/addCareer")}
                className="bg-green-600 text-white hover:bg-green-500 transition"
              >
                + Add Career
              </Button>
            )}
          </div>

          <SearchBar
            query={query}
            setQuery={setQuery}
            placeholder="Search career paths, roles, or applications..."
          />

          {userRole === "Company" ? (
            // Company layout: only their own careers
            <CareerItemList items={visibleCareers} />
          ) : (
            // Student/Mentor layout: sectioned view
            availableSections.map((section) => {
              const items = getItemsForSection(section);
              if (items.length === 0) return null;
              return (
                <SectionBlock
                  key={section.id}
                  id={section.id}
                  title={section.title}
                >
                  <CareerItemList items={items} filterTag={section.title} />
                </SectionBlock>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
