const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./api/schema/schema');
const cors = require('cors');

const root = {
    hello: () => {
        return 'Hello World';
    },
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000, () => console.log("Listening on port 4000"));
