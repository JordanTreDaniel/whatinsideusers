import * as express from 'express';
import User from '../models/User';
import * as passport from 'passport';
let LocalStrategy = require('passport-local').Strategy;
import * as crypto from 'crypto';
let router = express.Router();

router.get('/master', (req, res, next) => {
  res.json('Reached the api');
});
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("This is from the local strategy");
    User.findOne({username: username}, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!verifyPassword(user)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

export let verifyPassword = (userObj) => {
    let salt = crypto.randomBytes(16);    
    let hash = crypto.pbkdf2Sync(userObj.hash, salt, 1000, 512, 'sha512');
    if (userObj.hash === hash) {
        return true;
    }
    return false;
}
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
router.post('/', (req, res, next) => {
        let user = req.body.user;    
    if (req.body.type === "register") {
        registerUser(user, res);
    } else if (req.body.type === 'login') {
        console.log("you sent a login request", req.body);
        passport.authenticate('local', {session: false}),
          function(req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.status(200).json(req.user);
            }
        res.send("timed out");
    }
});

export default router;