import * as express from 'express';

import Product from '../models/product';

let router = express.Router();

router.get('/', (req, res, next) => {
        console.log("First statement triggered");
        console.log("body", req.body, "params", req.params);
        Product.find({}).then((products) => {
            res.json(products);
        }).catch((err) => {
            console.log(err);
        });
});
router.get('/:id', (req, res, next) => {
    console.log("Get by id triggered");
    let id = (req.params.id);
    Product.findOne({_id: id}).then((product)=> {
        res.json(product);
    }).catch((err) => {
        console.log("API: Error getting product");
    });
});

export default router;