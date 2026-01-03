import { useQuery, useMutation } from '@tanstack/react-query';
import Api, { queryClient } from '../index.ts';
import type { CareerItem } from '@/store/careerSlice.ts';

// 1. Get All Chapter
export const useGetAllCareers = () => {
    return useQuery<CareerItem[]>({
        queryKey: ['careers'],
        queryFn: async () => {
            const response = await Api.get(`/careers`);
            return response.data;
        },
    });
}

// 2. Get Specific Career
export const useGetSingleCareer = (careerID: number) => {
    return useQuery<CareerItem>({
        queryKey: ['careers', careerID],
        queryFn: async () => {
            const response = await Api.get(`careers/${careerID}`);
            return response.data;
        },
        enabled: !!careerID,
    })
}

// 3. Create Career
export const useCreateCareer = () => {
    return useMutation({
        mutationFn: async (newCareer: any) => {
            const response = await Api.post('/careers', newCareer);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['careers'] });
        }
    });
}

// 4. Update Career
export const useUpdateCareer = () => {
    return useMutation({
        mutationFn: async ({ id, ...updatedCareer }: any) => {
            const response = await Api.put(`/careers/${id}`, updatedCareer);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['careers'] });
        }
    });
}

// 5. Delete Career
export const useDeleteCareer = () => {
    return useMutation({
        mutationFn: async (careerID: number) => {
            const response = await Api.delete(`/careers/${careerID}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['careers'] });
        }
    });
}