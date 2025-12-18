import { useQuery } from '@tanstack/react-query';
import Api from '../index.ts';
import type { RoadmapType } from '@/store/roadmapSlice.ts';

// 1. Get All Roadmap
export const useGetRoadmaps = (userID?: string | null) => {
    return useQuery<RoadmapType[]>({
        queryKey: ['roadmaps', userID],
        queryFn: async () => {
            const headers = userID ? { 'x-user-id': userID } : {};
            const response = await Api.get('roadmaps', { headers });
            return response.data;
        },
    });
};

// 2. Get Specific Roadmap
export const useGetSingleRoadmap = (roadmapID: number, userID?: string | null) => {
    return useQuery<RoadmapType>({
        queryKey: ['roadmaps', roadmapID, userID],
        queryFn: async () => {
            const headers = userID ? { 'x-user-id': userID } : {};
            const response = await Api.get(`roadmaps/${roadmapID}`, { headers });
            return response.data;
        },
        enabled: !!roadmapID, // Only run if ID exists
    });
};