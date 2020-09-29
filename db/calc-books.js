const fs = require('fs');
const { Client } = require('pg');

const client = new Client({

});
client.connect();

const keyNames =  ['Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1Corinthians', '2Corinthians', 'Galatians',
    'Ephesians', 'Philippians', 'Colossians', '1Thessalonians', '2Thessalonians', '1Timothy', '2Timothy',
    'Titus', 'Philemon', 'Hebrews', 'James', '1Peter', '2Peter', '1John', '2John', '3John', 'Jude', 'Revelation'];

function calcReferences() {
    // A C-style for loop is used, because forEach is asynchronous
    for(let i=0; i<keyNames.length; i++) {
        fs.readFile(`../../assets/${keyNames[i]}.txt`, 'utf8', (err, data) => {
            if (err) return console.log(err);
            let references = parseFile(data);
            let chapters = [];
            let verses = [];
            let chapterVerses = [];

            references.forEach(reference => {
                chapters.push(parseInt(reference.substring(2, 4)));
                verses.push(parseInt(reference.substring(4, 6)));

            });
            //console.log(verses.pop());
            chapters = Array.from([...new Set(chapters)]);
            let numChapters = Math.max(...chapters);
            verses.forEach((verse, index) => {
                if (verse > verses[index + 1] && (index + 1) !== verses.length)
                    chapterVerses.push(verse);
                if ((index + 1)  === verses.length)
                    chapterVerses.push(verse);
            });

            // console.log(`${key}: ${numChapters}`);
            // console.log(numChapters);
            // console.log(chapterVerses);

            // const insertBooks = `
            //      INSERT INTO gnt.book (book_id, book_name, num_chapters)
            //      VALUES (${i + 1}, '${keyNames[i]}', ${numChapters});`
            // client
            //     .query(insertBooks)
            //     .then(res => console.log(`${keyNames[i]} successfully written to book table`))
            //     .catch(err => console.error(err.stack));

            chapters.forEach((ch, j) => {
                const insertChapters = `
                    INSERT INTO gnt.chapter (book_number, chapter_number, num_verses)
                    VALUES (${i+1}, ${j+1}, ${chapterVerses[ch - 1]});`
                client
                    .query(insertChapters)
                    .then(res => console.log(`${keyNames[i]} ${j} successfully written to chapter table`))
                    .catch(err => console.error(err.stack));
            });
        });
    }
}

function parseFile(text) {
    let references = [];
    let words = text.split('\n');
    words.pop();
    words.forEach((line, index) => {
        const wordData = line.split(' ');
        references.push(wordData[0]);
    });
    return [...new Set(references)];
}

calcReferences();
