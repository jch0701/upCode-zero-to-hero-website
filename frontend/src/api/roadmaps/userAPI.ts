import { useQuery } from '@tanstack/react-query';
import Api from '../index.ts';
import type { UserListType } from '@/store/userListSlice.ts';

// 1. Get Specific User
export const useGetSingleUser = (userID: number) => {
    return useQuery<UserListType>({
        queryKey: ['users', userID],
        queryFn: async () => {
            const response = await Api.get(`users/${userID}`);
            return response.data;
        },
        enabled: !!userID,
    })
}