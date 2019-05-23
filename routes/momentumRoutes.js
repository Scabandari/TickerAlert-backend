const express = require("express");
const router = express.Router();
const utils = require("../utils/stocks/momentumUtils");

router.get("/price", async (req, res) => {
    //const {function_, symbol, interval} = req.params;
    const {symbol, interval, stat} = req.query;
    console.log(`symbol: ${symbol} interval: ${interval}`);
    try {
        const response = await utils.getMomentum(symbol, interval, stat);
        // TODO anything other than correct stat=close in url makes stat=volume, fix this w/ proper error msg
        console.log(`response: ${response}`);
        res.send({momentum: response});
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;