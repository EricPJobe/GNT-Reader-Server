const { Client } = require('pg');
const queries = require('./sqls')

const client = new Client({

});
client.connect();

client
    .query('DROP TABLE word')
    .then((res) => console.log('Dropping word table'))
    .catch((err) => console.error(err.stack));

client
    .query('DROP TABLE lexeme')
    .then((res) => console.log('Dropping lexeme table'))
    .catch((err) => console.error(err.stack));

client
    .query('DROP TABLE book')
    .then((res) => console.log('Dropping book table'))
    .catch((err) => console.error(err.stack));

client
    .query('DROP TABLE chapter')
    .then((res) => console.log('Dropping chapter table'))
    .catch((err) => console.error(err.stack));

console.log("Creating word table...");
client
    .query(queries.createWordTable)
    .then(res => console.log("Table successfully created"))
    .catch(err => console.error(err.stack));

console.log("Creating lexeme table...");
client
    .query(queries.createLexemeTable)
    .then(res => console.log("Table successfully created"))
    .catch(err => console.error(err.stack));

console.log("Creating book table...");
client
    .query(queries.createBookTable)
    .then(res => console.log("Table successfully created"))
    .catch(err => console.error(err.stack));

console.log("Creating chapter table...");
client
    .query(queries.createChapterTable)
    .then(res => console.log("Table successfully created"))
    .catch(err => console.error(err.stack));


