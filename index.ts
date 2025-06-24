//set up express server
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { userSchema } from './src/schemas/userSchema';
import {userResolvers} from './src/resolvers/userResolvers';
import { schoolSchema } from './src/schemas/schoolSchema';
import { countrySchema } from './src/schemas/countrySchema';
import { schoolResolvers } from './src/resolvers/schoolResolvers';
import { countryResolvers } from './src/resolvers/countryResolvers';

const app = express();


app.use('/user', graphqlHTTP({
    schema: userSchema,
    rootValue: userResolvers,
    graphiql: true, // Enable GraphiQL interface
}));

app.use('/school', graphqlHTTP({
    schema: schoolSchema,
    rootValue: schoolResolvers,
    graphiql: true, // Enable GraphiQL interface
}));

app.use('/country', graphqlHTTP({
    schema: countrySchema,
    rootValue: countryResolvers,
    graphiql: true, // Enable GraphiQL interface
}));

// route for user operations
app.get('/', (req, res) => {
    res.send('Welcome to the User Management API. Running on GraphQL.');
});

// Start the server
// The server listens on the port specified in the environment variable PORT or defaults to 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
});