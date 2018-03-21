import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  firstName: { type: String, default: '', },
  lastName: { type: String, default: '', },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  questions: { type: Object, },
});

export const User = mongoose.model('User', UserSchema);
