
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { UserManagementHeader } from '@/components/user-management/UserManagementHeader';
import { UserTable } from '@/components/user-management/UserTable';
import { useUserManagement } from '@/hooks/useUserManagement';
import { formatDate, getRoleColor, getStatusColor } from '@/utils/userManagementUtils';

const UserManagement = () => {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'creator' | 'viewer'>('viewer');

  const {
    filteredUsers,
    loading,
    searchTerm,
    setSearchTerm,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    updateUserRole,
    toggleUserStatus,
    deleteUser,
    sendInvite,
  } = useUserManagement();

  const handleSendInvite = async () => {
    const success = await sendInvite(inviteEmail, inviteRole);
    if (success) {
      setInviteDialogOpen(false);
      setInviteEmail('');
      setInviteRole('viewer');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <UserManagementHeader
          inviteDialogOpen={inviteDialogOpen}
          setInviteDialogOpen={setInviteDialogOpen}
          inviteEmail={inviteEmail}
          setInviteEmail={setInviteEmail}
          inviteRole={inviteRole}
          setInviteRole={setInviteRole}
          onSendInvite={handleSendInvite}
        />

        <UserTable
          filteredUsers={filteredUsers}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onUpdateRole={updateUserRole}
          onToggleStatus={toggleUserStatus}
          onDeleteUser={deleteUser}
          formatDate={formatDate}
          getRoleColor={getRoleColor}
          getStatusColor={getStatusColor}
        />
      </div>
    </Layout>
  );
};

export default UserManagement;
