import { useQuery } from '@tanstack/react-query';
import Api from '../index.ts';

// 1. Get Specific User
export const useGetSingleUser = (userID: number) => {
    return useQuery({
        queryKey: ['users', userID],
        queryFn: async () => {
            const response = await Api.get(`users/${userID}`);
            return Array.isArray(response.data) ? response.data[0] : response.data;
        },
        enabled: !!userID,
    })
}