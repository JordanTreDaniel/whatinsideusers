import * as express from 'express';

import Product from '../models/product';
import * as expjwt from 'express-jwt';
let jwtDecode = require('jwt-decode');
let router = express.Router();

////////////////////
////////////////////
////////////////////
//I need to find a way to get the parsed token into the master state once 
//someone logs in but for now, parseUsername() will work if I put it on any
//route that needs the user
////////////////////
////////////////////
////////////////////

function parseUsername(request) {
    let username = request.headers['authorization'];
    username = username.substr(7);
    username = jwtDecode(username);
    username = username['username'];
    console.log("your username is", username);
}

router.get('/', (req, res, next) => {
        Product.find({}).then((products) => {
            res.json(products);
        }).catch((err) => {
            console.log(err);
        });
});
router.get('/:id', (req, res, next) => {
    parseUsername(req);
    let id = (req.params.id);
    Product.findOne({_id: id}).then((product)=> {
        res.json(product);
    }).catch((err) => {
        console.log("API: Error getting product");
    });
});
router.get('/query/:query', (req, res, next) => {
    let query = req.params.query;
    Product.find({$text: {$search: query}}).then((products)=> {
        res.json({products: products})
    }).catch((err) => {
        console.log("Err in text search", err);
    });
});
export default router;