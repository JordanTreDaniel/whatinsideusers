import * as mongoose from 'mongoose';
import Product from '../models/Product';
import Ingredient from '../models/Ingredient'
import * as mongodb from 'mongodb';

    class ProductClass {
    constructor(
        public name: string,
        public maker: string,
        public description: String,              
        public ingredients: string[],
        public admintags: string[],
        public usertags: string[],
        public images: string[]
    ) {
        this.name = name;
        this.maker = maker; 
        this.description = description;             
        this.ingredients = ingredients;
        this.admintags = admintags;
        this.usertags = usertags;
        this.images = images;
    }
}

    let something = new ProductClass(
        "Strawberry Preserves",
        "Smucker's",
        "All Natural strawberry jam with glass packaging",
        ['STRAWBERRIES', 'HIGH FRUCTOSE CORN SYRUP', 'CORN SYRUP', 'SUGAR', 'FRUIT PECTIN', 'CITRIC ACID'],
        ['Plant-based', 'Fruit-based', 'Spreads', 'Breakfast', 'Sweet', 'Fruit preserves', 'Jams', 'Fruit jams', 'Berry jams', 'Strawberry jams'],
        [],
        ["http://doclibrary.com/MFR26/PRD/GS1_10051500000950_PRODUCT_IMAGE_10051500000950_A1CB_JPG.JPEG"]
     );
     let careful = new ProductClass(
         "Frosted Flakes",
         "Kellogs",
         "Popular cereal made of corn and sugar",
         [ 'MILLED CORN', 'SUGAR', 'CORN AND BARLEY MALT EXTRACT', 'SALT', 'g COLOUR','BHT', 'IRON', 'NIACINAMIDE', 'THIAMINE HYDROCHLDRIDE', 'CHOLECALCIFERDL (VITAMIN D3)', 'd-CALCIUM PANTDTHENATE', 'PYRIDOXINE HYDROCHLORIDE', 'FOLIC ACID', 'BARLEY INGREDIENTS', 'MAY CDNTAIN SOY'],
         ['Plant-based', 'Cereals','Breakfast', 'potatoes'],
         [],
         ['https://images.kglobalservices.com/www.kelloggs.com/en_us/product/product_4508506/kicproductimage-121045_ff_original_2x_3dpack.png']
     );
     let trung = new ProductClass(
         "Cup Noodles Curry",
         "Nissin",
         "Instant noodles in a cup that come in various flavors",
        ['wheat flour', 'palm oil', 'salt', 'flavor enhancer E621', 'flour treatment agents (E500, E451)', 'antioxidant E306', 'acidity corrector: citric acid', 'maltodextrin', 'E631', 'Spice', 'Curry Powder 1%', 
            'Palm Oil', 'Chicken Cube', 'Carrot', 'Corn', 'Tomato Powder E631', 'wheat', 'soy', 'celery', 'glucose syrup', 'salt', 'dextrose' , 'Red pepper', 'rapeseed oil', 'onion powder', 'E451 thickener', 'hydrolysed vegetable protein', 'parsley leaves', 'anti-caking agent E551', 'milk proteins'
         ],
         ['Plant-based', 'Cereals', 'potatoes', 'Noodles', 'Instant', 'soups'],
         [],
         ['https://www.saboresmundo.com/images/nissin-cup-noodles-curry-67grms.jpg']
     );
     let yellow5 = new ProductClass(
         "Macaroni N' Cheese",
         "Big Y",
         "Low-cost macaroni and cheese in a box.",
         ["WHEAT FLOUR", 'NIACIN', 'IRON [FERROUS SULFATE]', 'THIAMIN MONONITRATE', 'RIBOFLAVIN', 'FOLIC ACID', 'DAIRY PRODUCT SOLIDS', 'BLEACHED WHEAT FLOUR', 'MILK', 'CHEESE CULTURE', 'SALT', 'ENZYMES', 'MODIFIED CORN STARCH', 'WHEY', 'CITRIC ACID', 'DISODIUM PHOSPHATE', 'YELLOW 5', 'YELLOW 6'],
         [ 'Plant-based', 'Cereals', 'potatoes', 'Pastas'],
         [],
         ['http://media.shopwell.com/gladson/00018894360155_full.jpg']
     );
     let thisorthat = new ProductClass(
         "Cool Blue Gatorade",
         "Gatorade",
         "Popular sports drink that is meant to improve athletic performance",
         ['Sodium chloride', 'sodium citrate', 'potassium phosphate', 'magnesium oxide', 'E414', 'E445', 'flavoring', 'sucralose', 'water', 'sugar', 'maltodextrin', 'Acesulfame K', 'E133'],
         ['Beverages', 'Artificially sweetened', 'Energy drinks', 'Non-sugared beverages', 'Sugared beverages'],
         [],
         ['https://taldepot.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/g/e/ge-28-15-ce.jpg']
     );
     let dank = new ProductClass(
         "Lay's Paprika Potato Chips",
         "Lay's",
         "Specialty flavor of potato chip from big chip manufacturer",
         ['Potatoes', 'vegetable oils', 'sunflower', 'rapeseed', 'wheat crumbs', 'paprika powder', 'sugar', 'fructose', 'whey powder', 'garlic', 'onion powder', 'mushroom powder', 'Potassium chloride', 'smoke flavorings', 'rice flour', 'paprika extract', 'citric acid', 'malic acid', 'salt'
],
         [ 'Salty snacks', 'Appetizers', 'Chips and fries', 'Crisps', 'Potato crisps', 'Flavored', 'Paprika crisps'],
         [],
         ['http://store.belgianshop.com/231-home_ufc/chips-lays-paprika-250g.jpg']
     );
     let bvo = new ProductClass(
         "Sun Drop",
         "Dr. Pepper Snapple Group",
         "Citrus flavored soda.",
         ['Carbonated water', 'high fructose corn syrup', 'citric acid', 'orange juice concentrate', 'natural flavor', 'sodium benzoate', 'caffeine', 'acacia gum', 'yellow 5', 'glycerol ester of wood rosin', 'brominated vegetable oil'],
         ['Beverages', 'Carbonated', 'Sodas', 'Sugared beverages'],
         [],
         ['http://www.addictedtosaving.com/wp-content/uploads/2011/07/sun-drop.jpg']
     )
     let cancer = new ProductClass(
         'Rice Chex',
         'General Mills',
         'Plain rice cereal, popular in America.',
         ['Whole Grain Rice', 'Rice', 'Sugar', 'Salt', 'Molasses', 'Vitamin E', 'mixed tocopherols', 'BHT', 'Calcium Carbonate', 'Iron', 'Zinc', 'sodium ascorbic', 'niacinamide', 'pyridoxine hydrochloride', 'riboflavin', 'thiamin mononitrate', 'palmitate', 'folic acid', 'Vitamin B12', 'Vitamin D3'],
         [ 'Plant-based', 'Breakfasts',' Cereals and potatoes', 'Cereals'],
         [],
         ['https://images-na.ssl-images-amazon.com/images/I/51JXYOJn6SL.jpg']
     )
    let products = [something, careful, trung, yellow5, thisorthat, bvo, cancer, dank];
     

export default class ProductDatabase {
    public static connect() {

        mongoose.connect(process.env.PRODUCTS_URI).then(() => {

            
            // mongoose.connection.db.dropDatabase().then(() => {
            //     Product.create(products).then(()=> {
            //         console.log("Products created");
            //     }).catch((err) => {
            //         console.log("Err seeding db", err);
            //     });
            // }).catch((err) => {
            //     console.log("Err dropping db", err);
            // });


            // Ingredient.create({
            //     names: ['anthrax', 'poison'],
            //     foods: ['Really dumb mistake'],
            //     definition: "Very bad poison",
            //     description: "I can't really describe it",
            //     adminTags: ["poison", "avoid"],
            //     userTags: ["cool", "dumb"]
            // }).then((r) => {
            //     console.log("ingredient seeded", r);
            // }).catch((err) => {
            //     console.log("Error seeding ing", err);
            // })


            console.log("product Database connected");
        }).catch((err) => {
            console.log("Err connecting", err);
        });
    } 
}