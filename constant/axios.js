const axios = require('axios');

module.exports = axios.create({
    // baseURL: process.env.API_SERVER || 'http://arxoo-proxy'
    // baseURL: 'http://arxoo-proxy'
    baseURL: process.env.API_SERVER
});
