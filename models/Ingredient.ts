import * as mongoose from 'mongoose';

export interface IIngredient extends mongoose.Document {
    names: string[],
    foods: string[],
    definition: string,
    description: string,
    adminTags: string[],
    userTags: string[]
}

let ingredientSchema = new mongoose.Schema({
    names: {type: [String], required: true},
    foods: {type: [String], required: true, default: []},
    definition: String,
    description: String,
    adminTags: [String],
    userTags: [String]
});

export default mongoose.model<IIngredient>('Ingredient', ingredientSchema);