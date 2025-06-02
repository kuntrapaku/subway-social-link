
import { useAuth } from '@/context/AuthContext';
import { AdminDashboard as AdminDashboardComponent } from '@/components/admin/AdminDashboard';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();

  // For demo purposes, allow access if user exists
  // In production, you'd check for admin role from Supabase
  const isAdmin = user !== null;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-4">
              Please sign in to access the admin dashboard.
            </p>
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-4">
              You don't have permission to access the admin dashboard.
            </p>
            <Button asChild variant="outline">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <AdminDashboardComponent />
      </div>
    </div>
  );
};

export default AdminDashboard;
