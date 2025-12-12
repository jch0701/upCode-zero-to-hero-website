import React from "react";
import { Link } from "react-router-dom";
import type { Tag } from "../../tag.tsx";
import { TagPill } from "../../tag.tsx";
import type { CareerItem } from "@/store/careerSlice";

export interface CareerItemCardProps extends CareerItem {
  slug?: string; // for routing
  createdDate?: string;
  company?: string;
  postedBy?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  mapLink?: string; // direct Google Maps embed link
  prerequisites?: string[]; // extra requirements for project submission
}

const MAX_VISIBLE_TAGS = 3;

export const CareerItemCard: React.FC<CareerItemCardProps> = ({
  id,
  slug,
  title,
  category,
  company,
  postedBy,
  level,
  createdDate,
  mapLink,
  prerequisites = [],
}) => {
  // Build tags from level, category, and prerequisites
  const effectiveTags: Tag[] = [];
  if (level) effectiveTags.push({ label: level, type: "Difficulty" });
  if (category) effectiveTags.push({ label: category, type: "Category" });
  prerequisites.forEach((req) =>
    effectiveTags.push({ label: req, type: "Prerequisite" })
  );

  const visibleTags = effectiveTags.slice(0, MAX_VISIBLE_TAGS);
  const remainingTagsCount = effectiveTags.length - MAX_VISIBLE_TAGS;
  const showMoreButton = remainingTagsCount > 0;

  return (
    <Link
      to={`/career/${id}/${slug || title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-700 flex flex-col h-full hover:scale-105 transform transition duration-300">
        {/* Map Embed */}
        <div className="w-full h-32 bg-gray-700 rounded-md mb-3 overflow-hidden">
          {mapLink ? (
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
              No map available
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl text-left font-bold text-white mb-1 leading-tight">
          {title}
        </h3>

        {/* Company / Posted By */}
        {company && (
          <p className="text-sm text-left text-gray-300 mb-1">
            Posted by: {postedBy || company}
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

        {/* Apply Button */}
        <div className="mt-4">
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition">
            Apply
          </button>
        </div>
      </div>
    </Link>
  );
};
