const mongoose = require('mongoose');

const BudgetCategories = require('../constants/BudgetCategories');

const BudgetSchema = new mongoose.Schema({
    title: {
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
        enum: Object.values(BudgetCategories),
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

module.exports = mongoose.model('Budget', BudgetSchema);