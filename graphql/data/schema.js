import { makeExecutableSchema, } from 'graphql-tools';

import resolvers from './resolvers';
// Query/Mutation root level. Always needed. !is equiv to required

const typeDefs = `

type QuestionData {
  question: String!
  answer: String!
  category: String!
  timesSeen: Int
  timesCorrect: Int
}

type User {
  username: String!
  password: String!
  firstName: String!
  lastName: String!
  questions: QuestionData
}

type Query {
  user(
    id:ID!
  ): User
  
  allUsers(
    username:String
  ): [User]!
}

type Mutation {
  createUser(
    username: String!,
    password: String!,
    firstName: String,
    lastName: String,
  ): ID!
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers, });

export default schema;
