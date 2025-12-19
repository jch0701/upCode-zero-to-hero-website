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

type InitialPillarOmits = "chapterID" | "chapterSlug" | "modifiedDate" | "isViewed" | "roadmapID";

export type InitialPillarType = Omit<PillarType, InitialPillarOmits>;

export interface LinkType {
    nodeID: number;
    chapterID: number;
    title: string;
    modifiedDate: string;
    order: number;
    link: string;
    isViewed: boolean;
}

type InitialLinkOmits = "nodeID" | "modifiedDate" | "isViewed" | "chapterID";

export type InitialLinkType = Omit<LinkType, InitialLinkOmits>;

export type UserListType = {
  userId: number;
  username: string;
  email: string;
  password: string;
  role: string;
  bio?:string;
  skill: string[];
}