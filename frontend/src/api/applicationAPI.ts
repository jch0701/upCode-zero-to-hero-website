
import { useQuery, useMutation } from '@tanstack/react-query';
import Api, { queryClient } from './index';

export interface ApplicationPayload {
    careerId: number;
    userId: string;
    resumeLink?: string;
    portfolioLink?: string;
}

// 1. Submit Application
export const useSubmitApplication = () => {
    return useMutation({
        mutationFn: async (payload: ApplicationPayload) => {
            const response = await Api.post('/applications', payload);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['applications'] });
            // Also invalidate career queries to show updated status if needed
            queryClient.invalidateQueries({ queryKey: ['careers'] });
        }
    });
}


// 2. Fetch User Applications
export const useGetUserApplications = (userId: string) => {
    return useQuery({
        queryKey: ['applications', 'user', userId],
        queryFn: async () => {
            if (!userId) return [];
            const response = await Api.get(`/applications/user/${userId}`);
            return response.data;
        },
        enabled: !!userId,
    });
}
