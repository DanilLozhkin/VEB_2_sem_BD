const express = require("express");
const router2 = express.Router();

const { ObjectId } = require('mongodb');
router2.use(express.json())


const { findToArray, findOne, insertOne } = require('../services/servis');
router2.use(express.static('public'));

router2.get('/comments',async (req, res) => {
    const data = await findToArray();
        res.status(200).json(data);
});

router2.get('/comments/:id',async (req, res) => {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
        // findOne(id).then(data => {
        //     res.status(200).json(data);
        // })
        const data = await findOne(id);
        res.status(200).json(data);
    } else {
        res.status(404).send("404 ошибка")
    }
});

router2.post('/comments', (req, res) => {
    const { name, commit } = req.body;
    const data =  Date();

    insertOne({ name, commit, data });
    findToArray().then(data => {
        res.status(200).json(data);
    })
  
});


module.exports = router2;