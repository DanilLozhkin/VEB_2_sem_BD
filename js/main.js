const express = require("express");
const router = express.Router();

const path = require('path');

router.use(express.static('public'));


router.get('/CSS/normalize.css ', (req, res) => {

});




router.get('/models/normalize.css', (req, res) => {
    const filePath = path.join(__dirname, '../public/normalize.css');
    res.sendFile(filePath);
});

router.get('/models/style_2.css', (req, res) => {
    const filePath = path.join(__dirname, '../public/style_2.css');
    res.sendFile(filePath);
});

router.get('/models/three.js', (req, res) => {
    const filePath = path.join(__dirname, '../public/three.js');
    res.sendFile(filePath);
});

router.get('/models/main_7.js', (req, res) => {
    const filePath = path.join(__dirname, '../public/main_7.js');
    res.sendFile(filePath);
});

router.get('/models/quer_1.js', (req, res) => {
    const filePath = path.join(__dirname, '../public/quer_1.js');
    res.sendFile(filePath);
});


module.exports = router;