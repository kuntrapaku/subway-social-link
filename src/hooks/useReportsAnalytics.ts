
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export interface KPIData {
  profileViews: number;
  profileViewsChange: number;
  projectViews: number;
  projectViewsChange: number;
  linkClicks: number;
  linkClicksChange: number;
  followersGained: number;
  followersGainedChange: number;
}

export interface ProfileViewsDataPoint {
  date: string;
  views: number;
}

export interface SocialClicksDataPoint {
  platform: string;
  clicks: number;
}

export interface TrafficSourceDataPoint {
  source: string;
  value: number;
  percentage: number;
}

export interface RecentActivityItem {
  id: string;
  timestamp: string;
  type: 'profile_view' | 'project_view' | 'link_click';
  item: string;
  referrer?: string;
}

export const useReportsAnalytics = (timeRange: string) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState<KPIData>({
    profileViews: 0,
    profileViewsChange: 0,
    projectViews: 0,
    projectViewsChange: 0,
    linkClicks: 0,
    linkClicksChange: 0,
    followersGained: 0,
    followersGainedChange: 0,
  });
  const [profileViewsData, setProfileViewsData] = useState<ProfileViewsDataPoint[]>([]);
  const [socialClicksData, setSocialClicksData] = useState<SocialClicksDataPoint[]>([]);
  const [trafficSourceData, setTrafficSourceData] = useState<TrafficSourceDataPoint[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivityItem[]>([]);

  const getDateRange = () => {
    const now = new Date();
    let startDate: Date;
    
    switch (timeRange) {
      case '7':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date('2020-01-01');
    }
    
    return { startDate: startDate.toISOString(), endDate: now.toISOString() };
  };

  const fetchKPIs = async () => {
    if (!user) return;

    const { startDate, endDate } = getDateRange();
    
    try {
      // Fetch profile views
      const { data: profileViews } = await supabase
        .from('view_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'profile')
        .gte('timestamp', startDate)
        .lte('timestamp', endDate);

      // Fetch project views for user's projects
      const { data: userProjects } = await supabase
        .from('projects')
        .select('id')
        .eq('owner_id', user.id);

      const projectIds = userProjects?.map(p => p.id) || [];
      
      const { data: projectViews } = await supabase
        .from('project_views')
        .select('*')
        .in('project_id', projectIds)
        .gte('timestamp', startDate)
        .lte('timestamp', endDate);

      // Fetch link clicks
      const { data: linkClicks } = await supabase
        .from('link_clicks')
        .select('*')
        .eq('user_id', user.id)
        .gte('timestamp', startDate)
        .lte('timestamp', endDate);

      // Calculate previous period for comparison
      const periodLength = new Date(endDate).getTime() - new Date(startDate).getTime();
      const prevStartDate = new Date(new Date(startDate).getTime() - periodLength).toISOString();
      const prevEndDate = startDate;

      const { data: prevProfileViews } = await supabase
        .from('view_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'profile')
        .gte('timestamp', prevStartDate)
        .lte('timestamp', prevEndDate);

      const { data: prevProjectViews } = await supabase
        .from('project_views')
        .select('*')
        .in('project_id', projectIds)
        .gte('timestamp', prevStartDate)
        .lte('timestamp', prevEndDate);

      const { data: prevLinkClicks } = await supabase
        .from('link_clicks')
        .select('*')
        .eq('user_id', user.id)
        .gte('timestamp', prevStartDate)
        .lte('timestamp', prevEndDate);

      const calculateChange = (current: number, previous: number) => {
        if (previous === 0) return current > 0 ? 100 : 0;
        return Math.round(((current - previous) / previous) * 100);
      };

      setKpis({
        profileViews: profileViews?.length || 0,
        profileViewsChange: calculateChange(profileViews?.length || 0, prevProfileViews?.length || 0),
        projectViews: projectViews?.length || 0,
        projectViewsChange: calculateChange(projectViews?.length || 0, prevProjectViews?.length || 0),
        linkClicks: linkClicks?.length || 0,
        linkClicksChange: calculateChange(linkClicks?.length || 0, prevLinkClicks?.length || 0),
        followersGained: Math.floor(Math.random() * 50), // Mock data for now
        followersGainedChange: Math.floor(Math.random() * 20) - 10, // Mock data for now
      });

    } catch (error) {
      console.error('Error fetching KPIs:', error);
    }
  };

  const fetchProfileViewsData = async () => {
    if (!user) return;

    const { startDate, endDate } = getDateRange();
    
    try {
      const { data } = await supabase
        .from('view_logs')
        .select('timestamp')
        .eq('user_id', user.id)
        .eq('type', 'profile')
        .gte('timestamp', startDate)
        .lte('timestamp', endDate)
        .order('timestamp', { ascending: true });

      // Group by date
      const groupedData: { [key: string]: number } = {};
      data?.forEach(item => {
        const date = new Date(item.timestamp).toISOString().split('T')[0];
        groupedData[date] = (groupedData[date] || 0) + 1;
      });

      const chartData = Object.entries(groupedData).map(([date, views]) => ({
        date,
        views,
      }));

      setProfileViewsData(chartData);
    } catch (error) {
      console.error('Error fetching profile views data:', error);
    }
  };

  const fetchSocialClicksData = async () => {
    if (!user) return;

    const { startDate, endDate } = getDateRange();
    
    try {
      const { data } = await supabase
        .from('link_clicks')
        .select('link_label')
        .eq('user_id', user.id)
        .gte('timestamp', startDate)
        .lte('timestamp', endDate);

      // Group by platform
      const groupedData: { [key: string]: number } = {};
      data?.forEach(item => {
        groupedData[item.link_label] = (groupedData[item.link_label] || 0) + 1;
      });

      const chartData = Object.entries(groupedData).map(([platform, clicks]) => ({
        platform,
        clicks,
      }));

      setSocialClicksData(chartData);
    } catch (error) {
      console.error('Error fetching social clicks data:', error);
    }
  };

  const fetchTrafficSourceData = async () => {
    if (!user) return;

    const { startDate, endDate } = getDateRange();
    
    try {
      const { data: profileViews } = await supabase
        .from('view_logs')
        .select('referrer')
        .eq('user_id', user.id)
        .eq('type', 'profile')
        .gte('timestamp', startDate)
        .lte('timestamp', endDate);

      const { data: linkClicks } = await supabase
        .from('link_clicks')
        .select('referrer')
        .eq('user_id', user.id)
        .gte('timestamp', startDate)
        .lte('timestamp', endDate);

      const allReferrers = [
        ...(profileViews?.map(v => v.referrer) || []),
        ...(linkClicks?.map(c => c.referrer) || [])
      ];

      // Group by referrer source
      const groupedData: { [key: string]: number } = {};
      allReferrers.forEach(referrer => {
        const source = referrer || 'Direct';
        groupedData[source] = (groupedData[source] || 0) + 1;
      });

      const total = Object.values(groupedData).reduce((sum, count) => sum + count, 0);
      const chartData = Object.entries(groupedData).map(([source, value]) => ({
        source,
        value,
        percentage: Math.round((value / total) * 100),
      }));

      setTrafficSourceData(chartData);
    } catch (error) {
      console.error('Error fetching traffic source data:', error);
    }
  };

  const fetchRecentActivity = async () => {
    if (!user) return;

    try {
      // Fetch recent profile views
      const { data: profileViews } = await supabase
        .from('view_logs')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'profile')
        .order('timestamp', { ascending: false })
        .limit(10);

      // Fetch recent link clicks
      const { data: linkClicks } = await supabase
        .from('link_clicks')
        .select('*')
        .eq('user_id', user.id)
        .order('timestamp', { ascending: false })
        .limit(10);

      const allActivity: RecentActivityItem[] = [
        ...(profileViews?.map(view => ({
          id: view.id,
          timestamp: view.timestamp,
          type: 'profile_view' as const,
          item: 'Profile View',
          referrer: view.referrer,
        })) || []),
        ...(linkClicks?.map(click => ({
          id: click.id,
          timestamp: click.timestamp,
          type: 'link_click' as const,
          item: `${click.link_label} link`,
          referrer: click.referrer,
        })) || [])
      ];

      // Sort by timestamp and take most recent 20
      allActivity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setRecentActivity(allActivity.slice(0, 20));

    } catch (error) {
      console.error('Error fetching recent activity:', error);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([
        fetchKPIs(),
        fetchProfileViewsData(),
        fetchSocialClicksData(),
        fetchTrafficSourceData(),
        fetchRecentActivity(),
      ]).finally(() => {
        setLoading(false);
      });
    }
  }, [user, timeRange]);

  return {
    kpis,
    profileViewsData,
    socialClicksData,
    trafficSourceData,
    recentActivity,
    loading,
  };
};
