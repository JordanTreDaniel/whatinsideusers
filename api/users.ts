import * as express from 'express';
import User from '../models/User';


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
      if (form.hash === user.hash) {
        var myToken = jwt.sign({username: form.username}, "whatsinside");
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