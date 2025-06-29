import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';

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

const typeDefs = [
  countryType,
  schoolType,
  stateType,
  roleType,
  userType
];

const resolvers = [
  countryResolvers,
  schoolResolvers,
  stateResolvers,
  roleResolvers,
  userResolvers
];

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.get('/', (req, res) => {
  res.send('Unified GraphQL API is running.');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
