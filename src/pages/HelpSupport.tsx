
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, MessageCircle } from 'lucide-react';
import { FAQSection } from '@/components/help-support/FAQSection';
import { SupportRequestForm } from '@/components/help-support/SupportRequestForm';
import { SubmittedTicketsTable } from '@/components/help-support/SubmittedTicketsTable';
import { ContactCard } from '@/components/help-support/ContactCard';

const HelpSupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState('faqs');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
          <p className="text-gray-600">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="faqs">FAQs</TabsTrigger>
                <TabsTrigger value="support">Submit Request</TabsTrigger>
                <TabsTrigger value="tickets">My Tickets</TabsTrigger>
              </TabsList>

              <TabsContent value="faqs" className="mt-6">
                <FAQSection />
              </TabsContent>

              <TabsContent value="support" className="mt-6">
                <SupportRequestForm onSuccess={() => setActiveTab('tickets')} />
              </TabsContent>

              <TabsContent value="tickets" className="mt-6">
                <SubmittedTicketsTable />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ContactCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
