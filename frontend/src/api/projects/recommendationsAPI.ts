import { useQuery, useMutation } from '@tanstack/react-query';
import Api from '../index.ts';

import type { RecommendationType, InitialRecommendation } from '../../lib/projectModuleTypes.ts';

export function useCreateRecommendation() {
  return useMutation({
    mutationFn: async (recommendation: InitialRecommendation) => {
      const response = await Api.post('/projects/recommendations/create', {
        data: recommendation
      });
      return response.data;
    }
  });
}

export function useGetAllRecommendations(projectId: number) {
  return useQuery({
    queryKey: ['recommendations', 'byProjectId', projectId],
    queryFn: async (): Promise<RecommendationType[]> => {
      const response = await Api.get(`/projects/${projectId}/recommendations/getAllRecommendations`);
      return response.data;
    }
  })
}

export function useUpdateRecommendation(recommendationId: number) {
  return useMutation({
    mutationFn: async (updatedRecommendationData: Partial<Omit<RecommendationType, "recommendationId">>) => {
      const response = await Api.put(`/projects/recommendations/${recommendationId}/update`, {
        data: updatedRecommendationData
      });
      return response.data;
    }
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