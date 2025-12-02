import React from 'react';
// Type and data structure
export interface Tag {
    type: 'Difficulty' | 'Category' | 'Prerequisite';
    label: string;
}
export interface RoadmapItemCardProps {
    imageSrc: string; // URL for the image
    title: string;
    date: string;
    tags: Tag[];
}

// Constraint for tag styling
const DIFFICULTY_COLORS: { [key: string]: string } = {
    beginner: 'bg-green-500 text-black-800',
    intermediate: 'bg-cyan-500 text-black-800',
    advanced: 'bg-red-500 text-black-800',
};
const TYPE_COLORS: { [key in Tag['type']]: string } = {
    Category: 'bg-yellow-500 text-black-800',
    Prerequisite: 'bg-orange-500 text-black-800',
    Difficulty: '',
    // Difficulty color is handled by DIFFICULTY_COLORS for more specific color names
};

const MAX_VISIBLE_TAGS = 5;

const TagPill: React.FC<{ tag: Tag }> = ({ tag }) => {
  let colorClass = '';

  if (tag.type === 'Difficulty') {
    // Convert label to lowercase for consistent lookup
    colorClass = DIFFICULTY_COLORS[tag.label.toLowerCase()] || 'bg-gray-500 text-gray-800';
  } 
  else {
    colorClass = TYPE_COLORS[tag.type] || 'bg-gray-500 text-gray-800';
  }
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full
        ${colorClass} whitespace-nowrap
      `}
    >
      {tag.label}
    </span>
  );
};

// --- Main Card Component ---

export const RoadmapItemCard: React.FC<RoadmapItemCardProps> = ({
    imageSrc, title, date, tags,
}) => {
  // Logic to determine which tags to show and if "More..." is needed
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const remainingTagsCount = tags.length - MAX_VISIBLE_TAGS;
  const showMoreButton = remainingTagsCount > 0;

  return (
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
        Created: <span className="font-medium">{date}</span>
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
  );
};