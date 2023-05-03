const express = require("express");
const router = express.Router();

const path = require('path');

router.use(express.static('public'));


router.get('/models/normalize.css', (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '../public/normalize.css');
        res.sendFile(filePath);
    } catch (error) {
        next(new Error('Ошибка при отправке файла normalize.css: ' + error.message));
    }
});

router.get('/models/style_2.css', (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '../public/style_2.css');
        res.sendFile(filePath);
    } catch (error) {
        next(new Error('Ошибка при отправке файла style_2.css: ' + error.message));
    }
});

router.get('/models/three.js', (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '../public/three.js');
        res.sendFile(filePath);
    } catch (error) {
        next(new Error('Ошибка при отправке файла three.js: ' + error.message));
    }
});

router.get('/models/main_7.js', (req, res, next) => {
    try {
        const filePath = path.join(__dirname, '../public/main_7.js');
        res.sendFile(filePath);
    } catch (error) {
        next(new Error('Ошибка при отправке файла main_7.js: ' + error.message));
    }
});




module.exports = router;