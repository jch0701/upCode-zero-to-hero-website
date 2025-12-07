// store/actions.ts
import { createAction } from "@reduxjs/toolkit";

// payload = chapterID
export const touchPillar = createAction<number>("pillar/touch");
// payload = roadmapID
export const touchRoadmap = createAction<number>("roadmap/touch");