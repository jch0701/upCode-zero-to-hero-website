import React, { useState } from "react";
import { generateTags } from '../groupTag.tsx';
import { RoadmapItemCard, type RoadmapItemCardProps } from "./roadmapCard.tsx";
import { useGetAllChapters } from "@/api/roadmaps/chapterAPI.ts";

interface ListRoadmapItem {
  roadmapID: number;
  createdDate: string;
  tags?: RoadmapItemCardProps['tags']; 
}

interface RoadmapItemListProps {
  items: ListRoadmapItem[];
  filterTag?: string; // Optional filter tag
}

export const RoadmapItemList: React.FC<RoadmapItemListProps> = ({ items, filterTag }) => {
  const userID = localStorage.getItem("userID");
  const MAX_VISIBLE = 3;
  const [showAll, setShowAll] = useState(false);
  const {data: pillarsData = []} = useGetAllChapters(userID);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {visibleItems.map((item, index) => (
        <RoadmapItemCard 
            key={index} 
            selectedRoadmapID={item.roadmapID}
            tags={item.tags}
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