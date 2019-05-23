const axios = require('axios');
//const util = require('util');
const constants = require('../../constants/momentumConstants');
const keys = require('../../config/keys');
const api_key = keys.alphaVantageKey;
const api_endpoint = keys.alphaVantageEndpoint;

const {MONTHLY, WEEKLY, DAILY, HOURLY,
    ONE_MIN, FIVE_MIN, FIFTEEN_MIN,
    INTRA_DAY, RETURN_5MIN, RETURN_1MIN,
    CLOSE, VOLUME, RETURN_15MIN, RETURN_60MIN} = constants;

const timeframe_params = {
    // MONTHLY: MONTHLY,
    // WEEKLY: WEEKLY,
    // DAILY: DAILY,
    hour: {
        function: INTRA_DAY,
        interval: HOURLY,
        time_steps: 1,
        response_key: RETURN_60MIN
    },
    one_min: {
        function: INTRA_DAY,
        interval: ONE_MIN,
        time_steps: 1,
        response_key: RETURN_1MIN
    },
    five_min: {
        function: INTRA_DAY,
        interval: FIVE_MIN,
        time_steps: 1,
        response_key: RETURN_5MIN,
    },
    fifteen_min: {
        function: INTRA_DAY,
        interval: FIFTEEN_MIN,
        time_steps: 1,
        response_key: RETURN_15MIN,
    },
};

const calcMomentum = (data, time_steps, stat) => {
    const ohlcv = stat === 'close' ? CLOSE : VOLUME;
    const obj_keys = Object.keys(data);
    const key1 = obj_keys[0];
    const key2 = obj_keys[time_steps];
    // const key2 = obj_keys[1];
    // const key3 = obj_keys[2];
    // const key4 = obj_keys[3];

    console.log(`data[key1]: ${data[key1][ohlcv]} data[key2]: ${data[key2][ohlcv]}`);
    //console.log(`key1, key2, key3, key4: ${key1}, ${key2}, ${key3}, ${key4}`);
    obj_keys.forEach((entry) => {
        console.log(entry);
    });

    return data[key1][ohlcv]/data[key2][ohlcv];
};

module.exports = {
    async getMomentum (symbol, interval, stat='close')  {
        //console.log(`constants.DAILY: ${constants.DAILY}`);
        try {
            const timeframe = timeframe_params[interval];
            const response = await axios.get(`${api_endpoint}function=${timeframe.function}&symbol=${symbol}&interval=${timeframe.interval}&apikey=${api_key}`);
            //console.log(`response: ${util.inspect(response)}`);
            const data = response.data[timeframe.response_key];
            //console.log(`data: ${data}`);
            const momentum = calcMomentum(data, timeframe.time_steps, stat);
            console.log(`momentum: ${momentum}`);
            return momentum;
            //return 5;
        } catch (err) {
            console.log(`Error in getMomentum: ${err}`);
        }
    }
};