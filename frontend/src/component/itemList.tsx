import React, { useState } from "react";
import { RoadmapItemCard } from "../component/cardDetail";
import type{ RoadmapItemCardProps } from "../component/cardDetail"; 

interface RoadmapItemListProps {
  items: RoadmapItemCardProps[];
  filterTag?: string; // Optional filter tag
}

export const RoadmapItemList: React.FC<RoadmapItemListProps> = ({ items, filterTag }) => {
  const MAX_VISIBLE = 3;
  const [showAll, setShowAll] = useState(false);
  // reorder items by date descending
  const sortedItems = [...items].sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());

  // 🔥 Filter by tag for the section
  const filteredItems = filterTag
    ? sortedItems.filter(item =>
        item.tags.some(tag => tag.label === filterTag)
      )
    : sortedItems;
  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, MAX_VISIBLE);
  const remainingCount = filteredItems.length - MAX_VISIBLE;

  if (filteredItems.length === 0) return null;

  return (
  <div>
    <div className="grid grid-cols-3 gap-6">
      {visibleItems.map((item, index) => (
        <RoadmapItemCard
          key={index}
          id={item.id}
          slug={item.slug}
          creator={item.creator}
          imageSrc={item.imageSrc}
          title={item.title}
          description={item.description}
          createdDate={item.createdDate}
          modifiedDate={item.modifiedDate}
          isFavourite={item.isFavourite}
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