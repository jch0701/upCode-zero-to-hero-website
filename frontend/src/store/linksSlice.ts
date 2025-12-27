// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import { linksData } from "@/dummy";

// export interface LinkType {
//     nodeID: number;
//     chapterID: number;
//     title: string;
//     modifiedDate: string;
//     order: number;
//     link: string;
//     isViewed: boolean;
// }

// type InitialLinkOmits = "nodeID" | "modifiedDate" | "isViewed" | "chapterID";

// export type InitialLinkType = Omit<LinkType, InitialLinkOmits>;

// interface LinkSlice {
//   linkList: Array<LinkType>;
// }

// let nextNodeID = 100256;
// function generateNodeID() {
//     return (nextNodeID++);
// }

// const initialState: LinkSlice = {
//     linkList: [],
// };

// const dummyState: LinkSlice = {
//     linkList: linksData,
// };

// const linkSlice = createSlice({
//     name: "links",
//     initialState: dummyState,
//     reducers:{
//         addLink: (state, action: PayloadAction<InitialLinkType>) => {
//             const newLink: LinkType = {
//                 ...action.payload,
//                 chapterID: generateNodeID(),
//                 nodeID: generateNodeID(),
//                 modifiedDate: new Date().toISOString().slice(0, 10),
//                 isViewed: false,
//             };
//             state.linkList.push(newLink);
//         },
//         editLink: (state, action: PayloadAction<LinkType>) => {
//             const index = state.linkList.findIndex(
//                 (submission) => submission.nodeID === action.payload.nodeID
//             );
//             if (index !== -1) {
//                 state.linkList[index] = {
//                     ...action.payload,
//                     modifiedDate: new Date().toISOString().slice(0, 10),
//                     isViewed: false,
//                 };
//             }
//         },
//         deleteLink: (state, action: PayloadAction<number>) => {
//             state.linkList = state.linkList.filter(
//                 (submission) => submission.nodeID !== action.payload
//             );
//         },
//         toggleView: (state, action: PayloadAction<number>) => {
//             const index = state.linkList.findIndex(
//                 (submission) => submission.nodeID === action.payload
//             );
//             if (index !== -1){
//                 state.linkList[index].isViewed = !state.linkList[index].isViewed;
//             }
//         },
//         autosetViewTrue: (state, action: PayloadAction<number>) => {
//             const index = state.linkList.findIndex(
//                 (submission) => submission.nodeID === action.payload
//             );
//             if (index !== -1){
//                 state.linkList[index].isViewed = true;
//             }
//         },
//     },
// });

// export const { addLink, editLink, deleteLink, toggleView, autosetViewTrue } = linkSlice.actions;
// export default linkSlice.reducer;
