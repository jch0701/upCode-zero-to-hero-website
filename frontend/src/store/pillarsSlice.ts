import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { pillarsData } from "@/dummy";
import { generateSlug } from "@/lib/utils";

export interface PillarType{
    chapterID: number;
    chapterSlug: string;
    roadmapID: number;
    title: string;
    description?: string;
    difficulty: string;
    category: string;
    prerequisite: string;
    order: number;
    isViewed: boolean;
    modifiedDate: string;
}

type InitialPillarOmits = "chapterID" | "chapterSlug" | "modifiedDate" | "isViewed";

export type InitialPillarType = Omit<PillarType, InitialPillarOmits>;

interface PillarSlice{
    pillarList: Array<PillarType>;
}

let nextChapterID = 100090;
function generateChapterID() {
    return (nextChapterID++);
}

const initialState: PillarSlice = {
    pillarList: [],
};

const dummyState: PillarSlice = {
    pillarList: pillarsData
}

const pillarSlice = createSlice({
    name: "chapter",
    initialState: dummyState,
    reducers:{
        addChapter: (state, action: PayloadAction<InitialPillarType>) => {
            const newPillar: PillarType = {
                ...action.payload,
                chapterID: generateChapterID(),
                chapterSlug: generateSlug(action.payload.title),
                isViewed: false,
                modifiedDate: new Date().toISOString().slice(0, 10),
            }
            state.pillarList.push(newPillar);
        },
        editChapter: (state, action: PayloadAction<PillarType>) => {
            const index = state.pillarList.findIndex(
                (submission) => submission.chapterID === action.payload.chapterID
            );
            if (index !== -1){
                state.pillarList[index] = {
                    ...action.payload,
                    chapterSlug: generateSlug(action.payload.title),
                    modifiedDate: new Date().toISOString().slice(0, 10),
                    isViewed: false,
                };
            }
        },
        deleteChapter: (state, action: PayloadAction<number>) => {
            state.pillarList = state.pillarList.filter(
                (submission) => submission.chapterID !== action.payload
            );
        },
        toggleView: (state, action: PayloadAction<number>) => {
            const index = state.pillarList.findIndex(
                (submission) => submission.chapterID === action.payload
            );
            if (index !== -1){
                state.pillarList[index].isViewed = !state.pillarList[index].isViewed;
            }
        },
        autosetViewTrue: (state, action: PayloadAction<number>) => {
            const index = state.pillarList.findIndex(
                (submission) => submission.chapterID === action.payload
            );
            if (index !== -1){
                state.pillarList[index].isViewed = true;
            }
        },
        updateChapterDate: (state, action: PayloadAction<number>) => {
            const index = state.pillarList.findIndex(
                (submission) => submission.chapterID === action.payload
            );
            if (index !== -1){
                state.pillarList[index].modifiedDate = new Date().toISOString().slice(0, 10);
            }
        }
    },
});

export const { addChapter, editChapter, deleteChapter, toggleView, autosetViewTrue, updateChapterDate } = pillarSlice.actions;
export default pillarSlice.reducer;

