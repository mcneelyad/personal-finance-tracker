import React, { useState } from 'react';
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

import MonthlyStats from './MonthlyStats';

const ITEMS_PER_PAGE = 10;

export default function TransactionList({ transactions, onDelete }) {
  const [currentPage, setCurrentPage] = useState({});

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-500">
        No transactions yet. Add one to get started!
      </div>
    );
  }

  const groupedByMonth = transactions.reduce((groups, transaction) => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!groups[monthKey]) {
      groups[monthKey] = [];
    }
    groups[monthKey].push(transaction);
    return groups;
  }, {});

  const sortedMonths = Object.keys(groupedByMonth).sort().reverse();

  const Pagination = ({ monthKey, total })=> {
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    const currentMonthPage = currentPage[monthKey] || 1;

    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            Page {currentMonthPage} of {totalPages}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage({ ...currentPage, [monthKey]: currentMonthPage - 1 })}
            disabled={currentMonthPage === 1}
            className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentPage({ ...currentPage, [monthKey]: currentMonthPage + 1 })}
            disabled={currentMonthPage === totalPages}
            className="p-1 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  const TransactionTable = ({ transactions, monthKey }) => {
    const currentMonthPage = currentPage[monthKey] || 1;
    const start = (currentMonthPage - 1) * ITEMS_PER_PAGE;
    const paginatedTransactions = transactions.slice(start, start + ITEMS_PER_PAGE);

    return (
      <>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                      ${transaction.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.type === 'income'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onDelete(transaction.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination monthKey={monthKey} total={transactions.length} />
      </>
    );
  };

  return (
    <div className="space-y-8">
      {sortedMonths.map((monthKey) => {
        const monthTransactions = groupedByMonth[monthKey];
        const [year, month] = monthKey.split('-');
        const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'long' });
        
        return (
          <div key={monthKey} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  {monthName} {year}
                </h3>
                <span className="text-sm text-gray-500">
                  {monthTransactions.length} transaction{monthTransactions.length !== 1 ? 's' : ''}
                </span>
              </div>
              <MonthlyStats transactions={monthTransactions} />
            </div>
            <TransactionTable 
              transactions={monthTransactions}
              monthKey={monthKey}
            />
          </div>
        );
      })}
    </div>
  );
}