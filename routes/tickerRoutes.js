const express = require("express");
const router = express.Router();
const Ticker = require('../models/Ticker');

router.get("/", async (req, res) => {
    try {
        const tickers = await Ticker.find({});
        res.json(tickers);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;