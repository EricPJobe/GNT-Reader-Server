const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull
} = graphql;

const Chapter = new GraphQLObjectType({
    name: 'Chapter',
    fields: () => ({
        bookNumber: {type: GraphQLNonNull(GraphQLInt)},
        chapterId: {type: GraphQLNonNull(GraphQLID)},
        chapterNumber: {type: GraphQLNonNull(GraphQLInt)},
        numVerses: {type:  GraphQLInt}
    })
});

module.exports = Chapter;
