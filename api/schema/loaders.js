const pgApiWrapper = require('../../db/pg-api');

module.exports = new Promise((resolve, reject) => {
    const loaders = pgApiWrapper();
    resolve(loaders);
});
