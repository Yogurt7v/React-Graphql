import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const mockUsers = [
  { id: '1', name: 'Alexander', age: 33, isMarried: true },
  { id: '2', name: 'Max', age: 35, isMarried: false },
  { id: '3', name: 'Dan', age: 20, isMarried: false },
];

const typeDefs = `
  type Query {
      getUsers: [User]
      getUserById(id: ID): User
  }

  type Mutation {
    createUser(name: String!, age: Number!, isMarried: Boolean): User
  }

  type User {
    id: ID!
    name: String!
    age: Integer!
    isMarried: Boolean
  }
`;

const resolvers = {
  Query: {
    getUsers: () => {
      return mockUsers;
    },

    getUserById: (parent, args) => {
      return mockUsers.find((user) => user.id == args.id);
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      mockUsers.push({
        id: (mockUsers.length() + 1).toString(),
        name: args.name,
        age: args.age,
        isMarried: args.isMarried,
      });
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log(`Сервер Аполло поднялся по адресу ${url}`);
