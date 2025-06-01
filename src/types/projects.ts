
export type ProjectRole = 
  | 'director'
  | 'producer'
  | 'actor'
  | 'cinematographer'
  | 'editor'
  | 'writer'
  | 'composer'
  | 'sound_designer'
  | 'production_designer'
  | 'costume_designer'
  | 'makeup_artist'
  | 'other';

export interface Project {
  id: string;
  owner_id: string;
  title: string;
  description?: string;
  cover_image_url?: string;
  trailer_url?: string;
  tags: string[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectCollaborator {
  id: string;
  project_id: string;
  user_id: string;
  role: ProjectRole;
  created_at: string;
  // These will be joined from user profiles
  name?: string;
  email?: string;
}

export interface ProjectWithCollaborators extends Project {
  collaborators: ProjectCollaborator[];
}

export interface CreateProjectData {
  title: string;
  description?: string;
  cover_image_url?: string;
  trailer_url?: string;
  tags: string[];
  is_public: boolean;
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  id: string;
}
