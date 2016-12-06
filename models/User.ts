import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as crypto from 'crypto';
export interface IUser extends mongoose.Document {
    username:string,
    hash:string,
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
  
export default mongoose.model<IUser>('User', userSchema);


// }