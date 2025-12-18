import { useMutation, useQueryClient } from '@tanstack/react-query';
import Api from '../index.ts';

type FavouritePayload = {
  userID: number;
  roadmapID: number;
};

// 1. Add Favourite
export const useCreateFavourite = () => {
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn: async (favourite: FavouritePayload) => {
            const response = await Api.post("favourites", favourite)
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favourites'] });
        }
    })
}

// 2. Delete Favourite
export const useDeleteFavourite = () => {
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn: async (favourite: FavouritePayload) => {
            const response = await Api.delete("favourites", {data: favourite})
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favourites'] });
        }
    })
}