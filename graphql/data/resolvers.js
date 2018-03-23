import { User, } from './../db/user-model';
import mongoose from 'mongoose';
import GraphQLJSON from 'graphql-type-json';
import jwt from 'jsonwebtoken';

import config from './../config';
import LinkedList from './../../algorithm/linked-list';
import data from './../../questions/questions'
import algorithm from './../../algorithm/spaced-rep-alg';
mongoose.Promise = global.Promise;

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    // Grab question data for next question up
    user: async (parent, args, context, info) => {
      try {
        return await User.findById(args.id);
      }

      catch(e) {
        console.error(e);
      }

    },
    allUsers: async (parent, args, context, info) => { 
      try {
        return await User.find();
      }
      catch(e) {
        console.error(e);
      }
    },
  },
  Mutation: {
    updateQuestionOrder: async (parent, args, context, info) => {
      const currentUser = await User.findById(args.id);
      // Turn object back to Linked List so we can access methods
      const newQList = new LinkedList(currentUser.questions)
      // Returns a bool
      const feedback = algorithm(newQList, args.answer);
      await User.update(
        { _id: args.id, },
        { questions: newQList, }
      )
      return feedback;
    }
    ,
    createUser: async (parent, args, context, info) => {

      // Our base set of questions/answers with default values
      const baseList = new LinkedList();
      data.forEach(item => baseList.insertLast(item));

      const usernameIsNotTrimmed = args.username !== args.username.trim();
      const passwordIsNotTrimmed = args.password !== args.password.trim();

      // Silently trimming fields could result in user confusion when attempting to log in.
      if (usernameIsNotTrimmed || passwordIsNotTrimmed) {
        throw new Error({
          reason: 'ValidationError',
          message: 'Cannot start or end with whitespace',
        }); 
      }
      // Bcrypt truncates after 72 character
      let wrongPasswordSize = args.password.length <= 8 && args.password.length >= 72;
      let wrongUsernameSize = args.username.length <= 1 && args.username.length >= 15;


      if (wrongUsernameSize || wrongPasswordSize) {
        throw new Error({
          reason: 'ValidationError',
          message: 'Password must be between 8-72 characters. Username must be between 1-15 characters',
        });
      }

      // Check to see if username already exists in database
      try {
        const doesUserExist = await User
        .find({ username:args.username, })
        .count();
        if (doesUserExist > 0) {
          throw new Error({
            reason: 'ValidationError',
            message: 'Username already exists',
          });
        }

        const hashedPassword = await User.hashPassword(args.password);
        const newUser = await User.create({
          username: args.username,
          password: hashedPassword,
          firstName: args.firstName,
          lastName: args.lastName,
          questions: baseList,
        });
        const user = newUser.serialize();
        const authToken = jwt.sign({ userID:user.id, }, config.JWT_SECRET, {
          subject: user.username,
          expiresIn: config.JWT_EXPIRY,
          algorithm: 'HS256',
        });
        // Private directives
        return {user, authToken}
      }

      catch(e) {
        console.error(e);
      }
    }
  }
};

export default resolvers;


// User
//   .findById(req.params.id)
//   .then((user) => {
//     const list = new LinkedList(user.questions);
//     feedback = algorithm(list, answer);
//     return list;
//   })
//   .then((list) => {
//     return User
//       .update(
        // { _id: req.params.id, },
        // { questions: list, }
//       );
//   })