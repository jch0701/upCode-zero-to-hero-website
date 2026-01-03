import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { Tag } from "../../tag.tsx";
import { TagPill } from "../../tag.tsx";
import type { CareerItem } from "@/store/careerSlice";
import { deleteCareerAsync } from "@/store/careerSlice";

export interface CareerItemCardProps extends CareerItem {
  slug?: string; // for routing
  createdDate?: string;
  company?: string;
  postedBy?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  mapLink?: string;
  prerequisites?: string[];
}

const MAX_VISIBLE_TAGS = 3;

export const CareerItemCard: React.FC<CareerItemCardProps> = ({
  id,
  slug,
  title,
  postedBy,
  level,
  createdDate,
  mapLink,
  prerequisites = [],
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Active user from localStorage
  const activeUser = JSON.parse(localStorage.getItem("activeUser") || "{}");
  const userRole = activeUser?.role; // "Student" | "Mentor" | "Company"

  // Build tags
  const effectiveTags: Tag[] = [];
  if (level) effectiveTags.push({ label: level, type: "Difficulty" });
  
  // Safe check for prerequisites in case it comes as null from backend
  const safePrereqs = prerequisites || [];
  safePrereqs.forEach((req) =>
    effectiveTags.push({ label: req, type: "Prerequisite" })
  );

  const visibleTags = effectiveTags.slice(0, MAX_VISIBLE_TAGS);
  const remainingTagsCount = effectiveTags.length - MAX_VISIBLE_TAGS;
  const showMoreButton = remainingTagsCount > 0;

  // Company users can only edit/delete their own careers
  // Admin can delete ANY career
  const isOwnCareer = userRole?.toLowerCase() === "company" && postedBy === activeUser.username;
  const isAdmin = userRole?.toLowerCase() === "admin";
  const canDelete = isOwnCareer || isAdmin;
  const canEdit = isOwnCareer; // Only owner should edit (?) or maybe Admin too? defaulting to owner for edit

  // Build route for details
  const careerRoute = `/career/${id}/${
    slug || title.toLowerCase().replace(/\s+/g, "-")
  }`;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-700 flex flex-col h-full hover:scale-105 transform transition duration-300">
      {/* Map Embed */}
      <div className="w-full h-32 bg-gray-700 rounded-md mb-3 overflow-hidden">
        {mapLink && mapLink.includes("google.com/maps/embed") ? (
          <iframe
            src={mapLink}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No valid map available
          </div>
        )}
      </div>

      {/* Title */}
      <h3
        className="text-xl text-left font-bold text-white mb-1 leading-tight cursor-pointer hover:text-blue-400"
        onClick={() => navigate(careerRoute)}
      >
        {title}
      </h3>

      {/* Posted By */}
      {postedBy && (
        <p className="text-sm text-left text-gray-300 mb-1">
          Posted by: {postedBy}
        </p>
      )}

      {/* Date */}
      {createdDate && (
        <p className="text-sm text-left text-gray-400 mb-4">
          Created: <span className="font-medium">{createdDate}</span>
        </p>
      )}

      {/* Project Submission Requirements Heading */}
      {effectiveTags.length > 0 && (
        <p className="text-sm text-left text-gray-300 mb-2 font-semibold">
          Project Submission Requirements:
        </p>
      )}

      {/* Tags */}
      <div className="mt-auto">
        <div className="flex flex-wrap gap-2">
          {visibleTags.map((tag, index) => (
            <TagPill key={index} tag={tag} />
          ))}
          {showMoreButton && (
            <button className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-500 text-gray-100">
              +{remainingTagsCount} More...
            </button>
          )}
        </div>
      </div>

      {/* Role-based actions */}
      <div className="mt-4 flex gap-2">
        {userRole?.toLowerCase() === "learner" || userRole?.toLowerCase() === "mentor" ? (
          <button
            onClick={() => navigate(careerRoute)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
          >
            Apply
          </button>
        ) : null}

        {canEdit && (
          <button
            onClick={() => navigate(`/career/edit/${id}`)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
          >
            Edit
          </button>
        )}
        
        {canDelete && (
          <button
            onClick={() => {
                if(window.confirm("Are you sure you want to delete this career?")) {
                    dispatch(deleteCareerAsync(id) as any);
                }
            }}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
