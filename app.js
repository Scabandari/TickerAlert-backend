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

// require('./models/User');
// require('./models/TimeFrames');

const app = express();
//app.disable('etag');  //TODO workaround for 304 msg's

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
//app.use(cors({origin: 'http://localhost:3000'}));
app.use(cors({origin: '*'}));
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


const indexRouter = require("./routes/index");
const usersRouter = require("./routes/userRoutes");
const tickerRouter = require("./routes/tickerRoutes");

app.use("/", indexRouter);

// app.use("/", indexRouter);
app.use("/users", usersRouter);

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

// const dev_url = 'http://localhost:4500';
// const prod_url = 'ec2-52-15-220-86.us-east-2.compute.amazonaws.com:4500';
// let dev = true;
// const base_url = dev ? dev_url : prod_url;

let counter = 0;
// setInterval(async () => {
//     // There's a 5 per min & 500 per day limit on alphaVantage api
//     // getMomentum() makes 2 api calls
//     const tickers = await Ticker.find({});
//     const ticker = tickers[counter % tickers.length];
//
//     counter += 1;
//     //console.log(`ticker before: ${ticker}`);
//     const momentum = await utils.getMomentum(ticker.name);
//     console.log(`ticker before: ${JSON.stringify(ticker, null, 2)}`);
//     //console.log(JSON.stringify(momentum));
//     // //TODO use own put method pls
//     Object.keys(momentum).forEach(key => {
//         // console.log(`key: ${key}`);
//         // console.log(`ticker: ${JSON.stringify(ticker, null, 2)}`);
//         // console.log(`momentum: ${JSON.stringify(momentum, null, 2)}`);
//         // console.log(`ticker.momentum[key], momentum[key]: ${ticker.momentum[key]}, ${JSON.stringify(momentum[key])}`);
//         if (key !== 'name') {
//             ticker.momentum[key].close = momentum[key].close;
//             ticker.momentum[key].volume = momentum[key].volume;
//         }
//     });
//     await ticker.save();
//     console.log(`ticker after: ${JSON.stringify(ticker, null, 2)}`);
//     console.log(`Ticker updated: ${ticker.name}`);
//  }, 360001);
// //}, 10001);


module.exports = app;
