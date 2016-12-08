import * as mongoose from 'mongoose';

export interface IIngredient extends mongoose.Document {
    name: string,
    foods: string[],
    definition: string,
    organic: boolean,
    adminTags: string[],
    userTags: string[]
}

let ingredientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    foods: {type: [String], required: true, default: []},
    definition: String,
    organic: Boolean,
    adminTags: [String],
    userTags: [String]
});

export default mongoose.model<IIngredient>('Ingredient', ingredientSchema);