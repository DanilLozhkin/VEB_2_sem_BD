
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const { connectToDB} = require('../configs/BD'); 

const app = express();
const router = require('./main_7');
const router2 = require('../controllers/controll');


app.disable('x-powered-by');
app.use(helmet())
const Key = (req, res, next) => {
    const apiKey = req.query.apiKey; 
    if (!apiKey || apiKey !== 'myApiKey') { 
        return res.status(401).json({ message: '400 ошибка аворизации' });}

    next(); 
};

app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
    //console.log(req.method, req.url, "/", req.httpVersion);
    console.log("HOST:", req.socket.address().address, ":", req.socket.address().port);
    next();
});
app.use(morgan('dev'));

app.use('/', router);
app.use('/', router2);



app.get('/api/users', Key, function (req, res) {
    const user = req.query.id;
    res.send({
        'user': user,
    });
});



const hostname = '127.0.0.1';
const PORT = 3000;

connectToDB((err)=> {
    if (!err) {
        app.listen(PORT, hostname, () => {
            console.log("OK server");
        });
    }
});
