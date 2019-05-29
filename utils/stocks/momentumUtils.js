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
        results.forEach(result => {
            const data = result.data.data[result.data_key];
            const momentum = calcMomentum(data, 1, stat);
            momentums[result.return_key] = momentum;
        });

        // for (const result of results) {
        //     const data = result.data.data[result.data_key];
        //     //console.log(`result.data: ${util.inspect(result.data)}`);
        //     console.log(`data: ${data}`);
        //     // if (typeof data == 'undefined') {
        //     //     console.log(util.inspect(result));
        //     // }
        //     //const momentum = calcMomentum(data, 1, stat);
        //     //momentums[result.return_key] = momentum;
        // }
        //console.log(`momentums: ${JSON.stringify(momentums)}`);
        return momentums;
        //return ({msg: 'fine'});
    }
};

// [
//     {
//         _id: "5cc8c46887b0250aa6734728",
//         name: "APHA",
//         __v: 0
//     },
//     {
//         _id: "5cc8c4ab87b0250aa6734729",
//         name: "HEXO",
//         __v: 0
//     },
//     {
//         _id: "5cc8c4ce87b0250aa673472b",
//         name: "CGC",
//         __v: 0
//     },
//     {
//         _id: "5cc8c4d787b0250aa673472c",
//         name: "CVSI",
//         __v: 0
//     },
//     {
//         _id: "5cc8c4df87b0250aa673472d",
//         name: "VFF",
//         __v: 0
//     },
//     {
//         _id: "5cc8c4e987b0250aa673472e",
//         name: "TLRY",
//         __v: 0
//     },
//     {
//         _id: "5cc8c4f187b0250aa673472f",
//         name: "CBIS",
//         __v: 0
//     },
//     {
//         _id: "5cc8c4f887b0250aa6734730",
//         name: "KSHB",
//         __v: 0
//     },
//     {
//         _id: "5cc8c50187b0250aa6734731",
//         name: "ACB",
//         __v: 0
//     },
//     {
//         _id: "5cc8c54887b0250aa6734732",
//         name: "CTST",
//         __v: 0
//     },
//     {
//         _id: "5cc8c54f87b0250aa6734733",
//         name: "CRON",
//         __v: 0
//     },
//     {
//         _id: "5cc8c55787b0250aa6734734",
//         name: "GWPH",
//         __v: 0
//     },
//     {
//         _id: "5cc8c55f87b0250aa6734735",
//         name: "TRPX",
//         __v: 0
//     },
//     {
//         _id: "5cc8c56787b0250aa6734736",
//         name: "PYX",
//         __v: 0
//     },
//     {
//         _id: "5cc8c57087b0250aa6734737",
//         name: "ZYNE",
//         __v: 0
//     }
// ]