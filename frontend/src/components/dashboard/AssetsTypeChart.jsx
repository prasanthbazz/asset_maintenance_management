import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

export const AssetsTypeChart = ({data}) => {

    return (
    <Card className="bg-white border-none shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Assets By Type</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {(data.length == 0)?(<p className="text-gray-500 text-center py-8">No asset data available to display.</p>):(
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="assetType" angle={-30} textAnchor="end" height={70} interval={0} 
                        tick={{fontSize: 10}}
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend wrapperStyle={{fontSize: '12px'}}/>
                    <Bar dataKey="count" fill="#38bdf8" name="Number of Assets" />
                </BarChart>
            </ResponsiveContainer>
        </div>
        )}
      </CardContent>
    </Card>
  );
}