import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { roadmapData } from "@/dummy";
import { generateSlug } from "@/lib/utils";

export interface RoadmapType {
    roadmapID: number;
    roadmapSlug: string;
    creatorID: number;
    imageSrc: string;
    title: string;
    description: string;
    createdDate: string;
    modifiedDate: string;
    isFavourite: boolean;
}

type InitialRoadmapOmits = "roadmapID" | "createdDate" | "modifiedDate" | "roadmapSlug" | "isFavourite";

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
                modifiedDate: new Date().toISOString().slice(0, 10),
                isFavourite: false,
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
                    creatorID: existing.creatorID,
                    createdDate: existing.createdDate,
                    modifiedDate: new Date().toISOString().slice(0, 10),
                    isFavourite: existing.isFavourite,
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
        },
        updateRoadmapDate: (state, action: PayloadAction<number>) => {
            const index = state.roadmapList.findIndex(
                (submission) => submission.roadmapID === action.payload
            );
            if (index !== -1){
                state.roadmapList[index].modifiedDate = new Date().toISOString().slice(0, 10);
            }
        }
    },
});

export const { addRoadmap, editRoadmap, deleteRoadmap, toggleFavourite, updateRoadmapDate } = roadmapSlice.actions;
export default roadmapSlice.reducer;
