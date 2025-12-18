import { useQuery, useMutation } from '@tanstack/react-query';
import Api, { queryClient } from '../index.ts';

import type { ExtendedProjectType } from '../../lib/projectModuleTypes.ts';

export function useCreateProject(creatorId: number) {
  return useMutation({
    mutationFn: async (project: ExtendedProjectType) => {
      // Send fields at the root so backend validation sees them
      const response = await Api.post('/projects/create', {
        ...project,
        creatorId
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', 'basicDetailsOnly'] });
    }
  });
}

export function useGetAllBasicDetailsOnly(userId: number) {
  return useQuery({
    queryKey: ['projects', 'basicDetailsOnly'],
    queryFn: async () => {
      const response = await Api.get(`/projects/getAllBasicDetailsOnly/${userId}`);
      return response.data;
    }
  })
}

export function useGetByTitleComplete(title: string, userId: number) {
  return useQuery({
    queryKey: ['projects', 'byTitleComplete', title, userId],
    queryFn: async () => {
      const response = await Api.get(`/projects/getByTitleComplete/${title}/${userId}`);
      return response.data;
    }
  })
}

export function useGetByIdComplete(projectId: number, userId: number) {
  return useQuery({
    queryKey: ['projects', 'byIdComplete', projectId, userId],
    queryFn: async () => {
      const response = await Api.get(`/projects/getByIdComplete/${projectId}/${userId}`);
      return response.data;
    }
  })
}

export function usePutTrackingData(userId: number, projectId: number) {
  return useMutation({
    mutationFn: async (trackingData: { isTracking: boolean; isMarkedAsDone: boolean }) => {
      const response = await Api.put(`/projects/${projectId}/putTrackingData/${userId}`, {
        userId,
        projectId,
        ...trackingData
      });
      return response.data;
    },
    onSuccess:() => {
      queryClient.invalidateQueries({ queryKey: ['projects', 'byIdComplete', projectId, userId] });
    }
  });
}

export function useUpdateProject(projectId: number) {
  return useMutation({
    mutationFn: async (updatedProjectData: Partial<ExtendedProjectType>) => {
      const response = await Api.put(`/projects/update/${projectId}`, {
        data: updatedProjectData
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', 'byIdComplete', projectId] });
    }
  })
}

export function useDeleteProject(projectId: number) {
  return useMutation({
    mutationFn: async () => {
      const response = await Api.delete(`/projects/delete/${projectId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', 'basicDetailsOnly'] });
    }
  });
}