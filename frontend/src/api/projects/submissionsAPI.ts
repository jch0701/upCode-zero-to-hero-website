import { useQuery, useMutation } from '@tanstack/react-query';
import Api, { queryClient } from '../index.ts';

import type { InitialSubmissionType, SubmissionType } from '../../lib/projectModuleTypes.ts';

export function useCreateSubmission(creatorId: number, projectId: number) {
  return useMutation({
    mutationFn: async (submission: InitialSubmissionType) => {
      if(!creatorId){
        throw new Error('You must be logged in to submit a submission.');
      }
      const response = await Api.post(`/projects/${projectId}/submissions/submit`, {
        ...submission,
        creatorId,
        projectId
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions', 'byProjectId', projectId] });
    }
  });
}

export function useGetSubmissionsSurfaceDataOnly(projectId: number) {
  return useQuery({
    queryKey: ['submissions', 'byProjectId', projectId],
    queryFn: async () => {
      const response = await Api.get(`/projects/${projectId}/submissions/getAllSubmissions`);
      return response.data.submissions;
    }
  })
}

export function useGetSubmissionById(projectId: number, submissionId: number) {
  return useQuery({
    queryKey: ['submissions', 'byId', submissionId],
    queryFn: async () => {
      const response = await Api.get(`/projects/${projectId}/submissions/getSubmissionById/${submissionId}`);
      return response.data.submission;
    }
  })
}

export function useGetAllSubmissionsByCreator(creatorId: number) {
  return useQuery({
    queryKey: ['submissions', 'byCreatorId', creatorId],
    queryFn: async (): Promise<SubmissionType[]> => {
      if(!creatorId){
        return [];
      }
      const response = await Api.get(`/projects/${creatorId}/submissions/getAllSubmissionsByUser`);
      return response.data.submissions;
    }
  })
}

export function useUpdateSubmission(projectId: number, submissionId: number) {
  return useMutation({
    mutationFn: async (updatedSubmissionData: Partial<InitialSubmissionType>) => {
      const response = await Api.patch(`/projects/${projectId}/submissions/${submissionId}/update`, {
        ...updatedSubmissionData
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions', 'byId', submissionId] });
    }
  });
}

export function useDeleteSubmission(projectId: number, submissionId: number) {
  return useMutation({
    mutationFn: async () => {
      const response = await Api.delete(`/projects/${projectId}/submissions/${submissionId}/delete`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions', 'byProjectId', projectId] });
    }
  });
}

//used for resume purpose
export const getUserSubmissions = async (userId: string | number) => {
  const res = await Api.get(`/projects/${userId}/submissions/getAllSubmissionsByUser`);
  return res.data.submissions; 
};