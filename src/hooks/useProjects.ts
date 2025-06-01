
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '@/services/projectService';
import { CreateProjectData, UpdateProjectData, ProjectRole } from '@/types/projects';
import { toast } from 'sonner';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getUserProjects,
  });
};

export const usePublicProjects = () => {
  return useQuery({
    queryKey: ['projects', 'public'],
    queryFn: projectService.getPublicProjects,
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => projectService.getProject(id),
    enabled: !!id,
  });
};

export const useProjectCollaborators = (projectId: string) => {
  return useQuery({
    queryKey: ['projects', projectId, 'collaborators'],
    queryFn: () => projectService.getProjectCollaborators(projectId),
    enabled: !!projectId,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectData) => projectService.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to create project: ${error.message}`);
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProjectData) => projectService.updateProject(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects', data.id] });
      toast.success('Project updated successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to update project: ${error.message}`);
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to delete project: ${error.message}`);
    },
  });
};

export const useAddCollaborator = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, userId, role }: { projectId: string; userId: string; role: ProjectRole }) =>
      projectService.addCollaborator(projectId, userId, role),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'collaborators'] });
      toast.success('Collaborator added successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to add collaborator: ${error.message}`);
    },
  });
};

export const useRemoveCollaborator = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ collaboratorId, projectId }: { collaboratorId: string; projectId: string }) =>
      projectService.removeCollaborator(collaboratorId),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ['projects', projectId, 'collaborators'] });
      toast.success('Collaborator removed successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to remove collaborator: ${error.message}`);
    },
  });
};

export const useUploadCoverImage = () => {
  return useMutation({
    mutationFn: ({ file, projectId }: { file: File; projectId: string }) =>
      projectService.uploadCoverImage(file, projectId),
    onError: (error) => {
      toast.error(`Failed to upload image: ${error.message}`);
    },
  });
};
