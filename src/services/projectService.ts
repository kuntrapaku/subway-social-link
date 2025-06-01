
import { supabase } from '@/integrations/supabase/client';
import { Project, ProjectCollaborator, CreateProjectData, UpdateProjectData, ProjectRole } from '@/types/projects';

export const projectService = {
  // Get all projects for current user
  async getUserProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('owner_id', (await supabase.auth.getUser()).data.user?.id)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get public projects
  async getPublicProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_public', true)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get single project with collaborators
  async getProject(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Get project collaborators
  async getProjectCollaborators(projectId: string): Promise<ProjectCollaborator[]> {
    const { data, error } = await supabase
      .from('project_collaborators')
      .select('*')
      .eq('project_id', projectId);

    if (error) throw error;
    return data || [];
  },

  // Create new project
  async createProject(projectData: CreateProjectData): Promise<Project> {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('projects')
      .insert({
        ...projectData,
        owner_id: user.data.user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update project
  async updateProject(projectData: UpdateProjectData): Promise<Project> {
    const { id, ...updateData } = projectData;
    const { data, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete project
  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Add collaborator
  async addCollaborator(projectId: string, userId: string, role: ProjectRole): Promise<ProjectCollaborator> {
    const { data, error } = await supabase
      .from('project_collaborators')
      .insert({
        project_id: projectId,
        user_id: userId,
        role,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Remove collaborator
  async removeCollaborator(collaboratorId: string): Promise<void> {
    const { error } = await supabase
      .from('project_collaborators')
      .delete()
      .eq('id', collaboratorId);

    if (error) throw error;
  },

  // Upload cover image
  async uploadCoverImage(file: File, projectId: string): Promise<string> {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.data.user.id}/${projectId}/cover.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('project-covers')
      .upload(fileName, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('project-covers')
      .getPublicUrl(fileName);

    return data.publicUrl;
  },
};
