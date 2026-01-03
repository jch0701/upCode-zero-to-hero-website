import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Api from '../index.ts';
import type { InitialRoadmapType, RoadmapType } from '@/lib/roadmapModuleTypes.ts';

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

export const getRoadmapsWithProgress = async (userID: string) => {
    if (!userID) return [];
    const response = await Api.get(`roadmaps/withProgress/${userID}`);
    return response.data;
};

export const useGetRoadmapsWithProgress = (userID: string) => {
    return useQuery<any[]>({
        queryKey: ['roadmapsWithProgress', userID],
        queryFn: async () => getRoadmapsWithProgress(userID),
        enabled: !!userID,
    });
}

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

// 3. Add Roadmap
export const useCreateRoadmap = () => {
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn: async (roadmap: InitialRoadmapType) => {
            const response = await Api.post(`roadmaps`, roadmap)
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roadmap'] });
        }
    })
}

// 4. Edit Roadmap
export const useUpdateRoadmap = (roadmapID: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (roadmap: InitialRoadmapType) => {
            const response = await Api.patch(`roadmaps/${roadmapID}`, {
                roadmapID: roadmapID,
                ...roadmap
            })
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roadmaps', roadmapID] });
        }
    })
}

// 5. Delete Roadmap
export const useDeleteRoadmap = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(roadmapID: number) => {
            const response = await Api.delete(`roadmaps/${roadmapID}`, {data: {roadmapID}})
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roadmaps'] });
        }
    })
}

// 6. Get Specific Roadmap Progress
export const useGetRoadmapProgress = (roadmapID: number, userID?: string | null) => {
    return useQuery<number>({
        queryKey: ['roadmapProgress', roadmapID, userID],
        queryFn: async () => {
            const headers = userID ? { 'x-user-id': userID } : {};
            const response = await Api.get(`roadmapProgress/${roadmapID}`, { headers });
            return response.data;
        },
        enabled: !!roadmapID, // Only run if ID exists
    });
};