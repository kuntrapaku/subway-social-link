
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin': return 'text-red-600 bg-red-50';
    case 'creator': return 'text-blue-600 bg-blue-50';
    case 'viewer': return 'text-green-600 bg-green-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-green-600 bg-green-50';
    case 'suspended': return 'text-red-600 bg-red-50';
    case 'pending': return 'text-yellow-600 bg-yellow-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};
