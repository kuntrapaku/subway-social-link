
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ProfileViewsDataPoint } from '@/hooks/useReportsAnalytics';

interface ProfileViewsChartProps {
  data: ProfileViewsDataPoint[];
}

const ProfileViewsChart: React.FC<ProfileViewsChartProps> = ({ data }) => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
            className="text-sm"
          />
          <YAxis className="text-sm" />
          <Tooltip 
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
            formatter={(value: number) => [value, 'Views']}
          />
          <Line 
            type="monotone" 
            dataKey="views" 
            stroke="#ea580c" 
            strokeWidth={2}
            dot={{ fill: '#ea580c', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#ea580c', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfileViewsChart;
