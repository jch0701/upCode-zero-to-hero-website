import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Api from '../index.ts';
import type { InitialRecommendation, RecommendationType } from '@/lib/projectModuleTypes.ts';


export const useGetRoadmapRecommendation = () => {
    return useQuery<RecommendationType[]>({
        queryKey: ['recommendations'],
        queryFn: async () => {
            const response = await Api.get('roadmaps/recommendations');
            return response.data;
        }
    })
}


export const useCreateRoadmapRecommendation = () => {
    const queryClient = useQueryClient();
    return useMutation ({
        mutationFn: async (recommendation: InitialRecommendation) => {
            const response = await Api.post("roadmaps/recommendations",  {
                sourceId: recommendation.sourceId,
                sourceType: recommendation.sourceType,
                targetId: recommendation.targetId,
                targetType: recommendation.targetType
            })
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roadmaps/recommendations'] });
        }
    })
}

export const useDeleteRoadmapRecommendation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(recommendationID: number) => {
            const response = await Api.delete("roadmaps/recommendations", {data: {recommendationID}})
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roadmaps/recommendations'] });
        }
    })
}