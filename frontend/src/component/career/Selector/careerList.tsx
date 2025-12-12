import React, { useState } from "react";
import {
  CareerItemCard,
  type CareerItemCardProps,
} from "@/component/career/Selector/careerCard";

interface CareerItemListProps {
  items: CareerItemCardProps[];
  filterTag?: string;
}

export const CareerItemList: React.FC<CareerItemListProps> = ({
  items,
  filterTag,
}) => {
  const MAX_VISIBLE = 3;
  const [showAll, setShowAll] = useState(false);

  const sortedItems = [...items].sort((a, b) => {
    const dateA = a.createdDate ? new Date(a.createdDate).getTime() : 0;
    const dateB = b.createdDate ? new Date(b.createdDate).getTime() : 0;
    return dateB - dateA;
  });

  const filteredItems = filterTag
    ? sortedItems.filter((item) => item.category === filterTag)
    : sortedItems;

  const visibleItems = showAll
    ? filteredItems
    : filteredItems.slice(0, MAX_VISIBLE);
  const remainingCount = filteredItems.length - MAX_VISIBLE;

  if (filteredItems.length === 0) return null;

  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {visibleItems.map((item, index) => (
          <CareerItemCard key={index} {...item} />
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

export default CareerItemList;
