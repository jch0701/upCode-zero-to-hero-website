import { useQuery } from '@tanstack/react-query';
import Api from '../index.ts';
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