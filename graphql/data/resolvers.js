const db= {};
const resolvers = {
  Query: {
    user: (parent, args, context, info) => {
      return db.Users[args.id];
    },
    allUsers: (parent, args, context, info) => {
      // ES6 obj to arr
      // Return Object.values(db.Users);
      // Array of objs
      // Filter where username = args
      return Object.values(db.Users).filter((user) => {
        // Users passes empty string
        if (!args.username ) {
          return true;
        }
        return user.username === args.username;
      });
    },
  },
  // Npm uuid
  Mutation: {
    createUser: (parent, args, context, info) => {
      // Db.Users
    },
  },
};

export default resolvers;
