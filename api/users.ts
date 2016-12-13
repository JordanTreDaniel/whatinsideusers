import * as express from 'express';
import User from '../models/User';
import * as passport from 'passport';
let LocalStrategy = require('passport-local').Strategy;
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as expjwt from 'express-jwt';
let router = express.Router();

router.get('/master', (req, res, next) => {
  res.json('Reached the api');
});

let registerUser = (userObj, res) => {
    let salt = crypto.randomBytes(16);
    userObj.hash = crypto.pbkdf2Sync(userObj.hash, salt, 1000, 512, 'sha512');
    User.create(userObj, (err, results) => {
        if (err) console.log("Err creating User", err);
        res.status(200).send("All done creating user");
    });
}

// router.get('/', (req, res, next) => {
//     console.log("Api method ran");
//     res.json({message: "I have touched down in the api"});
// });
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