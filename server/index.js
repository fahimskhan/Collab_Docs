// import http from 'http';
//
// http.createServer((req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(1337, '127.0.0.1');
//
// console.log('Server running at http://127.0.0.1:1337/');



// FROM THE SKELETON
import path from 'path';
import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
//const LocalStrategy = passportLocal.Strategy; //zzzz not sure if Strategy should be written as Strategy()
import bodyParser from 'body-parser';
import models from './models/models';
import auth from './routes/auth';
//import routes from './routes/index');

import socketIO from 'socket.io';
//import {auth, document} from './socket-api'

const app = express();
const server = http.Server(app);

import mongoose from 'mongoose';
mongoose.connect(process.env.MONGODB_URI);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Passport stuff here
app.use(session({
  secret: process.env.SECRET
}));

// Tell Passport how to set req.user
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  models.User.findById(id, function(err, user) {
    done(err, user);
  });
});


// Tell passport how to read our user models
passport.use(new LocalStrategy(function(username, password, done) {
  // Find the user with the given username
    models.User.findOne({ username: username }, function (err, user) {
      // if there's an error, finish trying to authenticate (auth failed)
      if (err) {
        console.log(err);
        return done(err);
      }
      // if no user present, auth failed
      if (!user) {
        console.log(user);
        return done(null, false);
      }
      // if passwords do not match, auth failed
      if (user.password !== password) {
        return done(null, false);
      }
      // auth has has succeeded
      return done(null, user);
    });
  }
));


app.use(passport.initialize());
app.use(passport.session());

app.use('/', auth(passport));

// app.get('/' , (req, res) => {
//   res.send('yeee');
// })
// app.use('/', routes);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


//app.listen(process.env.PORT || 3000);


const io = socketIO(server)
server.listen(process.env.PORT || 3000);
io.on('connection', function(socket) {
  socket.emit('message', {hello: "world"})
  socket.on('login', function(data, cb) {
    console.log(data);
    cb({user_id: 123});
  })
})

console.log('Server running at port 3000');
