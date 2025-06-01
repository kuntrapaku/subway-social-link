
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { RecentActivityItem } from '@/hooks/useReportsAnalytics';
import { Eye, MousePointer, BarChart3 } from 'lucide-react';

interface RecentActivityTableProps {
  data: RecentActivityItem[];
}

const RecentActivityTable: React.FC<RecentActivityTableProps> = ({ data }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'profile_view':
        return <Eye className="h-4 w-4" />;
      case 'project_view':
        return <BarChart3 className="h-4 w-4" />;
      case 'link_click':
        return <MousePointer className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'profile_view':
        return 'Profile View';
      case 'project_view':
        return 'Project View';
      case 'link_click':
        return 'Link Click';
      default:
        return type;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'profile_view':
        return 'default';
      case 'project_view':
        return 'secondary';
      case 'link_click':
        return 'outline';
      default:
        return 'default';
    }
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No recent activity to show</p>
        <p className="text-sm mt-1">Start sharing your content to see analytics here</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Activity</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Source</TableHead>
          <TableHead>Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                {getIcon(activity.type)}
                <Badge variant={getBadgeVariant(activity.type)}>
                  {getTypeLabel(activity.type)}
                </Badge>
              </div>
            </TableCell>
            <TableCell className="font-medium">{activity.item}</TableCell>
            <TableCell className="text-gray-600">
              {activity.referrer || 'Direct'}
            </TableCell>
            <TableCell className="text-gray-500 text-sm">
              {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentActivityTable;
