import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
  type Query {
      getUsers: [User]
      getUserById(id: ID): User
  }

  type Mutation {
  
  }

  type User {
    id: ID!
    name: String!
    age: Integer!
    isMarried: Boolean
  }
`;

const resolvers = {};

const server = new ApolloServer({});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log(`Сервер Аполло поднялся по адресу ${url}`);
