import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ChartType = 'line' | 'bar';

interface ChartProps {
  type: ChartType;
  data: ChartData<'line' | 'bar', number[], string>;
  options?: ChartOptions<'line' | 'bar'>;
  height?: number;
}

const Chart: React.FC<ChartProps> = ({ type, data, options, height = 300 }) => {
  const defaultOptions: ChartOptions<'line' | 'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const chartOptions = { ...defaultOptions, ...options };

  return (
    <div style={{ height: `${height}px` }}>
      {type === 'line' ? (
        <Line data={data as ChartData<'line', number[], string>} options={chartOptions as ChartOptions<'line'>} />
      ) : (
        <Bar data={data as ChartData<'bar', number[], string>} options={chartOptions as ChartOptions<'bar'>} />
      )}
    </div>
  );
};

export default Chart; 