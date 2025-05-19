export interface Stat {
  value: number;
  change: number;
}

export interface DashboardStats {
  customers: Stat;
  revenue: Stat;
  orders: Stat;
  conversion: Stat;
}

export interface DataSet {
  label: string;
  data: number[];
  backgroundColor: string | string[];
  borderColor: string | string[];
  borderWidth?: number;
}

export interface ChartData {
  labels: string[];
  datasets: DataSet[];
}

export interface DashboardData {
  stats: DashboardStats;
  revenueData: ChartData;
  customersData: ChartData;
} 