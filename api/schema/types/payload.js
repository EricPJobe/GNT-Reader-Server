const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList,
} = graphql;

const Flashcard = require('./flashcard');
const Error = require('./error');

const Payload = new GraphQLObjectType({
    name: 'Payload',
    fields: () => ({
        errors: { type: GraphQLNonNull(GraphQLList(GraphQLNonNull(Error)))},
        flashcard: { type: Flashcard }
    })
});

module.exports = Payload;
