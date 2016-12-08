import * as mongoose from 'mongoose';
import Product from '../models/product';


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
     )
    let products = [something, careful, trung];
     

export default class ProductDatabase {
    public static connect() {

        mongoose.connect(process.env.PRODUCTS_URI).then(() => {
            mongoose.connection.db.dropDatabase().then(() => {
                Product.create(products).then(()=> {
                    console.log("Products created");
                }).catch((err) => {
                    console.log("Err seeding db", err);
                });
            }).catch((err) => {
                console.log("Err dropping db", err);
            });
            console.log("product Database connected");
        }).catch((err) => {
            console.log("Err connecting", err);
        });
    }
}