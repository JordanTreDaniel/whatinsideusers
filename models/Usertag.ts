import * as mongoose from 'mongoose';
import * as unique from 'mongoose-unique-validator';

export interface IUserTag extends mongoose.Document {
    badProducts:string[],
    favProducts:string[],
    badIngredients:string[],
    favIngredients:string[],
    owner:string
    
}
let tagSchema = new mongoose.Schema({
    badProducts: {
        type:[String],
        default:[]
    },
    favProducts: {
        type:[String],
        default:[]
    },
    badIngredients: {
        type:[String],
        default: [],
    },
    favIngredients: {
        type: [String],
        default: []
    },
    owner: {
        type: String,
        required: true,
        unique: true
    }
});

tagSchema.plugin(unique);
export default mongoose.model<IUserTag>('UserTag', tagSchema);
