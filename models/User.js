const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   googleID: {
       type: String,
       required: true

   },
    tickers: [{type: mongoose.Schema.Types.ObjectId, ref: 'tickers'}]

});

mongoose.model('users', UserSchema);