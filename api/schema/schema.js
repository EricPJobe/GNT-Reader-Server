const graphql = require('graphql');
const Mutations = require('./mutations');
const Queries = require('./queries');

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
    query: Queries,
    mutation: Mutations
});
