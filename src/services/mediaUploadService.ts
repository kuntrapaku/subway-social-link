
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UploadResult {
  url: string | null;
  error: string | null;
}

export const uploadMediaFile = async (file: File): Promise<UploadResult> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
    const filePath = `${fileName}`;

    console.log('Uploading file:', fileName, 'Size:', file.size, 'Type:', file.type);

    const { data, error } = await supabase.storage
      .from('media-uploads')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return { url: null, error: error.message };
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('media-uploads')
      .getPublicUrl(data.path);

    console.log('File uploaded successfully:', publicUrl);
    return { url: publicUrl, error: null };
  } catch (error) {
    console.error('Upload exception:', error);
    return { url: null, error: 'Failed to upload file' };
  }
};

export const deleteMediaFile = async (url: string): Promise<boolean> => {
  try {
    // Extract file path from URL
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    
    const { error } = await supabase.storage
      .from('media-uploads')
      .remove([fileName]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete exception:', error);
    return false;
  }
};
