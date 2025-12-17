import { useQuery} from '@tanstack/react-query';
import Api from '../index.ts';

// 1. Get All Link
export const useGetAllLinks = (userID?: string | null) => {
    return useQuery({
        queryKey: ['links', userID],
        queryFn: async () => {
            const headers = userID ? { 'x-user-id': userID } : {};
            const response = await Api.get(`/links`, { headers });
            return response.data;
        },
    });
}

// 2. Get All Links based on Chapter
export const useGetChapterLinks = (chapterID: string | number, userID?: string | null) => {
    return useQuery({
        queryKey: ['links', chapterID, userID],
        queryFn: async () => {
            const headers = userID ? { 'x-user-id': userID } : {};
            const response = await Api.get(`chapters/${chapterID}/links`, { headers });
            return response.data;
        },
        enabled: !!chapterID,
    });
};

// 3. Get Specific Link
export const useGetSingleLink = (chapterID: string | number, linkID: string | number, userID?: string | null) => {
    return useQuery({
        queryKey: ['chapters', chapterID, linkID, userID],
        queryFn: async () => {
            const headers = userID ? { 'x-user-id': userID } : {};
            const response = await Api.get(`chapters/${chapterID}/links/${linkID}`, { headers });
            return response.data;
        },
        enabled: !!chapterID && !!linkID,
    });
};