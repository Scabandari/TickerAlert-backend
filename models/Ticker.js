const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ticker = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('tickers', Ticker);