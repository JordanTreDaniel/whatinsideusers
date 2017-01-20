import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as crypto from 'crypto';
import * as unique from 'mongoose-unique-validator';
export interface IUser extends mongoose.Document {
    username:string,
    hash:string,
    toAvoid:string[],
    favProducts:string[],
    isAdmin:number,
    registerUser(user:Object),
    loginUser(user:Object)
}

let userSchema = new mongoose.Schema({
    username: {
        required:true,
        type:String,
        unique: true
    },
    hash: {
        required:true,
        type:String
    },
    toAvoid: {
        type:[String],
        default:[]
    },
    favProducts: {
        type:[String],
        default:[]
    },
    isAdmin: {
        type:Number,
        required:true,
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
userSchema.methods.verifyPassword = (attempt) => {
    if (this.hash === attempt) {
        return true;
    } else {
        return false;
    }
}
userSchema.plugin(unique);
export default mongoose.model<IUser>('User', userSchema);
