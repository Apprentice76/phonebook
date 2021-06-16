require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const unknownEndpoint = require('./middlewares/unknownEndpoint');
const morgan = require('./middlewares/morgan');
const Person = require('./models/person');
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

const uri = 'mongodb+srv://client-side:asdfghjkl@cluster0.i4xit.mongodb.net/phonebook?retryWrites=true';

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () =>
    console.log(`Server running on port: ${PORT}`)
);

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log('db connected'))
    .catch((e) => {
        console.log('error connecting db', e);
        server.close();
    });
// arg check
if (process.argv.length > 2) {
    // console.log(process.argv);
    const name = process.argv[2];
    const number = process.argv[3];

    const person = new Person({
        name: name,
        number: number,
    });

    person
        .save()
        .then((res) => {
            console.log(`added ${res.name} ${res.number} to phonebook`);
            mongoose.connection.close();
        })
        .then(() => server.close())
        .catch((e) => console.log(e.message));
}
