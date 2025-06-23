import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

const COLORS = ['#86efac', '#fde047', '#f87171'];

export const AssetsStatusChart = ({maintenanceStatusData}) => {
  
  const data = [
    { name: 'Properly Maintained', value: maintenanceStatusData.maintained },
    { name: 'Due Soon (7 days)', value: maintenanceStatusData.dueSoon },
    { name: 'Overdue', value: maintenanceStatusData.overdue },
  ];

  console.log("AssetsStatusChart data : " + data);
  return (
    <Card className="bg-white border-none shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Assets By Maintenance Status</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {(data.length == 0)?(<p className="text-gray-500 text-center py-8">No asset data available to display status.</p>):(
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ percent }) => `(${(percent * 100).toFixed(0)}%)`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} assets`}/>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        )}
      </CardContent>
    </Card>
  );
};