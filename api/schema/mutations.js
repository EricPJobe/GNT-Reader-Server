const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;
const FlashcardInput = require('./types/flashcard-input');
const FlashcardUpdate = require('./types/flashcard-update');
const Payload = require('./types/payload');
const DeletePayload = require('./types/flashcard-delete-payload');

let mutators = {};

const loaders  = require('./loaders').then((res) => mutators = res.mutators);

const Mutations = new GraphQLObjectType({
   name: 'Mutation',
   fields: () => ({
       createFlashcard: {
           type: Payload,
           args: { input: {type: FlashcardInput} },
           resolve: async (parent, { input }) => {
               return await mutators.createFlashcard(input);
           }
       },
       updateFlashcard: {
           type: Payload,
           args: { input: {type: FlashcardUpdate} },
           resolve: async (parent, { input }) => {
               return await mutators.updateFlashcard(input);
           }
       },
       deleteFlashcard: {
           type: DeletePayload,
           args: { id: {type: GraphQLID} },
           resolve: async (parent, { id }) => {
               return await mutators.deleteFlashcard(id);
           }
       }
   })
});

module.exports = Mutations;
