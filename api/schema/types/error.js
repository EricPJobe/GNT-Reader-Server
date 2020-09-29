const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} = graphql;

const Error = new GraphQLObjectType({
    name: 'Error',
    fields: () => ({
        message: {
            type: GraphQLNonNull(GraphQLString),
        }
    })
});

module.exports = Error;
