const express = require("express");
//const mongoose = require("mongoose");
const router = express.Router();
const passport = require("passport");


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
		// const token = req.user.token;
		// console.log(`req.user.token: ${token}`);
        // console.log(`req.user: ${req.user}`);
        // res.redirect("http://localhost:3000/home?token=" + token);

        // res.redirect("http://localhost:3000/home");
        res.redirect(`http://localhost:3000/momentum?user_id=${req.user._id}`);

    }
);

router.get("/auth/google/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000/logout")
});

module.exports = router;
