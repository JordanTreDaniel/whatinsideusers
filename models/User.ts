import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as crypto from 'crypto';
import * as unique from 'mongoose-unique-validator';
export interface IUser extends mongoose.Document {
    username:string,
    hash:string,
    salt:string,
    isAdmin:number,
    register(user:Object),
    login(user:Object) 
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
    salt: {
        required:true,
        type:String
    },
    isAdmin: {
        type:Number,
        required:true,
    }
});
// userSchema.method('register', () => {
//     this.salt = crypto.randomBytes(16);
//     this.hash = crypto.pbkdf2Sync(this.hash, this.salt, 1000, 512, 'sha512');
// });
// userSchema.methods.verifyPassword = (attempt) => {
//     if (this.hash === attempt) {
//         return true;
//     } else {
//         return false;
//     }
// }
userSchema.plugin(unique);
export default mongoose.model<IUser>('User', userSchema);
