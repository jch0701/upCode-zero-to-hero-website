import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Api from '../index.ts';
import type { InitialLinkType, LinkType } from '@/store/linksSlice.ts';

// 1. Get All Link
export const useGetAllLinks = (userID?: string | null) => {
    return useQuery<LinkType[]>({
        queryKey: ['links', userID],
        queryFn: async () => {
            const headers = userID ? { 'x-user-id': userID } : {};
            const response = await Api.get(`/links`, { headers });
            return response.data;
        },
    });
}

// 2. Get All Links based on Chapter
export const useGetChapterLinks = (chapterID: number, userID?: string | null) => {
    return useQuery<LinkType[]>({
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
export const useGetSingleLink = (chapterID: number, linkID: number, userID?: string | null) => {
    return useQuery<LinkType>({
        queryKey: ['chapters', chapterID, linkID, userID],
        queryFn: async () => {
            const headers = userID ? { 'x-user-id': userID } : {};
            const response = await Api.get(`chapters/${chapterID}/links/${linkID}`, { headers });
            return response.data;
        },
        enabled: !!chapterID && !!linkID,
    });
};

// 4. Add Link
export const useCreateLink = (chapterID: number) => {
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn: async (link: InitialLinkType) => {
            const response = await Api.post(`chapters/${chapterID}/links`, {
                chapterID: chapterID,
                ...link
            })
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['links'] });
        }
    })
}

// 5. Edit Link
export const useUpdateLink = (chapterID: number, nodeID: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (link: InitialLinkType) => {
            const response = await Api.patch(`chapters/${chapterID}/links/${nodeID}`, {
                nodeID: nodeID,
                ...link
            })
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['links', nodeID] });
        }
    })
}

// 6. Delete Link
export const useDeleteLink = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(nodeID: number) => {
            const response = await Api.delete(`links/${nodeID}`, {data: {nodeID}})
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['links'] });
        }
    })
}