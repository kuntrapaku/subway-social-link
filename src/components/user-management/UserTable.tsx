
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserTableFilters } from './UserTableFilters';
import { UserTableRow } from './UserTableRow';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'creator' | 'viewer';
  status: 'active' | 'suspended' | 'pending';
  created_at: string;
}

interface UserTableProps {
  filteredUsers: User[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  onUpdateRole: (userId: string, newRole: 'admin' | 'creator' | 'viewer') => void;
  onToggleStatus: (userId: string, currentStatus: 'active' | 'suspended' | 'pending') => void;
  onDeleteUser: (userId: string) => void;
  formatDate: (dateString: string) => string;
  getRoleColor: (role: string) => string;
  getStatusColor: (status: string) => string;
}

export const UserTable: React.FC<UserTableProps> = ({
  filteredUsers,
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  onUpdateRole,
  onToggleStatus,
  onDeleteUser,
  formatDate,
  getRoleColor,
  getStatusColor,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          
          <UserTableFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <UserTableRow
                  key={user.id}
                  user={user}
                  onUpdateRole={onUpdateRole}
                  onToggleStatus={onToggleStatus}
                  onDeleteUser={onDeleteUser}
                  formatDate={formatDate}
                  getRoleColor={getRoleColor}
                  getStatusColor={getStatusColor}
                />
              ))}
            </TableBody>
          </Table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No users found matching your criteria.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
