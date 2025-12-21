import { useMutation, useQueryClient } from '@tanstack/react-query';
import Api from '../index.ts';

type RecordPayload = {
  userID: number;
  recordID: number;
};

// 1. Add Favourite
export const useCreateFavourite = () => {
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn: async (favourite: RecordPayload) => {
            const response = await Api.post("favouriteroadmaps",  {
                userID: favourite.userID,
                roadmapID: favourite.recordID
            })
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
        mutationFn: async (favourite: RecordPayload) => {
            const response = await Api.delete("favouriteroadmaps", {data: {
                userID: favourite.userID,
                roadmapID: favourite.recordID
            }})
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
        mutationFn: async (views: RecordPayload) => {
            const response = await Api.post("chapterviews", {
                userID: views.userID,
                chapterID: views.recordID
            })
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
        mutationFn: async (views: RecordPayload) => {
            const response = await Api.delete("chapterviews", {data: {
                userID: views.userID,
                chapterID: views.recordID
            }})
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
        mutationFn: async (views:RecordPayload) => {
            const response = await Api.post("nodeviews", {
                userID: views.userID,
                nodeID: views.recordID
            })
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
        mutationFn: async (views: RecordPayload) => {
            const response = await Api.delete("nodeviews", {data: {
                userID: views.userID,
                nodeID: views.recordID
            }})
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['nodeviews'] });
        }
    })
}