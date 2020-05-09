const express = require('express');
const app = express()
const morgan = require('morgan'); // Logging package
const bodyParser = require('body-parser');


const cardRoutes = require('./api/routes/cards');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
})

app.use('/cards', cardRoutes);

app.use((req, rs, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


// First Tutorial
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'Hello'
//     });
// })

module.exports = app;