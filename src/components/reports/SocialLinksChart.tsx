
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SocialClicksDataPoint } from '@/hooks/useReportsAnalytics';

interface SocialLinksChartProps {
  data: SocialClicksDataPoint[];
}

const SocialLinksChart: React.FC<SocialLinksChartProps> = ({ data }) => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="platform" 
            className="text-sm"
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis className="text-sm" />
          <Tooltip 
            formatter={(value: number) => [value, 'Clicks']}
          />
          <Bar 
            dataKey="clicks" 
            fill="#ea580c"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SocialLinksChart;
