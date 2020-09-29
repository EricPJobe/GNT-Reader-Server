const pg = require('pg');
const config = require('../config');

async function pgClient() {
    console.log("executing pgClient")
    const pgPool = new pg.Pool({
       connectionString: config.pgConnectionString
    });

    const client = await pgPool.connect();

    client.release();

    console.log('Connected to PostgreSQL');

    pgPool.on('error', err => {
        console.error('Unexpected PG client error', err);
        process.exit(-1);
    });

    return {
        pgPool,
        pgClose: async () => await pgPool.end()
    };
}

module.exports = pgClient;
