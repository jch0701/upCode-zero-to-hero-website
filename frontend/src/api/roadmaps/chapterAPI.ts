import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Api from '../index.ts';
import type { InitialPillarType, PillarType } from '@/store/pillarsSlice.ts';

// 1. Get All Chapter
export const useGetAllChapters = (userID?: string | null) => {
    return useQuery<PillarType[]>({
        queryKey: ['chapters', userID],
        queryFn: async () => {
            const headers = userID ? { 'x-user-id': userID } : {};
            const response = await Api.get(`/chapters`, { headers });
            return response.data;
        },
    });
}

// 2. Get All Chapter based on Roadmap
export const useGetRoadmapChapters = (roadmapID: number, userID?: string | null) => {
    return useQuery<PillarType[]>({
        queryKey: ['chapters', roadmapID, userID],
        queryFn: async () => {
            const headers = userID ? { 'x-user-id': userID } : {};
            const response = await Api.get(`roadmaps/${roadmapID}/chapters`, { headers });
            return response.data;
        },
        enabled: !!roadmapID,
    });
};

// 3. Get Specific Chapter
export const useGetSingleChapter = (roadmapID: number, chapterID: number, userID?: string | null) => {
    return useQuery<PillarType>({
        queryKey: ['chapters', roadmapID, chapterID, userID],
        queryFn: async () => {
            const headers = userID ? { 'x-user-id': userID } : {};
            const response = await Api.get(`roadmaps/${roadmapID}/chapters/${chapterID}`, { headers });
            return response.data;
        },
        enabled: !!roadmapID && !!chapterID,
    });
};

// 4. Add Chapter
export const useCreateChapter = (roadmapID: number) => {
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn: async (chapter: InitialPillarType) => {
            const response = await Api.post(`roadmaps/${roadmapID}/chapters`, {
                roadmapID: roadmapID,
                ...chapter
            })
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chapters'] });
        }
    })
}

// 5. Edit Chapter
export const useUpdateChapter = (roadmapID: number, chapterID: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (chapter: InitialPillarType) => {
            const response = await Api.patch(`roadmaps/${roadmapID}/chapters/${chapterID}`, {
                chapterID: chapterID,
                ...chapter
            })
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chapters', chapterID] });
        }
    })
}

// 6. Delete Chapter
export const useDeleteChapter = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(chapterID: number) => {
            const response = await Api.delete(`chapters/${chapterID}`, {data: {chapterID}})
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chapters'] });
        }
    })
}