const express = require("express");
const router = express.Router();
const Ticker = require('../models/Ticker');
const util = require('util');
const axios = require('axios');
const keys = require('../config/keys');
const api_endpoint = keys.alphaVantageEndpoint;
const api_key = keys.alphaVantageKey;

const SYMBOL_SEARCH = 'SYMBOL_SEARCH';

router.get("/", async (req, res) => {
    try {
        const tickers = await Ticker.find({});
        res.json(tickers);
    } catch (err) {
        res.send(err);
    }
});

router.post("/", async (req, res) => {
    let {name} = req.query;
    const response = axios.get(`${api_endpoint}function=${SYMBOL_SEARCH}&keywords=${name}&apikey=${api_key}`);
    //TODO response is empty?????????????????
    console.log(`response: ${JSON.stringify(response, null, 2)}`);
        // const ticker = await new Ticker({name});
    // await ticker.save();
    //res.send(ticker);
    res.send('working');
});

module.exports = router;


// router.put("/:name", async (req, res) => {
//     let {name} = req.params;
//     name = name.toUpperCase();
//     //console.log(`name: ${name}`);
//     //const momentum = await momentumUtils.getMomentum(name);
//     let ticker = await Ticker.find({name});
//     ticker = ticker[0];
//     //console.log(`momentum: ${JSON.stringify(momentum)}`);
//
//     ticker.momentum.hr.close = momentum.hr.close;
//     ticker.momentum.min15.close = momentum.min15.close;
//     ticker.momentum.min5.close = momentum.min5.close;
//     ticker.momentum.min.close = momentum.min.close;
//
//     ticker.momentum.hr.volume = momentum.hr.volume;
//     ticker.momentum.min15.volume = momentum.min15.volume;
//     ticker.momentum.min5.volume = momentum.min5.volume;
//     ticker.momentum.min.volume = momentum.min.volume;
//     try {
//         await ticker.save();
//     } catch (err) {
//         console.log(err);
//     }
//
//     console.log(`ticker: ${utils.inspect(ticker)}`);
//     res.send({msg: 'Asset updated', asset: ticker});
// });