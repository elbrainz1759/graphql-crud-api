import express from 'express';
import { Request, Response } from 'express';
import { graphqlHTTP, GraphQLParams } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { IncomingMessage, ServerResponse } from "http";

import { countryType } from './src/types/countryType';
import { schoolType } from './src/types/schoolType';
import { stateType } from './src/types/stateType';
import { roleType } from './src/types/roleType';
import { userType } from './src/types/userType';

import { countryResolvers } from './src/resolvers/countryResolvers';
import { schoolResolvers } from './src/resolvers/schoolResolvers';
import { stateResolvers } from './src/resolvers/stateResolvers';
import { roleResolvers } from './src/resolvers/roleResolvers';
import { userResolvers } from './src/resolvers/userResolvers';
import { getLoggedInUser } from './src/middleware/isLoggedIn';
import { authType } from './src/types/auth';
import { authResolvers } from './src/resolvers/authResolvers';
import { db } from './src/startup/mysql';

const typeDefs = [
    countryType,
    schoolType,
    stateType,
    roleType,
    userType,
    authType
];

const resolvers = [
    countryResolvers,
    schoolResolvers,
    stateResolvers,
    roleResolvers,
    userResolvers,
    authResolvers
];

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

app.use("/graphql", graphqlHTTP(
    (req: IncomingMessage, res: ServerResponse, params?: GraphQLParams) => {
        const user = getLoggedInUser(req);

        return {
            schema,
            graphiql: true,
            context: {
                user,
                db,
            },
        };
    }
));

app.get('/', (req, res) => {
    res.send('Unified GraphQL API is running.');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
});
