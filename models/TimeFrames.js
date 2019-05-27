const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeFrame = new Schema({
    name: {
        type: String,
        isRequired: true,
        unique: true
    }
});

module.exports = mongoose.model('timeframes', TimeFrame);
