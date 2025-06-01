
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrafficSourceDataPoint } from '@/hooks/useReportsAnalytics';

interface TrafficSourceChartProps {
  data: TrafficSourceDataPoint[];
}

const COLORS = ['#ea580c', '#fb923c', '#fed7aa', '#fdba74', '#fbbf24', '#f59e0b'];

const TrafficSourceChart: React.FC<TrafficSourceChartProps> = ({ data }) => {
  const renderCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.source}</p>
          <p className="text-sm text-gray-600">
            {data.value} visits ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ percentage }) => `${percentage}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={renderCustomTooltip} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrafficSourceChart;
