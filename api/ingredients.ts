import * as express from 'express';
import Ingredient from '../models/Ingredient';

let router = express.Router();

//Allow for searching for ingredients
router.get('/:name', (req, res, next) => {
    let name = req.body.name;
    console.log("req.body is", req.body);
    Ingredient.find({$text: {$search: name}}).then((results) => {
        res.json({results: results});
    }).catch((err) => {
        console.log("Err searching ingredients", err);
    });
});

//Allow for saving ingredients
router.post('/', (req, res, next) => {
    let ing = req.body.ingredient;
    Ingredient.update({_id: ing._id}, ing, {upsert: true}).then((results) => {
        res.json({results: results});
    }).catch((err) => {
        console.log("Err saving ing", err);
    })
})

//Allow for deleting ingredients
router.delete('/', (req, res, next) => {
    let id = req.body.id;
    Ingredient.findByIdAndRemove({_id: id}).then((results) => {
        res.json({results: results});
    }).catch((err) => {
        console.log("err deleting ing", err);
    })
})
export default router; 