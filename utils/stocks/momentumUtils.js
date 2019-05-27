const axios = require('axios');
const util = require('util');
const constants = require('../../constants/momentumConstants');
const keys = require('../../config/keys');
const api_key = keys.alphaVantageKey;
const api_endpoint = keys.alphaVantageEndpoint;

const {INTRA_DAY, DATA_KEY_5MIN, DATA_KEY_1MIN,
    CLOSE, VOLUME, DATA_KEY_15MIN, DATA_KEY_60MIN} = constants;

const calcMomentum = (data, time_steps, stat) => {
    const ohlcv = stat === 'close' ? CLOSE : VOLUME;
    const obj_keys = Object.keys(data);
    const key1 = obj_keys[0];
    const key2 = obj_keys[time_steps];
    const fraction = Number(data[key1][ohlcv])/Number(data[key2][ohlcv]);
    const percent = ((fraction - 1) * 100).toFixed(2);
    return percent;
};

module.exports = {
 //   async getMomentum (symbol, interval, stat='close')  {
        //const intervals = ['hour', 'one_min', 'five_min', 'fifteen_min'];
    async getMomentum (symbol, stat='close')  {
        const [hour, min15, min5, min] = await Promise.all([
            axios.get(`${api_endpoint}function=${INTRA_DAY}&symbol=${symbol}&interval=60min&apikey=${api_key}`),
            axios.get(`${api_endpoint}function=${INTRA_DAY}&symbol=${symbol}&interval=15min&apikey=${api_key}`),
            axios.get(`${api_endpoint}function=${INTRA_DAY}&symbol=${symbol}&interval=5min&apikey=${api_key}`),
            axios.get(`${api_endpoint}function=${INTRA_DAY}&symbol=${symbol}&interval=1min&apikey=${api_key}`),
        ]);
        const results = [
            {data_key: DATA_KEY_60MIN, data: hour, return_key: 'hr'},
            {data_key: DATA_KEY_15MIN, data: min15, return_key: 'min15'},
            {data_key: DATA_KEY_5MIN, data: min5, return_key: 'min5'},
            {data_key: DATA_KEY_1MIN, data: min, return_key: 'min'}
        ];
        const momentums = {name: symbol};
        // results.forEach(result => {
        //     const data = result.data.data[result.data_key];
        //     const momentum = calcMomentum(data, 1, stat);
        //     momentums[result.return_key] = momentum;
        // });

        for (const result of results) {
            const data = result.data.data[result.data_key];
            const momentum = calcMomentum(data, 1, stat);
            momentums[result.return_key] = momentum;
        }
        console.log(`momentums: ${JSON.stringify(momentums)}`);
        return momentums;
    }
};