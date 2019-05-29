const express = require("express");
const router = express.Router();
const Ticker = require('../models/Ticker');
const momentumUtils = require('../utils/stocks/momentumUtils');
const utils = require('util');

router.get("/", async (req, res) => {
    try {
        const tickers = await Ticker.find({});
        res.json(tickers);
    } catch (err) {
        res.send(err);
    }
});

router.put("/:name", async (req, res) => {
    let {name} = req.params;
    name = name.toUpperCase();
    //console.log(`name: ${name}`);
    //const momentum = await momentumUtils.getMomentum(name);
    let ticker = await Ticker.find({name});
    ticker = ticker[0];
    //console.log(`momentum: ${JSON.stringify(momentum)}`);

    ticker.momentum.hr = momentum.hr;
    // console.log(`momentum.hr: ${momentum.hr}`);
    // console.log(`ticker: ${JSON.stringify(ticker)}`);
    ticker.momentum.min15 = momentum.min15;
    ticker.momentum.min5 = momentum.min5;
    ticker.momentum.min = momentum.min;
    try {
        await ticker.save();
    } catch (err) {
        console.log(err);
    }

    console.log(`ticker: ${utils.inspect(ticker)}`);
    res.send({msg: 'Asset updated', asset: ticker});
});

router.post("/", async (req, res) => {
    let {name} = req.query;
    const ticker = await new Ticker({name});
    await ticker.save();
    res.send(ticker);
});

module.exports = router;