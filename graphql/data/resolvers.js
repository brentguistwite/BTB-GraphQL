import { User, } from './../db/user-model';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const resolvers = {
  Query: {
    user: (parent, args, context, info) => {
    },
    allUsers: async (parent, args, context, info) => {
      try {
        const users = await User.find();
        return users;
      }
      catch(e) {
        console.error(e);
      }

      // return User
      //   .find()
      //   .then(users => users)
      //   .catch((err) => {
      //     console.error(err);
      //   });


      // ES6 obj to arr
      // Return Object.values(db.Users);
      // Array of objs
      // Filter where username = args
      // Return Object.values(db.Users).filter((user) => {
      //   If (!args.username ) {
      //     Return true;
      //   }
      //   Return user.username === args.username;
      // });
    },
  },
  Mutation: {
    createUser: (parent, args, context, info) => {
      // Db.Users
    },
  },
};

export default resolvers;

// Router.post('/', (req, res) => {
//   Const requiredFields = ['username', 'password', 'firstName', 'lastName',];
//   Const missingField = requiredFields.find(field => !(field in req.body));
//   // Our base set of questions/answers with default values
//   Const baseList = new LinkedList();
//   Data.forEach(item => baseList.insertLast(item));

//   If (missingField) {
//     Return res.status(422).json({
//       Code: 422,
//       Reason: 'ValidationError',
//       Message: 'Missing field',
//       Location: missingField,
//     });
//   }

//   Const stringFields = ['username', 'password', 'firstName', 'lastName',];
//   Const nonStringField = stringFields.find(
//     Field => field in req.body && typeof req.body[field] !== 'string'
//   );

//   If (nonStringField) {
//     Return res.status(422).json({
//       Code: 422,
//       Reason: 'ValidationError',
//       Message: 'Incorrect field type: expected string',
//       Location: nonStringField,
//     });
//   }

//   /*
//   If the username and password aren't trimmed we give an error.
//   We'll silently trim the other fields, because they aren't credentials
//   Used to log in, so it's less of a problem.
//   */
//   Const explicityTrimmedFields = ['username', 'password',];
//   Const nonTrimmedField = explicityTrimmedFields.find(
//     Field => req.body[field].trim() !== req.body[field]
//   );

//   If (nonTrimmedField) {
//     Return res.status(422).json({
//       Code: 422,
//       Reason: 'ValidationError',
//       Message: 'Cannot start or end with whitespace',
//       Location: nonTrimmedField,
//     });
//   }

//   Const sizedFields = {
//     Username: {
//       Min: 1,
//       Max: 15,
//     },
//     Password: {
//       Min: 8,
//       // Bcrypt truncates after 72 characters
//       Max: 72,
//     },
//   };
//   Const tooSmallField = Object.keys(sizedFields).find(
//     Field =>
//       'min' in sizedFields[field] &&
//       Req.body[field].trim().length < sizedFields[field].min
//   );
//   Const tooLargeField = Object.keys(sizedFields).find(
//     Field =>
//       'max' in sizedFields[field] &&
//       Req.body[field].trim().length > sizedFields[field].max
//   );

//   If (tooSmallField || tooLargeField) {
//     Return res.status(422).json({
//       Code: 422,
//       Reason: 'ValidationError',
//       Message: tooSmallField
//         ? `Must be at least ${sizedFields[tooSmallField]
//           .min} characters long`
//         : `Must be at most ${sizedFields[tooLargeField]
//           .max} characters long`,
//       Location: tooSmallField || tooLargeField,
//     });
//   }

//   Let { username, password, firstName = '', lastName = '', questions } = req.body; // eslint-disable-line
//   // Username and password come in pre-trimmed, otherwise we throw an error
//   FirstName = firstName.trim();
//   LastName = lastName.trim();

//   Return User.find({ username, })
//     .count()
//     .then((count) => {
//       If (count > 0) {
//         // There is an existing user with the same username
//         Return Promise.reject({
//           Code: 422,
//           Reason: 'ValidationError',
//           Message: 'Username already taken',
//           Location: 'username',
//         });
//       }
//       // If there is no existing user, hash the password
//       Return User.hashPassword(password);
//     })
//     .then((digest) => {
//       Return User.create({
//         Username,
//         Password: digest,
//         FirstName,
//         LastName,
//         Questions: baseList,
//       });
//     })
//     .then((user) => {
//       Return res.status(201).location(`/users/${user.id}`).json(user.serialize());
//     })
//     .catch((err) => {
//       If (err.reason === 'ValidationError') {
//         Return res.status(err.code).json(err);
//       }
//       Res.status(500).json({ code: 500, message: 'Internal server error', });
//     });
// });
