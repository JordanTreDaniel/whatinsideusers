import * as express from 'express';
import User from '../models/User';
import * as passport from 'passport';
import * as crypto from 'crypto';
let router = express.Router();


let registerUser = (userObj, res) => {
            let salt = crypto.randomBytes(16);
            userObj.hash = crypto.pbkdf2Sync(userObj.hash, salt, 1000, 512, 'sha512');
            User.create(userObj, (err, results) => {
                if (err) console.log("Err creating User", err);
                res.status(200).send("All done creating user");
            });
        }
router.get('/', (req, res, next) => {
    console.log("Api method ran");
    res.json({message: "I have touched down in the api"});
});
router.post('/', (req, res, next) => {
    if (req.body.type === "register") {
        let user = req.body.user;
        registerUser(user, res);
    }
})
export default router;