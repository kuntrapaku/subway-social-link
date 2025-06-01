
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, X, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Project } from '@/types/projects';
import { useCreateProject, useUpdateProject, useUploadCoverImage } from '@/hooks/useProjects';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  description: z.string().optional(),
  trailer_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  tags: z.array(z.string()),
  is_public: z.boolean(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectEditorDialogProps {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  project?: Project;
}

export const ProjectEditorDialog: React.FC<ProjectEditorDialogProps> = ({
  open,
  onClose,
  mode,
  project,
}) => {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [newTag, setNewTag] = useState('');

  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const uploadCoverImage = useUploadCoverImage();

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      trailer_url: '',
      tags: [],
      is_public: false,
    },
  });

  // Reset form when dialog opens/closes or project changes
  useEffect(() => {
    if (open && mode === 'edit' && project) {
      form.reset({
        title: project.title,
        description: project.description || '',
        trailer_url: project.trailer_url || '',
        tags: project.tags || [],
        is_public: project.is_public,
      });
      setCoverPreview(project.cover_image_url || null);
    } else if (open && mode === 'create') {
      form.reset({
        title: '',
        description: '',
        trailer_url: '',
        tags: [],
        is_public: false,
      });
      setCoverPreview(null);
    }
    setCoverImage(null);
  }, [open, mode, project, form]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !form.getValues('tags').includes(trimmedTag)) {
      const currentTags = form.getValues('tags');
      form.setValue('tags', [...currentTags, trimmedTag]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues('tags');
    form.setValue('tags', currentTags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = async (data: ProjectFormData) => {
    try {
      let coverImageUrl = project?.cover_image_url || '';

      // Upload cover image if one was selected
      if (coverImage) {
        // Create a temporary project ID for upload path if creating new project
        const projectId = project?.id || 'temp-' + Date.now();
        const uploadResult = await uploadCoverImage.mutateAsync({ 
          file: coverImage, 
          projectId 
        });
        coverImageUrl = uploadResult;
      }

      // Ensure title is always present for create operations
      const projectData = {
        title: data.title,
        description: data.description,
        trailer_url: data.trailer_url,
        tags: data.tags,
        is_public: data.is_public,
        cover_image_url: coverImageUrl,
      };

      if (mode === 'create') {
        await createProject.mutateAsync(projectData);
      } else if (project) {
        await updateProject.mutateAsync({
          id: project.id,
          ...projectData,
        });
      }

      onClose();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Project' : 'Edit Project'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Cover Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                {coverPreview ? (
                  <div className="relative">
                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setCoverPreview(null);
                        setCoverImage(null);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload cover image</p>
                    <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Trailer URL */}
            <FormField
              control={form.control}
              name="trailer_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trailer URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags/Genres
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.watch('tags').map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Public/Private Toggle */}
            <FormField
              control={form.control}
              name="is_public"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <FormLabel className="text-base">Make project public</FormLabel>
                    <p className="text-sm text-gray-500">
                      Public projects can be viewed by anyone
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createProject.isPending || updateProject.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {createProject.isPending || updateProject.isPending
                  ? 'Saving...'
                  : mode === 'create'
                  ? 'Create Project'
                  : 'Update Project'
                }
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
