import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Chart from '../components/ui/Chart';
import { 
  UsersIcon, 
  CurrencyDollarIcon, 
  ShoppingBagIcon, 
  ChartBarIcon 
} from '@heroicons/react/24/outline';
import { fetchDashboardData } from '../api/dashboardApi';

interface DashboardData {
  stats: {
    customers: { value: number; change: number };
    revenue: { value: number; change: number };
    orders: { value: number; change: number };
    conversion: { value: number; change: number };
  };
  revenueData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
    }[];
  };
  customersData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  };
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const responseData = await fetchDashboardData();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full p-6 overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          title="Total Customers"
          value={data?.stats.customers.value.toLocaleString() || '0'}
          icon={<UsersIcon className="h-6 w-6 text-indigo-600" />}
          change={{
            value: data?.stats.customers.change || 0,
            isPositive: (data?.stats.customers.change || 0) > 0
          }}
        />
        <Card
          title="Total Revenue"
          value={`$${data?.stats.revenue.value.toLocaleString() || '0'}`}
          icon={<CurrencyDollarIcon className="h-6 w-6 text-green-600" />}
          change={{
            value: data?.stats.revenue.change || 0,
            isPositive: (data?.stats.revenue.change || 0) > 0
          }}
        />
        <Card
          title="Total Orders"
          value={data?.stats.orders.value.toLocaleString() || '0'}
          icon={<ShoppingBagIcon className="h-6 w-6 text-blue-600" />}
          change={{
            value: data?.stats.orders.change || 0,
            isPositive: (data?.stats.orders.change || 0) > 0
          }}
        />
        <Card
          title="Conversion Rate"
          value={`${data?.stats.conversion.value || 0}%`}
          icon={<ChartBarIcon className="h-6 w-6 text-purple-600" />}
          change={{
            value: data?.stats.conversion.change || 0,
            isPositive: (data?.stats.conversion.change || 0) > 0
          }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h2>
          {data?.revenueData && (
            <Chart
              type="line"
              data={data.revenueData}
              height={300}
            />
          )}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer Acquisition</h2>
          {data?.customersData && (
            <Chart
              type="bar"
              data={data.customersData}
              height={300}
            />
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Customers</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Customer {index + 1}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">customer{index + 1}@example.com</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      index % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {index % 2 === 0 ? 'Active' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${(Math.random() * 1000).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 