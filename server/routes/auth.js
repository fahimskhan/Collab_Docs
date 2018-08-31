import express from 'express';
const router = express.Router();
import models from '../models/models.js';


export default function(passport) {

  router.post('/login', passport.authenticate('local') , function(req, res) {
    res.send(req.user);
  });

  // POST registration page
  // const validateReq = function(userData) {
  //   if (!userData.username) {
  //     return "Please enter a username.";
  //   }
  //
  //   if (!userData.password) {
  //     return "Please enter a password.";
  //   }
  // };

  router.post('/signup', function(req, res) {
    // validation step
    // var error = validateReq(req.body);
    // if (error) {
    //   return res.send(error);
    // }
    const newUser = new models.User({
      username: req.body.username,
      password: req.body.password,
    });
    newUser.save()
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res.send(error);
    })
  });


  router.get('/logout', function(req, res){
    req.logout();
    res.send('logged out!'); //zzzz is this okay?
  });


    return router;
}
