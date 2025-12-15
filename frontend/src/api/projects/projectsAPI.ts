import { useQuery, useMutation } from '@tanstack/react-query';
import Api from '../index.ts';

import type { InitialProjectType, ProjectType } from '../../lib/projectModuleTypes.ts';

export function useCreateProject(creatorId: number) {
  return useMutation({
    mutationFn: async (project: InitialProjectType) => {
      const response = await Api.post('/projects/create', {
        data: {
          ...project,
          creatorId
        }
      });
      return response.data;
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

export function useGetByTitleComplete(title: string) {
  return useQuery({
    queryKey: ['projects', 'byTitleComplete', title],
    queryFn: async () => {
      const response = await Api.get(`/projects/getByTitleComplete/${title}`);
      return response.data;
    }
  })
}

export function useGetByIdComplete(projectId: number) {
  return useQuery({
    queryKey: ['projects', 'byIdComplete', projectId],
    queryFn: async () => {
      const response = await Api.get(`/projects/getByIdComplete/${projectId}`);
      return response.data;
    }
  })
}

export function usePutTrackingData(userId: number, projectId: number) {
  return useMutation({
    mutationFn: async (trackingData: { isTracking: boolean; isMarkedAsDone: boolean }) => {
      const response = await Api.put(`/projects/${projectId}/trackingData`, {
        data: {
          userId,
          projectId,
          ...trackingData
        }
      });
      return response.data;
    }
  });
}

export function useUpdateProject(projectId: number) {
  return useMutation({
    mutationFn: async (updatedProjectData: Partial<InitialProjectType>) => {
      const response = await Api.put(`/projects/update/${projectId}`, {
        data: updatedProjectData
      });
      return response.data;
    }
  })
}

export function useDeleteProject(projectId: number) {
  return useMutation({
    mutationFn: async () => {
      const response = await Api.delete(`/projects/delete/${projectId}`);
      return response.data;
    }
  });
}