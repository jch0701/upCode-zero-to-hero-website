import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { linksData } from "@/dummy";
import { touchPillar, touchRoadmap } from "./action";

export interface LinkType {
    nodeID: number;
    chapterID: number;
    title: string;
    modifiedDate: string;
    order: number;
    link: string;
    isViewed: boolean;
}

type InitialLinkOmits = "nodeID" | "modifiedDate" | "isViewed";

export type InitialLinkType = Omit<LinkType, InitialLinkOmits>;

interface LinkSlice {
  linkList: Array<LinkType>;
}

let nextNodeID = 100256;
function generateNodeID() {
    return (nextNodeID++);
}

// const initialState: LinkSlice = {
//     linkList: [],
// };

const dummyState: LinkSlice = {
    linkList: linksData,
};

const linkSlice = createSlice({
    name: "links",
    initialState: dummyState,
    reducers:{
        addLink: (state, action: PayloadAction<InitialLinkType>) => {
            const newLink: LinkType = {
                ...action.payload,
                nodeID: generateNodeID(),
                modifiedDate: new Date().toISOString().slice(0, 10),
                isViewed: false,
            };
            state.linkList.push(newLink);
        },
        editLink: (state, action: PayloadAction<LinkType>) => {
            const index = state.linkList.findIndex(
                (submission) => submission.nodeID === action.payload.nodeID
            );
            if (index !== -1) {
                state.linkList[index] = {
                    ...action.payload,
                    modifiedDate: new Date().toISOString().slice(0, 10),
                };
            }
        },
        deleteLink: (state, action: PayloadAction<number>) => {
            state.linkList = state.linkList.filter(
                (submission) => submission.nodeID !== action.payload
            );
        },
        toggleView: (state, action: PayloadAction<number>) => {
            const index = state.linkList.findIndex(
                (submission) => submission.nodeID === action.payload
            );
            if (index !== -1){
                state.linkList[index].isViewed = !state.linkList[index].isViewed;
            }
        },
        autosetViewTrue: (state, action: PayloadAction<number>) => {
            const index = state.linkList.findIndex(
                (submission) => submission.nodeID === action.payload
            );
            if (index !== -1){
                state.linkList[index].isViewed = true;
            }
        },
    },
});

export const { addLink, editLink, deleteLink, toggleView, autosetViewTrue } = linkSlice.actions;
// Thunks that update the related pillar's modified date after link changes
export const addLinkAndTouch = (payload: InitialLinkType) => (dispatch: any, getState: any) => {
    dispatch(addLink(payload));
    // touch the pillar
    dispatch(touchPillar(payload.chapterID));
    // also touch the roadmap that owns the pillar (if any)
    const state: any = getState();
    const pillar = state.chapter?.pillarList?.find((p: any) => p.chapterID === payload.chapterID);
    if (pillar?.roadmapID !== undefined) dispatch(touchRoadmap(pillar.roadmapID));
};

export const editLinkAndTouch = (payload: LinkType) => (dispatch: any, getState: any) => {
    dispatch(editLink(payload));
    dispatch(touchPillar(payload.chapterID));
    const state: any = getState();
    const pillar = state.chapter?.pillarList?.find((p: any) => p.chapterID === payload.chapterID);
    if (pillar?.roadmapID !== undefined) dispatch(touchRoadmap(pillar.roadmapID));
};

export const deleteLinkAndTouch = (nodeID: number) => (dispatch: any, getState: any) => {
    // find the link to get its chapterID before deletion
    const state: any = getState();
    const link = state.link?.linkList?.find((l: any) => l.nodeID === nodeID);
    const chapterID = link?.chapterID;
    // find roadmapID before deleting the chapter (deleting link won't remove chapter)
    const pillar = chapterID !== undefined ? state.chapter?.pillarList?.find((p: any) => p.chapterID === chapterID) : undefined;
    const roadmapID = pillar?.roadmapID;
    dispatch(deleteLink(nodeID));
    if (chapterID !== undefined) dispatch(touchPillar(chapterID));
    if (roadmapID !== undefined) dispatch(touchRoadmap(roadmapID));
};

export default linkSlice.reducer;
