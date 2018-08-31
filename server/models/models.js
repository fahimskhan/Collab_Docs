import mongoose from 'mongoose';

const connect = process.env.MONGODB_URI;
mongoose.connect(connect);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const documentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  collaborators: [{
    type: String,
  }],
})

const models = {
  User: mongoose.model('User', userSchema),
  Document: mongoose.model('Document', documentSchema)
};

export default models;
