const express = require("express");
const router2 = express.Router();
const { v4: uuid } = require('uuid');
const { ObjectId } = require('mongodb');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

const bodyParser = require('body-parser');

router2.use(bodyParser.json({ limit: '50mb' }));
router2.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const ur = bodyParser.urlencoded({ extended: false });

const trajectory_api = 'API-key', trajectory_modell = 'modell';

router2.use(express.json())
//const { reqover }= require('../public/main_7');
const { findToArray, findOne, insertOne, deleteOne, deleteMany, updateOne } = require('../services/servis');
const { request } = require("http");
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

router2.get('/models/html', KEY, async (req, res) => {

    const key = req.query.apiKey;
    let name = await findOne({ key: key }, trajectory_api);
    name = name.name;

    let name_Model = "name";
    let type = "BufferGeometry";
    let vertex = "1,2,3";
    let collor = "#0033ff";
    let description = "что-то";
    let data_creat = Date();
    let data_update = data_creat;

    const filePath = __dirname + '/../public/index_3.ejs';
    fs.readFile(filePath, 'utf8', (err, template) => {
        const rendered = ejs.render(template, {
            name, name_Model, type, vertex,
            collor, description, data_creat, data_update, key
        });
        res.send(rendered);
    });
});
router2.get('/models/:id', async (req, res) => {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
        const data = await findOne({ _id: new ObjectId(id) }, trajectory_modell);
        let name = data.name;
        let name_Model = data.name_Model;
        let type = data.type;
        let vertex = data.value.vertex;
        let collor = data.value.color;
        let description = data.description;
        let data_creat = data.data_creat;
        let data_update = data.data_update;

        const filePath = __dirname + '/../public/index_2.ejs';
        fs.readFile(filePath, 'utf8', (err, template) => {
            const rendered = ejs.render(template, {
                name, name_Model, type, vertex,
                collor, description, data_creat, data_update
            });
            res.send(rendered);
        });
    } else {
        res.status(404).send("id нет");
    }
});



router2.put('/models/:id', KEY, async (req, res) => {

    const id = req.params.id;
    const key = req.query.apiKey;
    if (ObjectId.isValid(id)) {
        const key_1 = await findOne({ _id: new ObjectId(id) }, trajectory_modell);
        if (key == key_1.key) {

            const { name_Model, type, vertex, color, description } = req.body;
            console.log(name_Model, type, vertex, color);

            const updateFields = {};
            if (name_Model) {
                updateFields.name_Model = name_Model;
            }
            if (type) {
                updateFields.type = type;
            }
            if (vertex) {
                await updateOne({ _id: new ObjectId(id) }, { $set: { "value.vertex": vertex } }, trajectory_modell);
            }
            if (color) {
                await updateOne({ _id: new ObjectId(id) }, { $set: { "value.color": color } }, trajectory_modell);
            }
            if (description) {
                updateFields.description = description;
            }
            updateFields.data_update = Date();

            await updateOne({ _id: new ObjectId(id) }, { $set: updateFields }, trajectory_modell);

            res.send('fin обновилось БД');
        } else {
            return res.status(401).json({ message: '400 ошибка аворизации' });
        }
    }
    else {
        res.status(404).send("id нет");
    }
});


router2.post('/models', ur, async (req, res) => {

    const { name, name_Model, type, vertex, color, description, key } = req.body;

    let data_creat = Date();
    let data_update = data_creat;

    await insertOne({ name, name_Model, type, value: { vertex, color }, description, data_creat, data_update, key }, trajectory_modell);
    res.send('бд сохранилось');
});

router2.post('/api-keys', (req, res) => {
    const { name } = req.body;
    const key = uuid().slice(0, 8);;
    insertOne({ key, name }, trajectory_api);
    res.send(`API key for ${name} is ${key} `);
});


router2.delete("/", KEY, async (req, res) => {
    const apiKey = req.query.apiKey;
    let name = await findOne({ key: apiKey }, trajectory_api);
    name = name.name;

    deleteMany({ name: name }, trajectory_modell);
    deleteOne({ key: apiKey }, trajectory_api);

    res.end("fin");

});

router2.delete("/models/:id", KEY, async (req, res) => {
    const id = req.params.id;
    const key = req.query.apiKey;
    if (ObjectId.isValid(id)) {
        const key_1 = await findOne({ _id: new ObjectId(id) }, trajectory_modell);
        if (key == key_1.key) {
            await deleteOne({ _id: new ObjectId(id) }, trajectory_modell);
            res.end("fin");
        } else {
            return res.status(401).json({ message: '400 ошибка аворизации' });
        }
    }
    else {
        res.status(404).send("id нет");
    }
});



module.exports = router2;

