const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const logger = require("morgan");
const cors = require('cors');
const bodyParser = require('body-parser');
require('./models/User');
const passport = require("passport");
const keys = require("./config/keys");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/userRoutes");
const momentumRouter = require("./routes/momentumRoutes");
const tickerRouter = require("./routes/tickerRoutes");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(cors({origin: 'http://localhost:3000'}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, "public")));


app.use(passport.initialize());
app.use(passport.session());
require("./config/passport");


app.use("/", indexRouter);

// app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/momentum", momentumRouter);
app.use("/tickers", tickerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
