import React from 'react';
import { Link } from "react-router-dom";
import type { Tag } from '../../tag.tsx';
import { TagPill } from '../../tag.tsx';
import { generateTags } from '../groupTag.tsx';
import { useSelector } from "react-redux";
import type { RoadmapType } from '@/store/roadmapSlice.ts';
import type { PillarType } from '@/store/pillarsSlice.ts';
// Type and data structure
export interface RoadmapItemCardProps {
    selectedRoadmapID: number;
    tags?: Tag[];
}

const MAX_VISIBLE_TAGS = 3;

// --- Main Card Component ---

export const RoadmapItemCard: React.FC<RoadmapItemCardProps> = ({
    selectedRoadmapID
}) => {
  // Compute tags from pillarsData when not provided
  const roadmapData = useSelector((state: any) => state.roadmap.roadmapList) as RoadmapType[];
  const roadmapItem = roadmapData.find(p => p.roadmapID === selectedRoadmapID);
  if (!roadmapItem) return <p className="text-white text-center mt-10">Roadmap not found</p>;
  const pillarsData = useSelector((state: any) => state.chapter.pillarList) as PillarType[];
  const effectiveTags = generateTags(roadmapItem.roadmapID, pillarsData);
  // Logic to determine which tags to show and if "More..." is needed
  const visibleTags = effectiveTags.slice(0, MAX_VISIBLE_TAGS);
  const remainingTagsCount = effectiveTags.length - MAX_VISIBLE_TAGS;
  const showMoreButton = remainingTagsCount > 0;

  return (
    <Link to={`/roadmap/${roadmapItem.roadmapID}/${roadmapItem.roadmapSlug}`}>
    <div className="w-72 bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-700 flex flex-col h-full hover:scale-105 transform transition duration-300">
      {/* 1. Image Placeholder/Container */}
      <div className="w-full h-32 bg-gray-700 rounded-md mb-3 overflow-hidden">
        {/* Replace with a proper image component if you load actual images */}
        <img
          src={roadmapItem.imageSrc}
          alt={roadmapItem.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Optional: Fallback if image fails to load
            e.currentTarget.src = 'placeholder-image.jpg'; // Path to a local placeholder image
          }}
        />
      </div>

      {/* 2. Title (Name) */}
      <h3 className="text-xl text-left font-bold text-white mb-1 leading-tight">{roadmapItem.title}</h3>

      {/* 3. Date */}
      <p className="text-sm text-left text-gray-400 mb-4">
        Created: <span className="font-medium">{roadmapItem.createdDate}</span>
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