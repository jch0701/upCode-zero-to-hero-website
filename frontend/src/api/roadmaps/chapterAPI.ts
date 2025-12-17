import { useQuery} from '@tanstack/react-query';
import Api from '../index.ts';

// 1. Get All Chapter
export const useGetAllChapters = (userID?: string | null) => {
    return useQuery({
        queryKey: ['chapters', userID],
        queryFn: async () => {
            const headers = userID ? { 'x-user-id': userID } : {};
            const response = await Api.get(`/chapters`, { headers });
            return response.data;
        },
    });
}

// 2. Get All Chapter based on Roadmap
export const useGetRoadmapChapters = (roadmapID: string | number, userID?: string | null) => {
    return useQuery({
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
export const useGetSingleChapter = (roadmapID: string | number, chapterID: string | number, userID?: string | null) => {
    return useQuery({
        queryKey: ['chapters', roadmapID, chapterID, userID],
        queryFn: async () => {
            const headers = userID ? { 'x-user-id': userID } : {};
            const response = await Api.get(`roadmaps/${roadmapID}/chapters/${chapterID}`, { headers });
            return response.data;
        },
        enabled: !!roadmapID && !!chapterID,
    });
};