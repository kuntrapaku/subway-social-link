
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Clock, Phone } from 'lucide-react';

export const ContactCard: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Contact Support</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Need immediate assistance? Reach out to us directly:
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">support@movcon.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
          
          <div className="pt-2 border-t">
            <Button asChild variant="outline" className="w-full mb-2">
              <a href="mailto:support@movcon.com">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp Chat
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Support Hours</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Monday - Friday:</span>
              <span>9:00 AM - 6:00 PM PST</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Saturday:</span>
              <span>10:00 AM - 4:00 PM PST</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sunday:</span>
              <span>Closed</span>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700">
              Response time: We typically respond within 24 hours during business days.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
