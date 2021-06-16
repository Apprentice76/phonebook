require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const unknownEndpoint = require('./middlewares/unknownEndpoint');
const morgan = require('./middlewares/morgan');
// const Person = require('./models/person');
const router = require('./controllers/router');

const app = express();
// Initialising express middlewares
app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(morgan);
app.use('', router);
app.use(unknownEndpoint);
app.use(errorHandler);

// app.get("/", (_, res) => {
//     res.send("<h1>Go to /api/persons</h1>");
// });


module.exports = app;
