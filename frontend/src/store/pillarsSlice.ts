import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { pillarsData } from "@/dummy";
import { generateSlug } from "@/lib/utils";
import { touchPillar, touchRoadmap } from "./action";
import { deleteLink } from "./linksSlice";

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
                modifiedDate: new Date().toISOString().slice(0, 10),
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
                    modifiedDate: new Date().toISOString().slice(0, 10),
                    chapterSlug: generateSlug(action.payload.title)
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
        }
    },
    extraReducers: (builder) => {
    builder.addCase(touchPillar, (state, action) => {
      const idx = state.pillarList.findIndex(p => p.chapterID === action.payload);
      if (idx !== -1) state.pillarList[idx].modifiedDate = new Date().toISOString().slice(0, 10);
    });
    }
});

export const { addChapter, editChapter, deleteChapter, toggleView } = pillarSlice.actions;
export default pillarSlice.reducer;

// Thunks that update the related roadmap's modified date after chapter changes
export const addChapterAndTouch = (payload: InitialPillarType) => (dispatch: any) => {
    dispatch(addChapter(payload));
    dispatch(touchRoadmap(payload.roadmapID));
};

export const editChapterAndTouch = (payload: PillarType) => (dispatch: any) => {
    dispatch(editChapter(payload));
    dispatch(touchRoadmap(payload.roadmapID));
};

export const deleteChapterAndTouch = (chapterID: number) => (dispatch: any, getState: any) => {
    // find pillar to get roadmapID before deletion
    const state: any = getState();
    const pillar = state.chapter?.pillarList?.find((p: any) => p.chapterID === chapterID);
    const roadmapID = pillar?.roadmapID;
    // delete any links that belong to this chapter
    const links: any[] = state.link?.linkList?.filter((l: any) => l.chapterID === chapterID) ?? [];
    for (const l of links) {
        dispatch(deleteLink(l.nodeID));
    }
    dispatch(deleteChapter(chapterID));
    if (roadmapID !== undefined) dispatch(touchRoadmap(roadmapID));
};

