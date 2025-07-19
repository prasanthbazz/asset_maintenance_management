import React from 'react';
import { Card } from '../ui/Card';

export const StatCard = ({ title, value, icon, colorClass = 'text-blue-600', description }) => {
  const bgClass = colorClass.replace('text-', 'bg-') + '/20';

  return (
    <Card className="bg-white shadow-md hover:shadow-lg border-none transition-shadow duration-300 p-4 rounded-xl">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full ${bgClass}`}>
          {React.cloneElement(icon, { className: `w-7 h-7 ${colorClass}` })}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-semibold text-gray-800">{value}</p>
          {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
        </div>
      </div>
    </Card>
  );
};
