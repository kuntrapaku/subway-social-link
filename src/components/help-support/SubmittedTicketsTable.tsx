
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { Loader2 } from 'lucide-react';

type SupportTicket = {
  id: string;
  subject: string;
  category: string;
  status: string;
  created_at: string;
};

export const SubmittedTicketsTable: React.FC = () => {
  const { user } = useAuth();

  const { data: tickets, isLoading, error } = useQuery({
    queryKey: ['support-tickets', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('support_tickets')
        .select('id, subject, category, status, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as SupportTicket[];
    },
    enabled: !!user,
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Open':
        return 'destructive';
      case 'In Progress':
        return 'default';
      case 'Resolved':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'Bug':
        return 'destructive';
      case 'Account Issue':
        return 'default';
      case 'Feature Request':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">
            Please log in to view your support tickets.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>My Support Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading tickets...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            <p>Error loading tickets. Please try again.</p>
          </div>
        ) : tickets && tickets.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No support tickets found.</p>
            <p className="text-sm mt-1">Submit your first support request to see it here.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets?.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.subject}</TableCell>
                  <TableCell>
                    <Badge variant={getCategoryBadgeVariant(ticket.category)}>
                      {ticket.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
