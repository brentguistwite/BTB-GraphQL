import { makeExecutableSchema, } from 'graphql-tools';
import resolvers from './resolvers';
// Query/Mutation root level. Always needed. !is equiv to required

const typeDefs = `

type User {
  username: String!
  password: String!
  firstName: String!
  lastName: String!
  questions: String!
}

scalar JSON 

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
    firstName: String!,
    lastName: String!,
  ): User
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers, });

export default schema;
