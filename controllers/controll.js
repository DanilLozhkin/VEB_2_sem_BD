const express = require("express");
const router2 = express.Router();
const { v4: uuid } = require('uuid');
const { ObjectId } = require('mongodb');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

const trajectory_api = 'API-key', trajectory_modell = 'modell';

router2.use(express.json())
//const { reqover }= require('../public/main_7');
const { findToArray, findOne, insertOne, deleteOne } = require('../services/servis');
router2.use(express.static('public'));

const KEY = async (req, res, next) => {
    const apiKey = req.query.apiKey;

    if (!(await findOne({ key: apiKey }, trajectory_api))) {
        return res.status(401).json({ message: '400 ошибка аворизации' });
    }

    next();
};

router2.get('/modelss', async (req, res) => {
    const data = await findToArray(trajectory_modell);
    res.status(200).json(data);
});

router2.get('/models', KEY, async (req, res) => {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    var myReadStream = fs.createReadStream(__dirname + '/../public/index_2.html', 'utf8');
    myReadStream.pipe(res);

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
        //res.sendFile('index_2.html');
    } else {
        res.status(404).send("404 ошибка");

    }
});


// router2.post('/models', KEY, async (req, res) => {
//     //const { name_Model, type, value, description } = req.body;
//     const apiKey = req.query.apiKey;
//     let name = await findOne({ key: apiKey }, trajectory_api);
//     name = name.name;
//     let data_creat = Date();
//     let data_update = data_creat;
//     insertOne({ name, name_Model, type, value, description, data_creat, data_update }, trajectory_modell);

//     // res.writeHead(200, {'Content-Type': 'text/html'});
//     // var myReadStream = fs.createReadStream(__dirname + '/../public/index_2.html', 'utf8');
//     // myReadStream.pipe(res);

//     //res.end("fin");
// });

router2.post('/models', KEY, async (req, res) => {
    const { name_Model, type, vertex, color, description } = req.body;
    const apiKey = req.query.apiKey;
    let name = await findOne({ key: apiKey }, trajectory_api);
    name = name.name;
    let data_creat = Date();
    let data_update = data_creat;
    await insertOne({name_Model,type,value: {vertex,color},description,data_creat, data_update}, trajectory_modell);
    res.send('Data saved successfully');
});



router2.delete("/", KEY, (req, res) => {
    const apiKey = req.query.apiKey;
    deleteOne({ key: apiKey }, trajectory_api);
    res.end("fin");
});


module.exports = router2;

