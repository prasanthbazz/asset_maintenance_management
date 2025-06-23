// src/pages/Dashboard.jsx
import { React, useState, useEffect } from 'react';
//import DashboardLayout from '../components/DashboardLayout';
import { StatCard } from '../components/dashboard/StatCard';
import { AssetsStatusChart } from '../components/dashboard/AssetsStatusChart';
import { AssetsTypeChart } from '../components/dashboard/AssetsTypeChart';
import { CubeIcon, WrenchScrewdriverIcon, CheckCircleIcon, ExclamationTriangleIcon } from '../components/ui/icons';
import { getDashboardSummary } from '@/services/api';

const dashboard = () => {
  const totalAssets = 10;
  const maintenanceThisMonth = 29;
  const pendingApprovalCount = 5;
  const overdueAssetsCount = 1;

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardSummary() {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
      } catch (error) {
        console.error('Failed to fetch dashboard summary:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardSummary();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
    <div className="space-y-6 p-4">
          <h1 className="text-3xl font-bold text-gray-800">Asset Maintenance Management Dashboard</h1>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Assets" value={summary.totalAssets} icon={<CubeIcon />} colorClass="text-blue-600" />
            <StatCard title="Maintenance This Month" value={summary.maintenanceThisMonth} icon={<WrenchScrewdriverIcon />} colorClass="text-green-500"/>
            <StatCard title="Pending Approvals" value={summary.maintenancePendingApproval} icon={<ExclamationTriangleIcon />} colorClass="text-yellow-500" />
            <StatCard title="Assets Overdue" value={summary.overdueAssets} icon={<ExclamationTriangleIcon />} colorClass="text-red-500" />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AssetsStatusChart maintenanceStatusData={summary.assetsCountByMaintenanceStatus} />
            <AssetsTypeChart data={summary.assetsCountByType} />
            {/*<AssetTypeDistributionChart assets={assets} /> */}
          </div>
    </div>
    </div>
  )
}

export default dashboard;