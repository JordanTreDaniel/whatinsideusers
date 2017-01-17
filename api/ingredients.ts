import * as express from 'express';
import Ingredient from '../models/Ingredient';

let router = express.Router();

//Allow for searching for ingredients
router.get('/:name', (req, res, next) => {
    let name = req.params.name;
    console.log("searching for", name);
    Ingredient.find(
    { $text: { $search: name } },
        { score: { $meta: "textScore" } })
    .sort( { score: { $meta: "textScore" } } )
    .then((results) => {
        console.log("This is the order returned", results);
        res.json({results: results});
    }).catch((err) => {
        console.log("Err searching ingredients", err);
    });
});

//Allow for saving ingredients
router.post('/', (req, res, next) => {
    let ing = req.body.ingredient;
    //check to see if we are working on ingredient

    Ingredient.find({names: {$in: ing.names}}).then((results) => {
        console.log("Find statement produced", results);
        if (results.length < 1) {
            //if we dont find a match, create one
            Ingredient.create(ing)
            .then((results) => console.log("Created", results))
            .catch((err) => console.log("Trouble creating doc", err));
            console.log("created One");
            res.json({results: results});
        } else if (results.length > 1) {
            //TODO: Handle situations in which more than one ingredient is returned,
            //TODO: ...instead of assuming the first should be the one updated.
            //if we do find a match, update it
            Ingredient.update({_id: results[0]._id}, ing)
            .then((results) => console.log("Updated,", results))
            .catch((err) => console.log("Trouble updating doc", err));
            console.log("updated One");            
            res.json({results: "Update complete!"});
            
        };
    })
})

//Allow for deleting ingredients
router.delete('/:name', (req, res, next) => {
    let id = req.params.name;
    console.log("body and params", req.body, req.params);
    Ingredient.findByIdAndRemove({_id: id}).then((results) => {
        res.json({results: results});
    }).catch((err) => {
        console.log("err deleting ing", err);
    })
})
export default router; 