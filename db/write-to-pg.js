const fs = require('fs');
const { Client } = require('pg');
const path = require("path");


const client = new Client({
    user: 'postgres',
    host: 'gnt.cqddaut7kctg.us-east-1.rds.amazonaws.com',
    database: 'gnt',
    password: 'gntpostgres',
    port: 5432
});
client.connect();

const keyNames =  ['Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1Corinthians', '2Corinthians', 'Galatians',
    'Ephesians', 'Philippians', 'Colossians', '1Thessalonians', '2Thessalonians', '1Timothy', '2Timothy',
    'Titus', 'Philemon', 'Hebrews', 'James', '1Peter', '2Peter', '1John', '2John', '3John', 'Jude', 'Revelation'];

function writeToPg() {
    keyNames.forEach(key => {
        fs.readFile(path.resolve(__dirname, `../assets/${key}.txt`), 'utf8', (err, data) => {
            if (err) return console.log(err);
            let words = [... parseFile(data)];
            console.log(words);
             words.forEach(word => {
                 console.log(`Inserting ${word.word} into word table`)
                 const insertQuery = `
                 INSERT INTO gnt.word (reference, pos, parsing, text, word, normalized, lemma)
                 VALUES ('${word.reference}', '${word.pos}', '${word.parsing}', '${word.text}', '${word.word}', '${word.normalized}', '${word.lemma}');`
                 client
                     .query(insertQuery)
                     .then(res => console.log(`${word.word} successfully written to word table`))
                     .catch(err => console.error(err.stack));
            });
        });
    });
}

function parseFile(text) {
    let wordObjects = [];
    let words = text.split('\n');
    words.pop();
    words.forEach((line, index) => {
       const wordData = line.split(' ');
       wordObjects.push({
           id: index,
           reference: wordData[0],
           pos: wordData[1],
           parsing: wordData[2],
           text: wordData[3],
           word: wordData[4],
           normalized: wordData[5],
           lemma: wordData[6],
       });
    });
    return wordObjects;
}

function updateGloss() {
    const updateQuery = `
UPDATE word
SET gloss = strongs.strongs_def
FROM strongs
WHERE word.lemma = strongs.lemma`;
}

writeToPg();
