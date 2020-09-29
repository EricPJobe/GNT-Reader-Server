const dotenv = require('dotenv');

dotenv.config();

const config = {
    isDev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT,
    pgConnectionString: process.env.PG_CONNECTION_STRING
}

module.exports = config;

