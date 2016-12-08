import * as mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
    name: string,    
    description: String,
    maker: String,    
    ingredients: string[],
    admintags: string[],
    usertags: string[],
    images: string[]
}
let productSchema = new mongoose.Schema({
    name: {type: String, required: true, default: []},   
    description: {type: String, required: false},
    maker: String,     
    ingredients: {type: [String], required: true, default: []},
    admintags: {type: [String], required: true, default: []},
    usertags: {type: [String], required: false, default: []},
    //this is only false because it would error out telling me that it is required if i try to init it to empty array
    images: {type: [String], required: true, default: []}
});

export default mongoose.model<IProduct>("Product", productSchema);

