import { useQuery, useMutation } from '@tanstack/react-query';
import Api, { queryClient } from '../index.ts';

import type { ExtendedProjectType } from '../../lib/projectModuleTypes.ts';

export function useCreateProject(creatorId: number) {
  return useMutation({
    mutationFn: async (project: ExtendedProjectType) => {
      if (!creatorId) {
        throw new Error('You must be logged in to create a project.');
      }
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
      // function calls with userId null or undefined will fetch projects without tracking data
      // this is handled by the backend
      const url = userId ? `/projects/getAllBasicDetailsOnly/${userId}` : '/projects/getAllBasicDetailsOnly';
      const response = await Api.get(url);
      return response.data;
    },
  })
}

export function useGetByTitleComplete(title: string, userId: number) {
  return useQuery({
    queryKey: ['projects', 'byTitleComplete', title, userId],
    queryFn: async () => {
      // function calls with userId null or undefined will fetch projects without tracking data
      // this is handled by the backend
      const url = userId ? `/projects/getByTitleComplete/${title}/${userId}` : `/projects/getByTitleComplete/${title}`;
      const response = await Api.get(url);
      return response.data;
    }
  })
}

export function useGetAllRelatedProjects(userId: number) {
  return useQuery({
    queryKey: ['projects', 'relatedProjects', userId],
    queryFn: async () => {
      if(userId === null || userId === undefined){
        return [];
      }
      const response = await Api.get(`/projects/getAllRelatedToUser/${userId}`);
      return response.data;
    }
  })
}

export function useGetByIdComplete(projectId: number, userId: number) {
  return useQuery({
    queryKey: ['projects', 'byIdComplete', projectId, userId],
    queryFn: async () => {
      // function calls with userId null or undefined will fetch projects without tracking data
      // this is handled by the backend
      const url = userId ? `/projects/getByIdComplete/${projectId}/${userId}` : `/projects/getByIdComplete/${projectId}`;
      const response = await Api.get(url);
      return response.data;
    }
  })
}

export function usePutTrackingData(userId: number, projectId: number) {
  return useMutation({
    mutationFn: async (trackingData: { isTracking: boolean; isMarkedAsDone: boolean }) => {
      if(userId === null || userId === undefined){
        throw new Error('You must be logged in to track a project.');
      }
      const response = await Api.put(`/projects/${projectId}/putTrackingData/${userId}`, {
        userId,
        projectId,
        ...trackingData
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', 'byIdComplete', projectId, userId] });
    }
  });
}

export function useUpdateProject(projectId: number) {
  return useMutation({
    mutationFn: async (updatedProjectData: Partial<ExtendedProjectType>) => {
      const response = await Api.put(`/projects/update/${projectId}`, updatedProjectData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', 'byIdComplete', projectId] });
      queryClient.invalidateQueries({ queryKey: ['recommendations', 'byProjectId', projectId]});
      queryClient.invalidateQueries({ queryKey: ['submissions', 'byProjectId', projectId]});
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
    },
    onError: (error) => {
      alert("Failed to delete project: " + error.message);
    }
  });
}