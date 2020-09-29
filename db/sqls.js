sqls = {
     createWordTable: `
        CREATE TABLE gntword (
            id SERIAL PRIMARY KEY,
            reference varchar(6),
            pos varchar(2),
            parsing varchar(8),
            text varchar,
            word varchar,
            normalized varchar,
            lemma varchar,
            gloss varchar
        );`,

     createFlashcardTable: `
          CREATE TABLE gnt.flashcard (
               id serial PRIMARY KEY,
               pos varchar,
               parsing varchar,
               word varchar,
               lemma varchar,
               gloss varchar,
               isActive boolean,
               levelLearned integer
          );
     `,

     createLexemeTable: `
        CREATE TABLE strongs (
            strongs_num varchar,
            lemma varchar,
            transliteration varchar,
            derivation varchar,
            strongs_def varchar
        );`,

     createBookTable: `
        CREATE TABLE book (
            book_id serial,
            name varchar,
            num_chapters int,
            CONSTRAINT book_key PRIMARY KEY (book_id)
        );`,

     createChapterTable: `
        CREATE TABLE chapter (
            chapter_id serial,
            book_id int REFERENCES book (book_id),
            num_verses int,
            CONSTRAINT chapter_key PRIMARY KEY (chapter_id)
        );`,

     book: `
          SELECT book_id AS "bookId", book_name AS "bookName", num_chapters AS "numChapters" 
          FROM gnt.book
          WHERE book_id = ($1)
          ORDER By book_id ASC;
     `,
     books: `
          SELECT book_id AS "bookId", book_name AS "bookName", num_chapters AS "numChapters" 
          FROM gnt.book
          ORDER By book_id ASC;
     `,
     chapters: `
          SELECT chapter_id AS "chapterID", chapter_number AS "chapterNumber", book_number AS "bookNumber", num_verses AS "numVerses"
          FROM gnt.chapter
          WHERE book_number = ($1) AND chapter_number = ($2)
          ORDER BY chapter_number ASC;
     `,
     words: `
          SELECT * FROM gnt.word
          WHERE CAST(reference AS int) >= ($1)
          AND CAST(reference AS int) <= ($2)
     `,
     flashcard: `
          SELECT id, pos, parsing, word, lemma, gloss, is_active AS "isActive", level_learned AS "levelLearned" FROM gnt.flashcard
          WHERE id = $1;
     `,
     flashcards: `
          SELECT * FROM gnt.flashcard
          ORDER BY word ASC; 
     `,
     createFlashcard: `
          INSERT INTO gnt.flashcard (pos, parsing, word, lemma, gloss, is_active, level_learned)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING id, pos, word, lemma, gloss, is_active AS isActive, level_learned AS levelLearned;
     `,
     updateFlashcard: `
          UPDATE gnt.flashcard
          SET pos = $2,
          parsing = $3,
          word = $4,
          lemma = $5,
          gloss = $6,
          is_active = $7,
          level_learned = $8
          WHERE id = $1
          RETURNING id, pos, word, lemma, gloss, is_active AS isActive, level_learned AS levelLearned;
     `,
     deleteFlashcard: `
          DELETE FROM gnt.flashcard
          WHERE id = $1
          RETURNING id;
     `
}

module.exports = sqls;
