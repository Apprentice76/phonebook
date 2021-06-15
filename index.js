require("dotenv").config();

const express = require("express");
const morgan = require('./middlewares/morgan');
const cors = require("cors");
const Person = require('./models/person').Person;
const mongoose = require('./models/person').mongoose;
const errorHandler = require('./middlewares/errorHandler');
const unknownEndpoint = require('./middlewares/unknownEndpoint');

const app = express();
// Initialising express middlewares
app.use(express.static("build"));
app.use(cors());
app.use(express.json());
app.use(morgan);
app.use(unknownEndpoint);
app.use(errorHandler);

// app.get("/", (_, res) => {
//     res.send("<h1>Go to /api/persons</h1>");
// });

app.get("/api/persons", (_, res) => {
    Person.find({}).then((persons) => res.json(persons));
});

app.get("/info", (_, res) => {
    Person.find({})
        .lean()
        .then((db) =>
            res.send(
                `<p>Phonebook has info for ${
                    db.length
                } people</p><p>${new Date().toString()}</p>`
            )
        );
});

app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;
    Person.findById(id)
        .then((person) => {
            if (person) res.json(person);
            else res.status(404).end();
        })
        .catch((e) => {
            next(e);
        });
});

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then((person) => {
            if (person) res.status(204).end();
            else res.status(404).end();
        })
        .catch((e) => next(e));
});

// curl -X POST -H "Content-Type: application/json" -d '{"content": "linuxize", "important": true}'  http://localhost:2000/api/persons
app.post("/api/persons", (req, res, next) => {
    const body = req.body;

    if (!body || !body.name || !body.number) {
        return res.status(400).json({
            error: "content missing",
        });
    }

    Person
        .find({ name: body.name })
        .then((exist) => {
            if (exist.length > 0) {
                console.log(exist);
                res.status(400).json({
                    error: "name already exists",
                });
                next("/api/persons");
            } else {
                const person = new Person({
                    name: body.name,
                    number: body.number,
                });
                person.save().then((saved) => res.json(saved));
            }
        })
        .catch((e) => {
            next(e);
        });
});

app.put("/api/persons/:id", (req, res, next) => {
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number,
    };
    Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query'})
        .then((updated) => res.json(updated))
        .catch((e) => next(e));
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

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