const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLInt
} = graphql;

const Flashcard = new GraphQLObjectType({
    name: 'Flashcard',
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

module.exports = Flashcard;
