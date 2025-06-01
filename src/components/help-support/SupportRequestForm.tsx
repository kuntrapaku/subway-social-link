
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Upload } from 'lucide-react';

interface SupportRequestFormProps {
  onSuccess: () => void;
}

type FormData = {
  subject: string;
  description: string;
  category: string;
};

export const SupportRequestForm: React.FC<SupportRequestFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const form = useForm<FormData>({
    defaultValues: {
      subject: '',
      description: '',
      category: '',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setUploadedFile(file);
      toast.success('File attached successfully');
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast.error('You must be logged in to submit a support request');
      return;
    }

    setIsSubmitting(true);
    
    try {
      let fileUrl = null;

      // If there's a file, we would upload it to storage here
      // For now, we'll just store the filename
      if (uploadedFile) {
        fileUrl = uploadedFile.name;
      }

      const { error } = await supabase
        .from('support_tickets')
        .insert({
          user_id: user.id,
          subject: data.subject,
          description: data.description,
          category: data.category,
          file_url: fileUrl,
        });

      if (error) throw error;

      toast.success('Support request submitted successfully!');
      form.reset();
      setUploadedFile(null);
      onSuccess();
    } catch (error) {
      console.error('Error submitting support request:', error);
      toast.error('Failed to submit support request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Submit Support Request</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="subject"
              rules={{ required: 'Subject is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief description of your issue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              rules={{ required: 'Category is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Bug">Bug Report</SelectItem>
                      <SelectItem value="Account Issue">Account Issue</SelectItem>
                      <SelectItem value="Feature Request">Feature Request</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide detailed information about your issue..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Attachment (optional)</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploadedFile ? uploadedFile.name : 'Upload File'}
                </Button>
              </div>
              {uploadedFile && (
                <p className="text-sm text-green-600">
                  File attached: {uploadedFile.name}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Request'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
