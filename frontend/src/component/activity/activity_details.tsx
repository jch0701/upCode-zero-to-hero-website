
export type completion_activity_type = {
  opened : {
    main_topic: Record<string,number>;
    chapters: Record<string,number>;
  };
  submissions: number;
  roadmap_created: number;
  roadmap_deleted: number;
  history: { type: string; id: string | number; timestamp: number }[];
};

export const initial_Completion: completion_activity_type = {
  opened: {
    main_topic:{},
    chapters:{},
  },
  submissions:0,
  roadmap_created:0,
  roadmap_deleted:0,
  history: [],
};