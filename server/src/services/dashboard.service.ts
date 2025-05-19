import { DashboardData } from '../types/dashboard.types';

export default class DashboardService {
  /**
   * Get dashboard data including stats and chart data
   */
  public static getDashboardData(): DashboardData {
    // In a real application, this would fetch data from a database
    return {
      stats: {
        customers: { value: 1240, change: 10.5 },
        revenue: { value: 56789, change: 8.2 },
        orders: { value: 432, change: -3.6 },
        conversion: { value: 24, change: 1.8 }
      },
      revenueData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Revenue',
            data: [12000, 19000, 15000, 21000, 18000, 24000],
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            borderColor: 'rgba(99, 102, 241, 1)',
          }
        ]
      },
      customersData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'New Customers',
            data: [120, 180, 150, 210, 160, 240],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      }
    };
  }
} 