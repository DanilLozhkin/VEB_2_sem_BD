
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const { connectToDB } = require('../configs/BD');
//bodyParser = require("body-parser");
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./public/doc.yaml');
const swaggerUi = require("swagger-ui-express");

const app = express();
const router = require('./main');
const router2 = require('../controllers/controll');


app.disable('x-powered-by');
app.use(helmet())

app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
    //console.log(req.method, req.url, "/", req.httpVersion);
    console.log("HOST:", req.socket.address().address, ":", req.socket.address().port);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Что-то сломалось');
    
});


app.use(morgan('dev'));

app.use('/', router);
app.use('/', router2);



// app.get('/api/users', Key, function (req, res) {
//     const user = req.query.id;
//     res.send({
//         'user': user,
//     });
// });


const hostname = '127.0.0.1';
const PORT = 3000;


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


connectToDB((err) => {
    if (!err) {

        app.listen(PORT, hostname, () => {
            console.log("OK server");
        });
    }
});


