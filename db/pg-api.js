const pgClient = require('./pg-client');
const sqls = require('./sqls');

const pgApiWrapper = async () => {
    const { pgPool } = await pgClient();
    const pgQuery = (text, params = {}) =>
        pgPool.query(text, Object.values(params));

    return {
        book: async (bookId) => {
            const pgResp = await pgQuery(sqls.book, {$1: bookId});
            console.log(pgResp);
            return pgResp.rows;
        },
        books: async () => {
            const pgResp = await pgQuery(sqls.books);
            console.log(pgResp);
            return pgResp.rows;
        },
        chapters: async (bookId, chapterId) => {
            const pgResp = await pgQuery(sqls.chapters, {$1: bookId, $2: chapterId});
            console.log(pgResp);
            return pgResp.rows;
        },
        words: async (referenceFrom, referenceTo) => {
            const pgResp = await pgQuery(sqls.words, {
                $1: referenceFrom,
                $2: referenceTo
            });
            return pgResp.rows;
        },
        flashcard: async (id) => {
            const pgResp = await pgQuery(sqls.flashcard, {
                $1: id
            });
            return pgResp.rows;
        },
        flashcards: async () => {
            const pgResp = await pgQuery(sqls.flashcards);
            return pgResp.rows;
        },

        mutators: {
            createFlashcard: async (flashcard) => {
                console.log(flashcard)
                const payload = { errors: [] };
                const pgResp = await pgQuery(sqls.createFlashcard, {
                    $1: flashcard.pos,
                    $2: flashcard.parsing,
                    $3: flashcard.word,
                    $4: flashcard.lemma,
                    $5: flashcard.gloss,
                    $6: flashcard.isActive,
                    $7: flashcard.levelLearned,
                });
                if (pgResp.rows[0]) {
                    payload.flashcard = pgResp.rows[0]
                } else {
                    payload.errors.push({ message: "Error creating flashcard" });
                }
                return payload;
            },
            updateFlashcard: async (flashcard) => {
                const payload = { errors: [] };
                const pgResp = await pgQuery(sqls.updateFlashcard, {
                    $1: flashcard.id,
                    $2: flashcard.pos,
                    $3: flashcard.parsing,
                    $4: flashcard.word,
                    $5: flashcard.lemma,
                    $6: flashcard.gloss,
                    $7: flashcard.isActive,
                    $8: flashcard.levelLearned,
                });
                console.log(pgResp);
                if (pgResp.rows[0]) {
                    payload.flashcard = pgResp.rows[0]
                } else {
                    payload.errors.push({ message: "Error updating flashcard" });
                }
                return payload;
            },
            deleteFlashcard: async (id) => {
                const payload = { errors: [] };
                try {
                    const pgResp = await pgQuery(sqls.deleteFlashcard, {
                        $1: id
                    });
                    payload.deletedFlashcardId = id;
                    console.log(payload);
                } catch (err) {
                    payload.errors.push({ message: "Error deleting flashcard" });
                }

                return payload;
            }
        }
    };
};

module.exports = pgApiWrapper;

