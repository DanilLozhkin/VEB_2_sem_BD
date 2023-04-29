const express = require("express");
const router2 = express.Router();
const { v4: uuid } = require('uuid');
const { ObjectId } = require('mongodb');


const trajectory_api = 'API-key', trajectory_modell = 'modell';

router2.use(express.json())


const { findToArray, findOne, insertOne, deleteOne } = require('../services/servis');
router2.use(express.static('public'));


const KEY = async (req, res, next) => {
    const apiKey = req.query.apiKey;

    if (!(await findOne({ key: apiKey }, trajectory_api))) {
        return res.status(401).json({ message: '400 ошибка аворизации' });
    }

    next();
};

router2.get('/models', async (req, res) => {
    const data = await findToArray(trajectory_modell);
    res.status(200).json(data);
});

router2.get('/models/:id', async (req, res) => {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
        // findOne(id).then(data => {
        //     res.status(200).json(data);
        // })

        const data = await findOne({ _id: new ObjectId(id) }, trajectory_modell);
        res.status(200).json(data);
    } else {
        res.status(404).send("404 ошибка");

    }
});

router2.post('/models', KEY ,(req, res) => {
    const { name, commit } = req.body;
    const apiKey = req.query.apiKey;
    findOne({ key: apiKey }, trajectory_api);
    const data = Date();

    insertOne({ name, commit, data }, trajectory_modell);

    findToArray().then(data => {
        res.status(200).json(data);
    })

});


router2.post('/apikey', (req, res) => {
    const { name } = req.body;
    let key = uuid().substring(0, 8);

    insertOne({ key, name }, trajectory_api);
    res.send({
        'user': name,
        'key': key,
    });
});


router2.delete("/", KEY, (req, res) => {
    const apiKey = req.query.apiKey;
    deleteOne({ key: apiKey }, trajectory_api);
    res.end("fin");
});


module.exports = router2;

