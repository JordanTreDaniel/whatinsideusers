import * as mongoose from 'mongoose';

export interface IIngredient extends mongoose.Document {
    names: string[],
    foods: string[],
    definition: string,
    description: string,
    healthPro: string,
    healthCon: string,
    adminTags: string[],
    userTags: string[]
}

let ingredientSchema = new mongoose.Schema({
    names: {type: [String], required: true},
    foods: {type: [String], required: true, default: []},
    definition: String,
    description: String,
    healthPro: String,
    healthCon: String,
    adminTags: [String],
    userTags: [String]
});

//This is the easiest way to make the ingredient's names field searchable.
ingredientSchema.index({names: 'text'}); 

export default mongoose.model<IIngredient>('Ingredient', ingredientSchema);