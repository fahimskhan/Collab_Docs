import path from 'path';
import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import bodyParser from 'body-parser';
import models from './models/models';
import auth from './routes/auth';
import document from './routes/socket_api';
import socketIO from 'socket.io';

const app = express();
const server = http.Server(app);

import mongoose from 'mongoose';
mongoose.connect(process.env.MONGODB_URI);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(session({
  secret: process.env.SECRET
}));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  models.User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(function(username, password, done) {
    models.User.findOne({ username: username }, function (err, user) {
      if (err) {
        console.log(err);
        return done(err);
      }
      if (!user) {
        console.log(user);
        return done(null, false);
      }
      if (user.password !== password) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));


app.use(passport.initialize());
app.use(passport.session());

app.use('/', auth(passport));


const io = socketIO(server)
server.listen(process.env.PORT || 3000);
io.on('connection', function(socket) {
  document(socket);
})


console.log('Server running at port 3000');
