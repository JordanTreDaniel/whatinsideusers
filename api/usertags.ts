import * as express from 'express';
import UserTag from '../models/Usertag';
let router = express.Router();

//You can grab a user tag at will
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    UserTag.find({owner: id}).then((results) => {
        res.json({tag: results[0]});
    }).catch((err) => {
        console.log("Error grabbing tag");
    });
});

//You can generate a new user tag
router.post("/generate/:id", (req, res, next) => {
    let tag = {
        owner: req.params.id
    }
    UserTag.create(tag).then((results) => {
        res.json({results: results});
    }).catch((err) => {
        console.log("Error creating tag", err);
    });
})

//You can update the user tag, making changes to it.
router.post("/", (req, res, next) => {
    let tag = req.body.tag;
    UserTag.update({owner: tag.owner}, tag).then((results) => {
        res.json({results: results});
    }).catch((err) => {
        console.log("Error updating tag", err);
    });
});

//Add the ability to prune the database of excess userTags
router.delete("/:id", (req, res, next) => {
    let id = req.params.id;
    UserTag.find({owner: id}).remove().then((results) => {
        res.json({results: results});
    }).catch((err) => {
        console.log("Error deleting tag", err);
    })
})

export default router;