// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import React, { useState } from 'react';
import { PlusCircle, TrendingUp, Wallet, DollarSign, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import TransactionForm from '../../components/TransactionForm';
import TransactionList from '../../components/TransactionList';
import Stats from '../../components/Stats';
import CsvImport from '../../components/CsvImport';


const HomePage = () => {
  const [transactions, setTransactions] = useState([])
  const [formOpen, setFormOpen] = useState(false)

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions].sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));
    setFormOpen(false);
  };

  const deleteTransaction = (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return;
    }
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const importTransactions = (newTransactions) => {
    setTransactions(prevTransactions =>
      [...prevTransactions, ...newTransactions].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    );
  };

  const totalBalance = transactions.reduce((acc, curr) =>
    curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0
  );

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Wallet className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Finance Tracker</h1>
          </div>
          <p className="text-gray-600">Keep track of your income and expenses</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Stats
            icon={<DollarSign className="w-6 h-6" />}
            title="Current Balance"
            amount={totalBalance}
            className="bg-white"
          />
          <Stats
            icon={<ArrowUpCircle className="w-6 h-6 text-green-500" />}
            title="Total Income"
            amount={totalIncome}
            className="bg-green-50"
          />
          <Stats
            icon={<ArrowDownCircle className="w-6 h-6 text-red-500" />}
            title="Total Expenses"
            amount={totalExpenses}
            className="bg-red-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                Transactions History
              </h2>
              <div className="flex items-center gap-4">
                <CsvImport onImport={importTransactions} />
                <button
                  onClick={() => setFormOpen(true)}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <PlusCircle className="w-5 h-5" />
                  Add Transaction
                </button>
              </div>
            </div>
            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
            />
          </div>

          <div className="lg:col-span-1">
            {formOpen && (
              <TransactionForm
                onSubmit={addTransaction}
                onCancel={() => setFormOpen(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage
