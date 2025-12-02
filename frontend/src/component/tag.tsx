export interface Tag {
    type: 'Difficulty' | 'Category' | 'Prerequisite';
    label: string;
}

// Constraint for tag styling
export const DIFFICULTY_COLORS: { [key: string]: string } = {
    beginner: 'bg-green-500 text-black-800',
    intermediate: 'bg-cyan-500 text-black-800',
    advanced: 'bg-red-500 text-black-800',
};

export const TYPE_COLORS: { [key in Tag['type']]: string } = {
    Category: 'bg-yellow-500 text-black-800',
    Prerequisite: 'bg-orange-500 text-black-800',
    Difficulty: '',
    // Difficulty color is handled by DIFFICULTY_COLORS for more specific color names
};

export const TagPill: React.FC<{ tag: Tag }> = ({ tag }) => {
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