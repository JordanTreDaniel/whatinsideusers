import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as crypto from 'crypto';

export interface IUser extends mongoose.Document {
    username:string,
    hash:string,
    registerUser(user:Object),
    loginUser(user:Object)
}

let userSchema = new mongoose.Schema({
    username: {
        required:true,
        type:String
    },
    hash: {
        required:true,
        type:String
    }
});
userSchema.methods.registerUser = (userObj, res) => {
    let salt = crypto.randomBytes(16);
    this.hash = crypto.pbkdf2Sync(this.hash, salt, 1000, 512, 'sha512');
    this.create(userObj, (err, results) => {
        if (err) console.log("Err creating User", err);
        res.status(200).send("All done creating user");
    });
}

export default mongoose.model<IUser>('User', userSchema);
