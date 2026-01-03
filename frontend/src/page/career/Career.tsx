import React, { useState, useEffect } from "react";
import RoadmapSidebar from "@/component/roadmaps/sidebar";
import SectionBlock from "@/component/roadmaps/sectionBlock";
import SearchBar from "@/component/searchBar";
import CareerItemList from "@/component/career/Selector/careerList";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/component/shadcn/button";
import type { RootState } from "@/store";
import { careerCategories } from "./CareerCategories";
import { fetchCareers } from "@/store/careerSlice"; 
import { fetchUserApplications } from "@/store/applicationSlice"; 

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
  const dispatch = useDispatch();

  // Active user from localStorage
  const activeUser = JSON.parse(localStorage.getItem("activeUser") || "{}");
  const userRole = activeUser?.role; // "Student" | "Mentor" | "Company"

  const careerData = useSelector(
    (state: RootState) => state.career?.careerList || []
  );
  const careerStatus = useSelector((state: RootState) => state.career.status);
  const careerError = useSelector((state: RootState) => state.career.error);

  const applicationsData = useSelector(
    (state: RootState) => state.application?.applicationList || []
  );
  const interactionsData = useSelector(
    (state: RootState) => state.interaction?.interactionList || []
  );

  // Fetch careers and applications on mount
  useEffect(() => {
    if (careerStatus === "idle") {
      dispatch(fetchCareers() as any);
    }
    if (activeUser?.userId) {
       dispatch(fetchUserApplications(activeUser.userId) as any);
    }
  }, [careerStatus, dispatch, activeUser?.userId]);

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

  // Role-based logic
  const isCompany = userRole?.toLowerCase() === "company";
  const isAdmin = userRole?.toLowerCase() === "admin";
  const canAddCareer = isCompany || isAdmin;

  // Company users only see their own careers, unless they are Admin
  const visibleCareers =
    isCompany && !isAdmin
      ? careerData.filter((c: any) => c.postedBy === activeUser.username)
      : careerData;

  // Unify filtering source: Use visibleCareers (which already handles Company/Admin logic)
  const filteredCareerData = visibleCareers.filter((item: any) => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q)
    );
  });

  const getItemsForSection = (section: Section) => {
    if (section.id === "whats-new") {
       return filteredCareerData.filter((item: any) => {
          if (item.isNew !== undefined) return item.isNew;
          if (item.createdDate) {
             const d = new Date(item.createdDate);
             const now = new Date();
             const diffTime = Math.abs(now.getTime() - d.getTime());
             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
             return diffDays <= 30;
          }
          return false;
       });
    }

    if (section.id === "recently-viewed")
      return getRecentlyViewedCareers(filteredCareerData);
    if (section.id === "your-applications") {
       if (!applicationsData || applicationsData.length === 0) return [];
       // Get all career IDs the user has applied to
       // Get all career IDs the user has applied to
       // Get all career IDs the user has applied to
       // Handle both career_id (DB) and careerId (potential prop), compare as Strings
       const appliedSet = new Set(
           applicationsData.map((app: any) => String(app.career_id || app.careerId))
       );
       
       return filteredCareerData.filter((item: any) => appliedSet.has(String(item.id)));
    }

    return filteredCareerData.filter(
      (item: any) => item.category === section.title
    );
  };

  // Handle loading/error states
  if (careerStatus === "loading") {
    return <p className="text-white">Loading careers...</p>;
  }
  if (careerStatus === "failed") {
    return <p className="text-red-500">Error: {careerError}</p>;
  }

  const availableSections = careerSections.filter((section) => {
    if (["recently-viewed", "your-applications"].includes(section.id) && userRole?.toLowerCase() === "company") {
       return false;
    }
    
    const items = getItemsForSection(section);
    
    // If user is searching, only show sections that contain matching items
    if (query.trim()) {
        return items.length > 0;
    }
    
    // Always show "Your Applications" for learners to confirm it exists
    if (section.id === "your-applications") return true;

    // Otherwise (Browsing mode), always show standard categories
    const isStandardCategory = careerCategories.some(c => c.id === section.id);
    if (isStandardCategory) return true;

    // For dynamic/special sections, check if items exist
    return items.length > 0;
  });

  const visibleSidebarItems = availableSections.map((s) => ({
    name: s.title,
    id: s.id,
  }));

  // Handle loading/error states
  if (careerStatus === "loading") {
    return <p className="text-white">Loading careers...</p>;
  }
  if (careerStatus === "failed") {
    return <p className="text-red-500">Error: {careerError}</p>;
  }

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

            {canAddCareer && (
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

          {availableSections.map((section) => {
              const items = getItemsForSection(section);
              return (
                <SectionBlock
                  key={section.id}
                  id={section.id}
                  title={section.title}
                >
                  {items.length > 0 ? (
                      <CareerItemList 
                        items={items} 
                        filterTag={["recently-viewed", "your-applications", "whats-new"].includes(section.id) ? undefined : section.title} 
                        // Only show "Add Card" for company users, and maybe only in standard categories?
                        // For now, showing it everywhere for them to ensure it's accessible.
                        onAddCard={isCompany && !isAdmin ? () => navigate("/career/addCareer") : undefined}
                      />
                  ) : (
                      <div className="text-gray-500 italic p-4 border border-dashed border-gray-700 rounded-lg text-center">
                          {isCompany && !isAdmin ? (
                             <div className="flex flex-col items-center gap-2">
                                <p>No careers posted in {section.title} yet.</p>
                                <button onClick={() => navigate("/career/addCareer")} className="text-green-500 hover:underline">+ Create One</button>
                             </div>
                          ) : (
                             <div>
                                 <p>No {section.title} careers available at the moment.</p>
                                 {section.id === "your-applications" && (
                                     applicationsData.length > 0 ? (
                                         <p className="text-xs text-yellow-500 mt-2">
                                             (You have applied to {applicationsData.length} active roles, but they don't match the current list/search.)
                                         </p>
                                     ) : (
                                         <p className="text-gray-400 mt-2">
                                             You haven't applied to any careers yet. 
                                             <br/>
                                             <span className="text-xs text-gray-500">
                                                 (User ID found: {activeUser?.userId ? "Yes" : "No"})
                                             </span>
                                         </p>
                                     )
                                 )}
                             </div>
                          )}
                      </div>
                   )}
                </SectionBlock>
              );
            })}
        </div>
      </div>
    </div>
  );
};
