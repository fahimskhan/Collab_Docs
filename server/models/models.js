import mongoose from 'mongoose';

const connect = process.env.MONGODB_URI;
mongoose.connect(connect);

const userSchema = mongoose.Schema({
  //_id: Schema.Types.ObjectId,
  // name: {
  //   type: String,
  //   required: true
  // },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

// const documentSchema = mongoose.Schema({ //zzzz something wrong here!
//   name: {
//     type: String,
//     required: true
//   },
//   author: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
//   collaborators: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
// })

// Step 2: Create all of your models here, as properties.
const models = {
  User: mongoose.model('User', userSchema),
  //Document: mongoose.model('Document', documentSchema)
};

// Step 3: Export your models object
export default models;
