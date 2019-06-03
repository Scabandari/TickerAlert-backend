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
            close: {
                type: Number,
                default: 0
            },
            volume: {
                type: Number,
                default: 0
            }
        },
        min15: {
            close: {
                type: Number,
                default: 0
            },
            volume: {
                type: Number,
                default: 0
            }
        },
        min5: {
            close: {
                type: Number,
                default: 0
            },
            volume: {
                type: Number,
                default: 0
            }
        },
        min: {
            close: {
                type: Number,
                default: 0
            },
            volume: {
                type: Number,
                default: 0
            }
        },
        month: {
            close: {
                type: Number,
                default: 0
            },
            volume: {
                type: Number,
                default: 0
            }
        },
        week: {
            close: {
                type: Number,
                default: 0
            },
            volume: {
                type: Number,
                default: 0
            }
        },
        day: {
            close: {
                type: Number,
                default: 0
            },
            volume: {
                type: Number,
                default: 0
            }
        },
    }
});

module.exports = mongoose.model('tickers', Ticker);