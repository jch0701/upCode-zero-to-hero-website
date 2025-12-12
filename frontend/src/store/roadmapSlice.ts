import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { roadmapData } from "@/dummy";
import { generateSlug } from "@/lib/utils";
import { deleteChapter } from "./pillarsSlice";
import { deleteLink } from "./linksSlice";

export interface RoadmapType {
    roadmapID: number;
    roadmapSlug: string;
    creatorID: number;
    imageSrc: string;
    title: string;
    description: string;
    createdDate: string;
    isFavourite: boolean;
}

type InitialRoadmapOmits = "roadmapID" | "createdDate" | "modifiedDate" | "roadmapSlug";

export type InitialRoadmapType = Omit<RoadmapType, InitialRoadmapOmits>;

interface RoadmapSlice{
    roadmapList: Array<RoadmapType>;
}


let nextRoadmapID = 100019;
function generateRoadmapID() {
    return (nextRoadmapID++);
}


const initialState: RoadmapSlice = {
    roadmapList: [],
};

const dummyState: RoadmapSlice = {
    roadmapList: roadmapData
}

const roadmapSlice = createSlice({
    name: "roadmap",
    initialState: dummyState,
    reducers: {
        addRoadmap: (state, action: PayloadAction<InitialRoadmapType>) => {
            const newRoadmap: RoadmapType = {
                ...action.payload,
                roadmapID: generateRoadmapID(),
                roadmapSlug: generateSlug(action.payload.title),
                createdDate: new Date().toISOString().slice(0, 10),
            }
            state.roadmapList.push(newRoadmap);
        },
        editRoadmap: (state, action: PayloadAction<RoadmapType>) => {
            const index = state.roadmapList.findIndex(
                (submission) => submission.roadmapID === action.payload.roadmapID
            );
            if (index !== -1){
                const existing = state.roadmapList[index];
                state.roadmapList[index] = {
                    ...action.payload,
                    roadmapSlug: generateSlug(action.payload.title),
                    createdDate: existing.createdDate,
                };
            }
        },
        deleteRoadmap: (state, action: PayloadAction<number>) => {
            state.roadmapList = state.roadmapList.filter(
                (submission) => submission.roadmapID !== action.payload
            );
        },
        toggleFavourite: (state, action: PayloadAction<number>) => {
            const index = state.roadmapList.findIndex(
                (submission) => submission.roadmapID === action.payload
            );
            if (index !== -1){
                state.roadmapList[index].isFavourite = !state.roadmapList[index].isFavourite;
            }
        }
    },
});

export const { addRoadmap, editRoadmap, deleteRoadmap, toggleFavourite } = roadmapSlice.actions;
export default roadmapSlice.reducer;

// Delete roadmap and cascade delete chapters and links belonging to it
export const deleteRoadmapAndCascade = (roadmapID: number) => (dispatch: any, getState: any) => {
    const state: any = getState();
    // find chapters that belong to this roadmap
    const chapters: any[] = state.chapter?.pillarList?.filter((c: any) => c.roadmapID === roadmapID) ?? [];
    for (const ch of chapters) {
        // delete links under each chapter
        const links: any[] = state.link?.linkList?.filter((l: any) => l.chapterID === ch.chapterID) ?? [];
        for (const l of links) {
            dispatch(deleteLink(l.nodeID));
        }
        dispatch(deleteChapter(ch.chapterID));
    }
    // finally delete the roadmap itself
    dispatch(deleteRoadmap(roadmapID));
};
