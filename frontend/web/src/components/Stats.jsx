import React, { ReactNode } from 'react';

export default function Stats({ icon, title, amount, className = '' }) {
  return (
    <div className={`rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        </div>
      </div>
      <p className="mt-4 text-2xl font-semibold text-gray-900">
        ${amount.toFixed(2)}
      </p>
    </div>
  );
}