const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull
} = graphql;

const Book = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        bookId: {type: GraphQLNonNull(GraphQLID)},
        bookName: {type: GraphQLNonNull(GraphQLString)},
        numChapters: {type: GraphQLInt}
    })
});

module.exports = Book;
