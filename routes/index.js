const express = require("express");
//const mongoose = require("mongoose");
const router = express.Router();
const passport = require("passport");
const env = require("../config/env");


/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { title: "Express" });
});

/* GET Google Authentication API. */
router.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
	"/auth/google/callback",
	// passport.authenticate("google", { failureRedirect: "/", session: false }),
    passport.authenticate("google", { failureRedirect: "/"}),
    function(req, res) {
        const url = env.dev_mode ? env.front_url_dev : env.front_url_prod;
        //res.redirect(`${url}/momentum?user_id=${req.user._id}`);
        // res.redirect(`http://localhost:3000/momentum?user_id=${req.user._id}`);
        res.redirect(`${url}/momentum?user_id=${req.user._id}`);

    }
);

router.get("/auth/google/logout", (req, res) => {
    const url = env.dev_mode ? env.front_url_dev : env.front_url_prod;
    req.logout();
    // res.redirect("http://localhost:3000/logout")
    //res.redirect(`${url}/logout`);
    res.redirect(url);

});

module.exports = router;
