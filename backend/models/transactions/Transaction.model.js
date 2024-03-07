const mongoose = require('mongoose');

const TransactionCategories = require('../constants/TransactionCategories');

const TransactionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: Object.values(TransactionCategories),
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense', 'transfer'],
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Transaction', TransactionSchema);