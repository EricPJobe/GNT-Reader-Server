const graphql = require('graphql');

const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInt
} = graphql;

const FlashcardUpdate = new GraphQLInputObjectType({
    name: 'FlashcardUpdate',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        pos: {type: GraphQLString},
        parsing: {type: GraphQLString},
        word: {type: GraphQLString},
        lemma: {type: GraphQLString},
        gloss: {type: GraphQLString},
        isActive: {type: GraphQLBoolean},
        levelLearned: {type: GraphQLInt}
    })
});

module.exports = FlashcardUpdate;
