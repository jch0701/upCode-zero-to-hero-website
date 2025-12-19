import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Api from '../index.ts';
import type { InitialRecommendation, RecommendationType } from '@/lib/projectModuleTypes.ts';


export const useGetRoadmapRecommendation = () => {
    return useQuery<RecommendationType[]>({
        queryKey: ['roadmaprecommendations'],
        queryFn: async () => {
            const response = await Api.get('roadmaprecommendations');
            return response.data;
        }
    })
}


export const useCreateRoadmapRecommendation = () => {
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn: async (recommendation: InitialRecommendation) => {
            const response = await Api.post("roadmaprecommendations",  {
                sourceId: recommendation.sourceId,
                sourceType: recommendation.sourceType,
                targetId: recommendation.targetId,
                targetType: recommendation.targetType
            })
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roadmaprecommendations'] });
        }
    })
}

export const useDeleteRoadmapRecommendation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(recommendationId: number) => {
            const response = await Api.delete("roadmaprecommendations", {data: {recommendationId}})
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roadmaprecommendations'] });
        }
    })
}