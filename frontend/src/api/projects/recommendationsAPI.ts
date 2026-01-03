import { useQuery, useMutation } from '@tanstack/react-query';
import Api, { queryClient } from '../index.ts';

import type { RecommendationType, InitialRecommendation } from '../../lib/projectModuleTypes.ts';

export function useCreateRecommendation() {
  return useMutation({
    mutationFn: async (recommendation: InitialRecommendation) => {
      const response = await Api.post(`/projects/${recommendation.sourceId}/recommendations/add`, {
        ...recommendation
      });
      return response.data.sourceId;
    },
    onSuccess: (_, variables) => {
      // Invalidate queries related to recommendations for the source project
      queryClient.invalidateQueries({ queryKey: ['recommendations', 'byProjectId', variables.sourceId] });
    }
  });
}

export function useGetAllRecommendations(projectId: number) {
  return useQuery({
    queryKey: ['recommendations', 'byProjectId', projectId],
    queryFn: async (): Promise<RecommendationType[]> => {
      if (projectId === -1) {
        return [];
      }
      const response = await Api.get(`/projects/${projectId}/recommendations/getAllRecommendations`);
      return response.data.recommendations;
    }
  })
}

export function useUpdateRecommendation(recommendationId: number) {
  return useMutation({
    mutationFn: async (updatedRecommendationData: Partial<Omit<RecommendationType, "recommendationId">>) => {
      const response = await Api.put(`/projects/recommendations/${recommendationId}/update`, {
        ...updatedRecommendationData
      });
      return response.data;
    },
  });
}

export function useDeleteRecommendation(recommendationId: number) {
  return useMutation({
    mutationFn: async () => {
      const response = await Api.delete(`/projects/recommendations/${recommendationId}/delete`);
      return response.data;
    }
  });
}