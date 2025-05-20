// src/pages/Dashboard.jsx
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

export default function Dashboard() {
  const username = 'admin'; // hardcoded for now

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold">Hello, {username} 👋</h2>
      <p className="mt-2 text-gray-600">Welcome to your dashboard.</p>
    </DashboardLayout>
  );
}