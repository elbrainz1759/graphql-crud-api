//set up express server
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { userSchema } from './src/schemas/userSchema';
import {userResolvers} from './src/resolvers/userResolvers';
import { schoolSchema } from './src/schemas/schoolSchema';
import { countrySchema } from './src/schemas/countrySchema';
import { schoolResolvers } from './src/resolvers/schoolResolvers';
import { countryResolvers } from './src/resolvers/countryResolvers';
import { roleSchema } from './src/schemas/roleSchema';
import { roleResolvers } from './src/resolvers/roleResolvers';
import { stateResolvers } from './src/resolvers/stateResolvers';
import { stateSchema } from './src/schemas/stateSchema';


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

app.use("/state", graphqlHTTP({
    schema: stateSchema, // Assuming you have a stateSchema similar to schoolSchema
    rootValue: stateResolvers, // Assuming you have stateResolvers similar to schoolResolvers
    graphiql: true, // Enable GraphiQL interface
}));

app.use("/role", graphqlHTTP({
    schema: roleSchema, // Assuming you have a roleSchema similar to schoolSchema
    rootValue: roleResolvers, // Assuming you have roleResolvers similar to schoolResolvers
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