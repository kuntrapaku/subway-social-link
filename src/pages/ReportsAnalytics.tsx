
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, Eye, MousePointer, Users, TrendingUp } from 'lucide-react';
import { useReportsAnalytics } from '@/hooks/useReportsAnalytics';
import ProfileViewsChart from '@/components/reports/ProfileViewsChart';
import SocialLinksChart from '@/components/reports/SocialLinksChart';
import TrafficSourceChart from '@/components/reports/TrafficSourceChart';
import RecentActivityTable from '@/components/reports/RecentActivityTable';

const ReportsAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7');
  const { 
    kpis, 
    profileViewsData, 
    socialClicksData, 
    trafficSourceData,
    recentActivity,
    loading 
  } = useReportsAnalytics(timeRange);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Track your content performance and audience engagement</p>
        </div>
        
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-orange-100 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.profileViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {kpis.profileViewsChange >= 0 ? '+' : ''}{kpis.profileViewsChange}% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-100 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Views</CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.projectViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {kpis.projectViewsChange >= 0 ? '+' : ''}{kpis.projectViewsChange}% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-100 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Link Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.linkClicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {kpis.linkClicksChange >= 0 ? '+' : ''}{kpis.linkClicksChange}% from last period
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-100 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Followers Gained</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpis.followersGained.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {kpis.followersGainedChange >= 0 ? '+' : ''}{kpis.followersGainedChange}% from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              Profile Views Over Time
            </CardTitle>
            <CardDescription>Daily profile view trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileViewsChart data={profileViewsData} />
          </CardContent>
        </Card>

        <Card className="border-orange-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-orange-600" />
              Social Link Performance
            </CardTitle>
            <CardDescription>Clicks per social platform</CardDescription>
          </CardHeader>
          <CardContent>
            <SocialLinksChart data={socialClicksData} />
          </CardContent>
        </Card>

        <Card className="border-orange-100 lg:col-span-2">
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <TrafficSourceChart data={trafficSourceData} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <Card className="border-orange-100">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest clicks and visits to your content</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentActivityTable data={recentActivity} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsAnalytics;
