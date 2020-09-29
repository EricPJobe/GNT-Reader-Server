const { Client } = require('pg')

function connect() {
    const client = new Client({

    });
    client.connect();
}

module.exports = connect;

