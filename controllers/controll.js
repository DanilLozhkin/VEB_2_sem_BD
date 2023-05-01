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
const { findToArray, findOne, insertOne, deleteOne ,deleteMany  } = require('../services/servis');
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

    // res.writeHead(200, { 'Content-Type': 'text/html' });
    // var myReadStream = fs.createReadStream(__dirname + '/../public/index_2.html', 'utf8');
    // myReadStream.pipe(res);
    const apiKey = req.query.apiKey;
    let name = await findOne({ key: apiKey }, trajectory_api);
    name = name.name;
    const filePath = __dirname + '/../public/index_3.ejs';
    fs.readFile(filePath, 'utf8', (err, template) => {
        const rendered = ejs.render(template, { name });
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

router2.post('/models', ur, async (req, res) => {

    const { name, name_Model, type, vertex, color, description } = req.body;

    let data_creat = Date();
    let data_update = data_creat;
    console.log(name_Model);
    await insertOne({ name, name_Model, type, value: { vertex, color }, description, data_creat, data_update }, trajectory_modell);
    res.send('Data saved successfully');
});

router2.post('/api-keys', (req, res) => {
    const { name } = req.body;
    const key = uuid().slice(0, 8);;
    insertOne({key ,name}, trajectory_api);
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


module.exports = router2;

