import { useQuery } from '@tanstack/react-query';
import Api from '../index.ts';

// 1. Get All Roadmap
export const useGetRoadmaps = (userID?: string | null) => {
    return useQuery({
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
    return useQuery({
        queryKey: ['roadmaps', roadmapID, userID],
        queryFn: async () => {
            const headers = userID ? { 'x-user-id': userID } : {};
            const response = await Api.get(`roadmaps/${roadmapID}`, { headers });
            return Array.isArray(response.data) ? response.data[0] : response.data;
        },
        enabled: !!roadmapID, // Only run if ID exists
    });
};