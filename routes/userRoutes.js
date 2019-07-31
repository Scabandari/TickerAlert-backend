const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  //res.send('respond with a resource');
    try {
        const users = await User.find({});
        console.log(`users: ${JSON.stringify(users, null, 2)}`);
        res.json(users);
    } catch (err) {
        //res.status(500).send(err);
        console.log(`GET /users ERROR: ${err}`);
        res.send(err);
    }
});

router.get("/:id", async (req, res) => {
    //console.log(`req.query.id: ${JSON.stringify(req.params)}`);
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;
