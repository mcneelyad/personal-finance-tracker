const router = require('express').Router();

const Transaction = require('../models/transactions/Transaction.model');

router.get('/', (req, res) => {
    res.json({ message: 'Transactions route' });
});

router.post('/', async (req, res) => {
    const transaction = new Transaction(req.body);
    await transaction.save()
        .then((transaction) => {
            res.status(201).json(transaction);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndUpdate(id, req.body)

    if (!transaction) {
        return res.status(404).json({ message: `Transaction with id ${id} not found` });
    }

    res.json(transaction);
});

router.get('/filter', async (req, res) => {
    const { category } = req.query;
    const transactions = await Transaction.find({ category });

    res.json(transactions);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const transaction = await Transaction.findById(id);

    if (!transaction) {
        return res.status(404).json({ message: `Transaction with id ${id} not found` });
    }

    res.json(transaction);
});

module.exports = router;