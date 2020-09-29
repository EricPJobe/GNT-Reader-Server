const graphql = require('graphql');
const Error = require('./error');
const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
} = graphql;

const DeletePayload = new GraphQLObjectType({
    name: 'DeletePayload',
    fields: {
        errors: {
            type: GraphQLNonNull(GraphQLList( GraphQLNonNull(Error))),
        },
        deletedFlashcardId: { type: GraphQLID },
    },
});

module.exports = DeletePayload;
