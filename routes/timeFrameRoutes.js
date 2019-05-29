const express = require("express");
const TimeFrame = require("../models/TimeFrames");
const router = express.Router();
require('mongoose');

router.post("/", async (req, res) => {
    const { name } = req.query;
    console.log(`req.query: ${JSON.stringify(req.query)}`);
    const timeFrame = new TimeFrame({
        name
    });
    await timeFrame.save();

    res.send({status: 200, time_frame: timeFrame});
});

router.get("/", async (req, res) => {
    try {
        const timeFrames = await TimeFrame.find({});
        res.send(timeFrames);
    } catch (err) {
        res.send(`Error retrieving TimeFrames: ${err}`);
    }

});

module.exports = router;