import { makeExecutableSchema, } from 'graphql-tools';
import resolvers from './resolvers';
// Query/Mutation root level. Always needed. !is equiv to required

const typeDefs = `

type User {
  username: String!
  password: String!
  firstName: String!
  lastName: String!
  questions: JSON!
}

scalar JSON 

type authPayload {
  user: User!
  authToken: String!
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
    username: String!
    password: String!
    firstName: String!
    lastName: String!
    questions: JSON
  ): authPayload

  updateQuestionOrder(
    id:ID!
    answer: String!
  ): Boolean!
}

`;

const schema = makeExecutableSchema({ typeDefs, resolvers, });

export default schema;
