import * as express from 'express';
import Ingredient from '../models/Ingredient';
let router = express.Router();

router.get('/', (req, res, next) => {
    res.send("Ingredient api contacted");
});

router.get('/:name', (req, res, next) => {
    let name = req.params.name;
    
})

export default router;