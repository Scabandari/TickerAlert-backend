const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const logger = require("morgan");
const cors = require('cors');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/TimeFrames');
const Ticker = require('./models/Ticker');
const passport = require("passport");
const keys = require("./config/keys");
const mongoose = require("mongoose");
const utils = require("./utils/stocks/momentumUtils");
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/userRoutes");
const momentumRouter = require("./routes/momentumRoutes");
const tickerRouter = require("./routes/tickerRoutes");
const timeFrameRouter = require("./routes/timeFrameRoutes");

const app = express();
//app.disable('etag');  //TODO workaround for 304 msg's

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
app.use("/timeframes", timeFrameRouter);

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
const base_url = 'http://localhost:4500';  // TODO prod/dev??
// todo every minute update one of the assets(Ticker)
let counter = 0;
setInterval(async () => {
    // There's a 5 per min limit on alphaVantage api
    const tickers = await Ticker.find({});
    const ticker = tickers[counter % tickers.length];

    counter += 1;
    console.log(`ticker before: ${ticker}`);
    const momentum = await utils.getMomentum(ticker.name);
    console.log(ticker.name);
    console.log(JSON.stringify(momentum));
    //TODO use own put method pls
    ticker.momentum.hr = momentum.hr;
    // console.log(`momentum.hr: ${momentum.hr}`);
    // console.log(`ticker: ${JSON.stringify(ticker)}`);
    ticker.momentum.min15 = momentum.min15;
    ticker.momentum.min5 = momentum.min5;
    ticker.momentum.min = momentum.min;
    await ticker.save();
    console.log(`ticker after: ${ticker}`);
// console.log(`This get's printed every minute`);
}, 60001);

module.exports = app;
