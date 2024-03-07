require('dotenv').config();

const express = require('express');
const PORT = process.env.PORT;
const app = express();

const Database = require('./database/database');
new Database();

app.use(express.json());

app.use('/transactions', require('./routes/Transactions.routes'));

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});