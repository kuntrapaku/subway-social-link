
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, FileText, Video, BarChart3, AlertTriangle, UserCheck } from 'lucide-react';
import { DemoDataButton } from './DemoDataButton';
import { useReportsAnalytics } from '@/hooks/useReportsAnalytics';

export const AdminDashboard = () => {
  const { data: analyticsData } = useReportsAnalytics();

  const metrics = [
    {
      title: 'Total Users',
      value: '1,247',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Projects',
      value: '89',
      change: '+8%',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      title: 'Videos Uploaded',
      value: '156',
      change: '+23%',
      icon: Video,
      color: 'text-purple-600'
    },
    {
      title: 'Profile Views',
      value: '12.5K',
      change: '+18%',
      icon: BarChart3,
      color: 'text-orange-600'
    }
  ];

  const supportTickets = [
    {
      id: '1',
      subject: 'Video upload issue',
      category: 'Technical',
      status: 'Open',
      user: 'john.doe@email.com',
      date: '2024-01-15'
    },
    {
      id: '2',
      subject: 'Profile verification',
      category: 'Account',
      status: 'In Progress',
      user: 'jane.smith@email.com',
      date: '2024-01-14'
    },
    {
      id: '3',
      subject: 'Payment inquiry',
      category: 'Billing',
      status: 'Resolved',
      user: 'mike.wilson@email.com',
      date: '2024-01-13'
    }
  ];

  const flaggedContent = [
    {
      id: '1',
      type: 'post',
      content: 'Inappropriate content in project description',
      reporter: 'user@email.com',
      date: '2024-01-15',
      status: 'Pending'
    },
    {
      id: '2',
      type: 'video',
      content: 'Copyright violation reported',
      reporter: 'creator@email.com',
      date: '2024-01-14',
      status: 'Under Review'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <UserCheck className="h-4 w-4" />
          <span>Admin Access</span>
        </div>
      </div>

      {/* Demo Data Section */}
      <DemoDataButton />

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{metric.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Sections */}
      <Tabs defaultValue="support" className="space-y-4">
        <TabsList>
          <TabsTrigger value="support">Support Tickets</TabsTrigger>
          <TabsTrigger value="flagged">Flagged Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{ticket.subject}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{ticket.category}</span>
                        <span>{ticket.user}</span>
                        <span>{ticket.date}</span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      ticket.status === 'Open' ? 'bg-red-100 text-red-800' :
                      ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flagged">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <CardTitle>Flagged Content</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flaggedContent.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{item.content}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="capitalize">{item.type}</span>
                        <span>Reported by: {item.reporter}</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                    <div className="px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>New signups (7 days)</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active users (7 days)</span>
                    <span className="font-medium">823</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Profile completions</span>
                    <span className="font-medium">91%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>New projects (7 days)</span>
                    <span className="font-medium">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Posts published</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. engagement rate</span>
                    <span className="font-medium">4.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
