
export type completion_activity_type = {
  opened : {
    main_topic: Record<string,number>;
    chapters: Record<string,number>;
  };
  submissions: number;
  history: { type: string; id: string | number; timestamp: number }[];
};

export const initial_Completion: completion_activity_type = {
  opened: {
    main_topic:{},
    chapters:{},
  },
  submissions:0,
  history: [],
};