const graphql = require('graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
} = graphql;
const Book = require('./types/book');
const Chapter = require('./types/chapter');
const Word = require('./types/word');
const Flashcard = require('./types/flashcard');

let sqls = {};
const loaders  = require('./loaders').then((res) => {
    sqls.book = res.book;
    sqls.books = res.books;
    sqls.chapters = res.chapters;
    sqls.words = res.words;
    sqls.flashcard = res.flashcard;
    sqls.flashcards = res.flashcards;
});


const Queries = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        book: {
            type: Book,
            args: {
                bookId: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                let rows = await sqls.book(args.bookId);
                return rows[0];
            }
        },
        books: {
            type: GraphQLList(Book),
            resolve: async () => {
                return await sqls.books();
            }
        },
        chapter: {
            type: Chapter,
            args: {
                bookNumber: { type: GraphQLInt },
                chapterNumber: { type: GraphQLInt},
            },
            resolve: async (parent, args) => {
                let rows = await sqls.chapters(args.bookNumber, args.chapterNumber);
                return rows[0];
            }
        },
        words: {
            type: GraphQLList(Word),
            args: {
                referenceFrom: { type: GraphQLString },
                referenceTo: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                return await sqls.words(args.referenceFrom, args.referenceTo);
            }
        },
        flashcard: {
            type: Flashcard,
            args: {
                id: { type: GraphQLID }
            },
            resolve: async (parent, args) => {
                let rows = await sqls.flashcard(args.id);
                return rows[0];
            }
        },
        flashcards: {
            type: GraphQLList(Flashcard),
            resolve: async () => {
                return await sqls.flashcards();
            }
        },
    })
});

module.exports = Queries;
