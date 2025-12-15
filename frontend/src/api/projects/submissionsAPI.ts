import { useQuery, useMutation } from '@tanstack/react-query';
import Api from '../index.ts';

import type { InitialSubmissionType, SubmissionType } from '../../lib/projectModuleTypes.ts';

export function useCreateSubmission(creatorId: number, projectId: number) {
  return useMutation({
    mutationFn: async (submission: InitialSubmissionType) => {
      const response = await Api.post(`/projects/${projectId}/submissions/submit`, {
        data: {
          ...submission,
          creatorId,
          projectId
        }
      });
      return response.data;
    }
  });
}

export function useGetSubmissionsSurfaceDataOnly(projectId: number) {
  return useQuery({
    queryKey: ['submissions', 'byProjectId', projectId],
    queryFn: async () => {
      const response = await Api.get(`/projects/${projectId}/submissions/getAllSubmissions`);
      return response.data;
    }
  })
}

export function useGetSubmissionById(projectId:number, submissionId: number) {
  return useQuery({
    queryKey: ['submissions', 'byId', submissionId],
    queryFn: async ()=> {
      const response = await Api.get(`/projects/${projectId}/submissions/getSubmissionById/${submissionId}`);
      return response.data;
    }
  })
}

export function useGetAllSubmissionsByCreator(creatorId: number) {
  return useQuery({
    queryKey: ['submissions', 'byCreatorId', creatorId],
    queryFn: async (): Promise<SubmissionType[]> => {
      const response = await Api.get(`/projects/${creatorId}/submissions/getAllSubmissionsByUser`);
      return response.data;
    }
  })
}

export function useUpdateSubmission(projectId: number, submissionId: number) {
  return useMutation({
    mutationFn: async (updatedSubmissionData: Partial<InitialSubmissionType>) => {
      const response = await Api.put(`/projects/${projectId}/submissions/${submissionId}/update`, {
        data: updatedSubmissionData
      });
      return response.data;
    }
  });
}

export function useDeleteSubmission(projectId: number, submissionId: number) {
  return useMutation({
    mutationFn: async () => {
      const response = await Api.delete(`/projects/${projectId}/submissions/${submissionId}/delete`);
      return response.data;
    }
  });
}