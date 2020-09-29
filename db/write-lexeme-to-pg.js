const fs = require('fs');
const { Client } = require('pg');
//const xml = require('xml-js');
const strongsGreekDictionary = require('./strongs-greek-dictionary');

const client = new Client({
    user: 'postgres',
    host: 'gnt.cqddaut7kctg.us-east-1.rds.amazonaws.com',
    database: 'gnt',
    password: 'gntpostgres',
    port: 5432
});
client.connect();

// try {
//     let file = fs.readFileSync('../../assets/strongsgreek.xml', 'utf8');
//     let options = {ignoreComment: true, alwaysChildren: true, compact: true, trim: true};
//     let data = xml.xml2js(file, options);
//     //console.log(typeof(data));
//     writeData(data);
// } catch (err) {
//     console.error(err);
// }

// writeDataJSONVersion(strongsGreekDictionary);

function writeDataJSONVersion(data) {
   //console.log(data);
   let defs = [];
   Object.keys(data).forEach(key => {
       defs.push({
           strongs_num: key,
           lemma: data[key]['lemma'],
           translit: data[key]['translit'],
           // kjv_def: data[key]['kjv_def'],
           strongs_def: data[key]['strongs_def'],
           derivation: data[key]['derivation'],
       });
   });
   defs.forEach(def => {
       console.log(`Inserting ${def.lemma} into word table`)
       const insertQuery = `
                INSERT INTO gnt strongs (strongs_num, lemma, transliteration, derivation, strongs_def)
                VALUES ('${def.strongs_num}', '${def.lemma}', '${def.translit}', '${def.derivation}', '${def.strongs_def}');`
       client
           .query(insertQuery)
           .then(res => console.log(`${def.lemma} successfully written to strongs table`))
           .catch(err => console.error(err.stack));
   });
}

function writeDataXMLVersion(data) {
    let defs = []
    data.strongsdictionary.entries.entry.forEach(entry => {
        let word = '';
        if (entry.hasOwnProperty('strongs_def')) {
            entry.strongs_def._text = entry.strongs_def._text.toString().replace('\n', '');

            entry.greek.length > 1 ?
                word = entry.greek[0]._attributes.unicode :
                word = entry.greek._attributes.unicode;

            defs.push({
                word: word,
                definition: entry.strongs_def._text
            });
        } else if (entry.hasOwnProperty('strongs_derivation')) {
            entry.strongs_derivation._text = entry.strongs_derivation._text.toString().replace('\n', '');
            defs.push({
                word: entry.greek._attributes.unicode,
                definition: entry.strongs_derivation._text
            });
        }
    });

    defs.forEach(def => {
        console.log(`Inserting ${def.word} into gnt.word table`)
        const insertQuery = `
                INSERT INTO word_definition (word, definition)
                VALUES ('${def.word}', '${def.definition}');`
        client
            .query(insertQuery)
            .then(res => console.log(`${def.word} successfully written to word_definition table`))
            .catch(err => console.error(err.stack));
    })
}
