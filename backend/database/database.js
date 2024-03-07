const mongoose = require('mongoose');

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        try {
            mongoose.connect(process.env.MONGO_URI);
            console.log('Database connected successfully');
        } catch (error) {
            console.log('Database connection failed');
        }
    }
}

module.exports = Database;
