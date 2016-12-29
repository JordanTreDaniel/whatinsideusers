import * as express from 'express';
import Ingredient from '../models/Ingredient';
let router = express.Router();

router.get('/', (req, res, next) => {
    res.send("Ingredient api contacted");
});

router.get('/:name', (req, res, next) => {
    let name = req.params.name;
    Ingredient.find({ $text: {$search: name} }).then((results) => {
        res.send({results: results});
    }).catch((err) => {
        console.log("Error searching ing", err);
    });
});

router.post('/', (req, res, next) => {
    let ing = req.body.ingredient;
    Ingredient.update({_id: ing._id}, ing, {upsert: true}).then((results) => {
        res.json({results: results});
    }).catch((err) => {
        console.log("Err saving product", err);
    });
})

export default router;