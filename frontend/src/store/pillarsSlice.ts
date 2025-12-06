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
    modifiedDate: string;
    difficulty: string;
    category: string;
    prerequisite: string;
    order: number;
    isViewed: boolean;
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

// const initialState: PillarSlice = {
//     pillarList: [],
// };

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
                modifiedDate: new Date().toISOString(),
                isViewed: false
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
                    modifiedDate: new Date().toISOString(),
                    chapterSlug: generateSlug(action.payload.title)
                };
            }
        },
        deleteChapter: (state, action: PayloadAction<number>) => {
            state.pillarList = state.pillarList.filter(
                (submission) => submission.chapterID !== action.payload
            );
        },
    },
});

export const { addChapter, editChapter, deleteChapter } = pillarSlice.actions;
export default pillarSlice.reducer;

