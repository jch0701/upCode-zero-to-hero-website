import { useMutation, useQueryClient } from '@tanstack/react-query';
import Api from '../index.ts';

type FavouritePayload = {
  userID: number;
  roadmapID: number;
};

type ChapterRecordPayload = {
    userID: number;
    chapterID: number;
}

type LinkRecordPayload = {
    userID: number;
    nodeID: number;
}

// 1. Add Favourite
export const useCreateFavourite = () => {
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn: async (favourite: FavouritePayload) => {
            const response = await Api.post("favouriteroadmaps", favourite)
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favouriteroadmaps'] });
        }
    })
}

// 2. Delete Favourite
export const useDeleteFavourite = () => {
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn: async (favourite: FavouritePayload) => {
            const response = await Api.delete("favouriteroadmaps", {data: favourite})
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favouriteroadmaps'] });
        }
    })
}

// 3. Add Chapter Record
export const useCreateChapterRecord = () => {
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn: async (views: ChapterRecordPayload) => {
            const response = await Api.post("chapterviews", views)
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chapterviews'] });
        }
    })
}

// 4. Delete Chapter Record
export const useDeleteChapterRecord = () => {
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn: async (views: ChapterRecordPayload) => {
            const response = await Api.delete("chapterviews", {data: views})
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chapterviews'] });
        }
    })
}


// 5. Add Link Record
export const useCreateLinkRecord = () => {
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn: async (views: LinkRecordPayload) => {
            const response = await Api.post("nodeviews", views)
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['nodeviews'] });
        }
    })
}


// 6. Delete Link Record
export const useDeleteLinkRecord = () => {
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn: async (views: LinkRecordPayload) => {
            const response = await Api.delete("nodeviews", {data: views})
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['nodeviews'] });
        }
    })
}