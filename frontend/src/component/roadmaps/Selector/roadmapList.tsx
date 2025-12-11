import React, { useState } from "react";
import { generateTags } from '../groupTag.tsx';
import { useSelector } from "react-redux";
import type { PillarCardProps } from "./pillarCard.tsx";
import { RoadmapItemCard, type RoadmapItemCardProps } from "./roadmapCard.tsx";

interface RoadmapItemListProps {
  items: RoadmapItemCardProps[];
  filterTag?: string; // Optional filter tag
}

export const RoadmapItemList: React.FC<RoadmapItemListProps> = ({ items, filterTag }) => {
  const MAX_VISIBLE = 3;
  const [showAll, setShowAll] = useState(false);
  const pillarsData = useSelector((state: any) => state.chapter.pillarList) as PillarCardProps[];
  // reorder items by date descending
  const sortedItems = [...items].sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());

  // 🔥 Filter by tag for the section (derive tags when missing)
  const filteredItems = filterTag
    ? sortedItems.filter(item => {
        const effectiveTags = (item.tags && item.tags.length) ? item.tags : generateTags(item.roadmapID, pillarsData);
        return effectiveTags.some(tag => tag.label === filterTag);
      })
    : sortedItems;
  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, MAX_VISIBLE);
  const remainingCount = filteredItems.length - MAX_VISIBLE;

  if (filteredItems.length === 0) return null;

  return (
  <div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {visibleItems.map((item, index) => (
        <RoadmapItemCard key={index} {...item}
        />
      ))}
    </div>

    {filteredItems.length > MAX_VISIBLE && (
      <div className="flex justify-center mt-6">
        <button
          className="w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : `+${remainingCount} More`}
        </button>
      </div>
    )}
  </div>
);
};

export default RoadmapItemList;