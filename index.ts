//set up express server
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './src/schema';
import {root} from './src/resolvers';

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL interface
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
});