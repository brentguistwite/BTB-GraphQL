// At the top with imports:
import Mongoose from 'mongoose';

// Somewhere in the middle:
Mongoose.Promise = global.Promise;

const mongo = Mongoose.connect('mongodb://localhost/views', {useMongoClient: true,});

const ViewSchema = Mongoose.Schema({
  postId: Number,
  views: Number,
});

const View = Mongoose.model('views', ViewSchema);

export { Author, Post, View, };
