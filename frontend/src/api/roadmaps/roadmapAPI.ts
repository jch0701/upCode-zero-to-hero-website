import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Api from '../index.ts';
import type { InitialRoadmapType, RoadmapType } from '@/store/roadmapSlice.ts';

// 1. Get Roadmap
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

// 2. Create Roadmap
export const useCreateRoadmap = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (roadmap: InitialRoadmapType) => {
            const response = await Api.post('roadmaps/create', roadmap);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roadmaps'] });
        }
    });
};

// 3. Update/Edit Roadmap
export const useEditRoadmap = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (roadmap: RoadmapType) => {
            const response = await Api.put(`roadmaps/${roadmap.roadmapID}`, roadmap);
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['roadmaps'] });
            queryClient.invalidateQueries({ queryKey: ['roadmaps', data.roadmapID] });
        }
    });
};

// 4. Delete Roadmap
export const useDeleteRoadmap = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (roadmapID: string) => {
            const response = await Api.delete(`roadmaps/${roadmapID}`, {
                data: { roadmapID } 
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roadmaps'] });
        }
    });
};