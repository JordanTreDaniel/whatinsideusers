import * as express from 'express';
import User from '../models/User';
import * as passport from 'passport';
let LocalStrategy = require('passport-local').Strategy;
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as expjwt from 'express-jwt';
let jwtDecode = require('jwt-decode');
let router = express.Router();

let getUserFromJWT = (request) => {
    let username = request.headers['authorization'];
      username = username.substr(7);
      username = jwtDecode(username);
      username = username['username'];
      return username;
  }

router.get('/master', (req, res, next) => {  
    let username = getUserFromJWT(req);
    User.findOne({username: username}).then((results) => {
      console.log("Found the user", results);
      res.json({user: results});
    }).catch((err) => {
      console.log("Master had err fetching user", err);
    })

});

// router.get('/user', expjwt({secret: "whatsinside"}), (req, res, next) => {
//   let username = req.headers['authorization'];
//   username = username.substr(7);
//   console.log(username);
//   User.findOne({username: username}).then((user)=> {
//     res.json(user);
//   }).catch((err) => {
//     console.log("Err retrieving user", err);
//   })
// })

router.post('/register', (req, res, next) => {
    let user = req.body.user;    
    User.create(user, (err, results) => {
        if (err) console.log("Err creating User", err);
        res.status(200).send("All done creating user");
    });
});
router.post('/login', (req, res, next)=> {
    let form = req.body;
    if(!form.username) res.status(400).send("User name is required");
    if(!form.hash) res.status(400).send("User name is required");
    User.findOne({username: form.username}).then((user) => {
      if (form.hash === user.hash) {
        var myToken = jwt.sign({username: form.username}, "whatsinside");
        res.status(200).json({token: myToken});
      } else {
        res.status(400).send("The password is incorrect");
      }
    }).catch((err) => {
      console.log("Err logging in", err);
    })
    
});
////left off here!!
export default router;