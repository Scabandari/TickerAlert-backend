const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ticker = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    momentum: {
        hr: {
            type: Number,
            default: 0
        },
        min15: {
            type: Number,
            default: 0
        },
        min5: {
            type: Number,
            default: 0
        },
        min: {
            type: Number,
            default: 0
        },
        month: {
            type: Number,
            default: 0
        },
        week: {
            type: Number,
            default: 0
        },
        day: {
            type: Number,
            default: 0
        },
    }
});

module.exports = mongoose.model('tickers', Ticker);