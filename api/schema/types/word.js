const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull
} = graphql;

const Word = new GraphQLObjectType({
    name: 'Word',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLID)},
        reference: {type: GraphQLString},
        pos: {type: GraphQLString},
        parsing: {type: GraphQLString},
        text: {type: GraphQLString},
        word: {type: GraphQLString},
        normalized: {type: GraphQLString},
        lemma: {type: GraphQLString},
        gloss: {type: GraphQLString},
    })
});

module.exports = Word;
