import React from 'react';

export default function MonthlyStats({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-3 gap-4 mt-2">
      <div className="text-sm">
        <span className="text-gray-500">Income: </span>
        <span className="font-medium text-green-600">${totalIncome.toFixed(2)}</span>
      </div>
      <div className="text-sm">
        <span className="text-gray-500">Expenses: </span>
        <span className="font-medium text-red-600">${totalExpenses.toFixed(2)}</span>
      </div>
      <div className="text-sm">
        <span className="text-gray-500">Balance: </span>
        <span className={`font-medium ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ${balance.toFixed(2)}
        </span>
      </div>
    </div>
  );
}