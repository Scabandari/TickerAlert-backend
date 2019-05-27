const express = require("express");
const router = express.Router();
const utils = require("../utils/stocks/momentumUtils");


router.get("/", async (req, res) => {
    //const {function_, symbol, interval} = req.params;
    const {symbol, stat} = req.query;
    //const {symbol, stat} = req.query;
    //console.log(`symbol: ${symbol} interval: ${interval}`);
    try {
        const momentum = await utils.getMomentum(symbol, stat);
        console.log(`momentumRoutes momentum: ${JSON.stringify(momentum)}`);
        //const momentum = await utils.getMomentum(symbol, interval, stat);
        // TODO anything other than correct stat=close in url makes stat=volume, fix this w/ proper error msg
        res.send(momentum);  // TODO one more double check the numbers are correct here
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;