import type { PillarType } from '@/store/pillarsSlice';
import type { Tag } from '../tag'; 

const difficultyScore = (level: string) => {
  switch (level.toLowerCase()) {
    case 'beginner': return 1;
    case 'intermediate': return 2;
    case 'advanced': return 3;
    default: return 0;
  }
};

export const getDifficultyLabel = (arr: string[]) => {
  if (!arr.length) return 'Unknown';
  const avg = arr.reduce((sum, d) => sum + difficultyScore(d), 0) / arr.length;
  if (avg <= 1) return 'Beginner';
  if (avg <= 2) return 'Intermediate';
  return 'Advanced';
};

export const generateTags = (roadmapID: number, pillarsData: PillarType[]): Tag[] => {
  const filtered = pillarsData.filter(p => p.roadmapID === roadmapID);

  const difficultyArr = filtered.map(p => p.difficulty);
  const categoryArr = filtered.map(p => p.category);
  const prereqArr = filtered.map(p => p.prerequisite);

  const getUniqueCategories = (arr: string[]) => Array.from(new Set(arr));
  const getPrerequisites = (arr: string[]) => {
    const cleaned = Array.from(new Set(arr));
    if (cleaned.length > 1 && cleaned.includes('None')) return cleaned.filter(r => r !== 'None');
    return cleaned;
  };

  return [
    { type: 'Difficulty', label: getDifficultyLabel(difficultyArr) },
    ...getUniqueCategories(categoryArr).map(c => ({ type: 'Category' as const, label: c })),
    ...getPrerequisites(prereqArr).map(p => ({ type: 'Prerequisite' as const, label: p })),
  ];
};
