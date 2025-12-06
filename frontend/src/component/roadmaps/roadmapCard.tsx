import React from 'react';
import { Link } from "react-router-dom";
import type { Tag } from '../tag.tsx';
import { TagPill } from '../tag.tsx';
import { generateTags } from './groupTag';
import { pillarsData } from '../../dummy';
// Type and data structure
export interface RoadmapItemCardProps {
    roadmapID: number;
    roadmapSlug: string;
    creator: number;
    imageSrc: string; // URL for the image
    title: string;
    description: string;
    createdDate: string;
    modifiedDate: string;
    isFavourite: boolean;
  tags?: Tag[];
}

const MAX_VISIBLE_TAGS = 3;

// --- Main Card Component ---

export const RoadmapItemCard: React.FC<RoadmapItemCardProps> = ({
    roadmapID, roadmapSlug, imageSrc, title, createdDate, tags,
}) => {
  // Compute tags from pillarsData when not provided
  const effectiveTags = (tags && tags.length) ? tags : generateTags(roadmapID, pillarsData);
  // Logic to determine which tags to show and if "More..." is needed
  const visibleTags = effectiveTags.slice(0, MAX_VISIBLE_TAGS);
  const remainingTagsCount = effectiveTags.length - MAX_VISIBLE_TAGS;
  const showMoreButton = remainingTagsCount > 0;

  return (
    <Link to={`/roadmap/${roadmapID}/${roadmapSlug}`}>
    <div className="bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-700 flex flex-col h-full hover:scale-105 transform transition duration-300">
      {/* 1. Image Placeholder/Container */}
      <div className="w-full h-32 bg-gray-700 rounded-md mb-3 overflow-hidden">
        {/* Replace with a proper image component if you load actual images */}
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Optional: Fallback if image fails to load
            e.currentTarget.src = 'placeholder-image.jpg'; // Path to a local placeholder image
          }}
        />
      </div>

      {/* 2. Title (Name) */}
      <h3 className="text-xl text-left font-bold text-white mb-1 leading-tight">{title}</h3>

      {/* 3. Date */}
      <p className="text-sm text-left text-gray-400 mb-4">
        Created: <span className="font-medium">{createdDate}</span>
      </p>

      {/* 4. Tags Section */}
      <div className="mt-auto">
        <div className="flex flex-wrap gap-2">
          {visibleTags.map((tag, index) => (
            <TagPill key={index} tag={tag} />
          ))}

          {/* "More..." Tag */}
          {showMoreButton && (
            <button className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-500 text-gray-100">
              +{remainingTagsCount} More...
            </button>
          )}
        </div>
      </div>
    </div>
    </Link>
  );
};