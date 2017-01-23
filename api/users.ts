import * as express from 'express';
import User from '../models/User';
import UserTag from '../models/Usertag';

import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as expjwt from 'express-jwt';
let jwtDecode = require('jwt-decode');
let router = express.Router();
let register = (user) => {
    user.salt = crypto.randomBytes(16);
    user.hash = crypto.pbkdf2Sync(user.hash, user.salt, 1000, 512, 'sha512');
}
let verifyPassword = (attempt, user) => {
    console.log("I am going to try ", attempt, "on", user);
    attempt = crypto.pbkdf2Sync(attempt, user.salt, 1000, 512, 'sha512');
    return (user.hash === attempt);
       
}
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

router.post('/register', (req, res, next) => {
    let user = new User();
    user.username = req.body.user.username;
    user.hash = req.body.user.hash;
    user.isAdmin = req.body.user.isAdmin;
    
    
    //validate form
    if (!user.username || !user.hash) {
      res.json({message: "Field(s) missing"});
    }

    //check for admin privileges
    if (user.isAdmin == process.env.ADMIN_KEY) {
      console.log("They're an admin now");
    } else {
      user.isAdmin = -1;
    }

    //Set the auth criteria
    //Once I figure out how to work auth I will do this.

    // register(user);
    user.salt = "Doesn't matter"

    //Create the user
    User.create(user, (err, results) => {
        //I have checks to make sure the unique fields are unique, using plugin
        if (err) {
          //Plugin will raise error if username is taken, then we send it.
          console.log("Err creating User", err);
          res.json({err: err});
        } else {
          //If there is no error raised, send back correct response.
          res.status(200).send("All done creating user");
        }
    });
});
router.post('/login', (req, res, next)=> {
    //get the info
    let form = req.body;

    //validate the info
    if(!form.username || !form.hash) {
      res.status(400).send("User name is required");
    }

    //Search for a user
    User.findOne({username: form.username}).then((user) => {
      //If we don't find one..
      if (user === null) {
        res.json({message: "Bad Login"});
      }

      //If we do, validate password
      // if (verifyPassword(form.hash, user)) {
        //use the above line once encryption is working
        if (form.hash === user.hash) {
        var myToken = jwt.sign({username: user.username}, "whatsinside");
        res.status(200).json({token: myToken});
      } else {
        res.status(400).send("Bad Login");
      }
    }).catch((err) => {
      console.log("Err logging in", err);
    })
    
});
////left off here!!
export default router;