const graphql = require('graphql');

const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt
} = graphql;

const FlashcardInput = new GraphQLInputObjectType({
    name: 'FlashcardInput',
    fields: () => ({
        pos: {type: GraphQLString},
        parsing: {type: GraphQLString},
        word: {type: GraphQLString},
        lemma: {type: GraphQLString},
        gloss: {type: GraphQLString},
        isActive: {type: GraphQLBoolean},
        levelLearned: {type: GraphQLInt}
    })
});

module.exports = FlashcardInput;
