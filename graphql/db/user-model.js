import bcrypt from 'bcryptjs';
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

UserSchema.methods.serialize = function () {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    username: this.username,
    questions: this.questions,
  };
};

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

export const User = mongoose.model('User', UserSchema);
