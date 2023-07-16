const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connectDB;