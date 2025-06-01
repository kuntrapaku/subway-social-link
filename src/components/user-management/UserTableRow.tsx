
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Switch } from '@/components/ui/switch';
import { Trash2 } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'creator' | 'viewer';
  status: 'active' | 'suspended' | 'pending';
  created_at: string;
}

interface UserTableRowProps {
  user: User;
  onUpdateRole: (userId: string, newRole: 'admin' | 'creator' | 'viewer') => void;
  onToggleStatus: (userId: string, currentStatus: 'active' | 'suspended' | 'pending') => void;
  onDeleteUser: (userId: string) => void;
  formatDate: (dateString: string) => string;
  getRoleColor: (role: string) => string;
  getStatusColor: (status: string) => string;
}

export const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  onUpdateRole,
  onToggleStatus,
  onDeleteUser,
  formatDate,
  getRoleColor,
  getStatusColor,
}) => {
  return (
    <TableRow key={user.id} className="transition-all duration-200 hover:bg-gray-50">
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <Select
          value={user.role}
          onValueChange={(value: 'admin' | 'creator' | 'viewer') => onUpdateRole(user.id, value)}
        >
          <SelectTrigger className={`w-24 h-8 text-xs ${getRoleColor(user.role)}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="viewer">Viewer</SelectItem>
            <SelectItem value="creator">Creator</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
            {user.status}
          </span>
          {user.status !== 'pending' && (
            <Switch
              checked={user.status === 'active'}
              onCheckedChange={() => onToggleStatus(user.id, user.status)}
            />
          )}
        </div>
      </TableCell>
      <TableCell>{formatDate(user.created_at)}</TableCell>
      <TableCell className="text-right">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete User</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {user.name}? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDeleteUser(user.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};
