import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql(`
 type Book {
   id: ID!
   title: String!
   author: String!
 }
 type Query {
   status: String!
   books: [Book]
   book(id: ID!): Book
   numberSeven: Int!
 }
`);

const books = [
  {
    id: 1,
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    id: 2,
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    status: () => 'All systems are well',
    books: () => books,
    book: (parent, args, context, info) => books.find((book) => book.id === args.id),
    numberSeven: () => 7,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
