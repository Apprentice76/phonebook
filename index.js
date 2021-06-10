require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

// Initialising express
const app = express();
app.use(express.static("build"));
app.use(cors());
app.use(express.json());

// logger middleware

morgan.token("body", (req, _) =>
    JSON.stringify(req.body) === "{}" ? " " : JSON.stringify(req.body)
);
morgan.format(
    "ctiny",
    ":method :url :status :res[content-length] - :response-time ms :body"
);
morgan.compile("ctiny");

app.use(morgan("ctiny"));

// app.get("/", (_, res) => {
//     res.send("<h1>Go to /api/persons</h1>");
// });

app.get("/api/persons", (_, res) => {
    // res.json(persons);
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
    // console.log(data);
    // res.send(
    //     `<p>Phonebook has info for ${
    //         56
    //     } people</p><p>${new Date().toString()}</p>`
    // );
});

app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;
    // const person = persons.find((n) => n.id === id);
    // if (person) res.json(person);
    // else res.status(404).end();
    Person.findById(id)
        .then((person) => {
            if (person) res.json(person);
            else res.status(404).end();
        })
        .catch((e) => {
            // res.status(400).send({ error: "malformatted id" });
            next(e);
        });
});

app.delete("/api/persons/:id", (req, res, next) => {
    // const id = Number(req.params.id);
    // persons = persons.filter((n) => n.id !== id);
    // res.status(204).end();
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

    Person.find({ name: body.name })
        .then((exist) => {
            // console.log(exist, typeof exist);
            // res.status(104).end();
            if (exist.length > 0) {
                console.log(exist);
                res.status(400).json({
                    error: "name already exists",
                });
                // next("/api/persons");
            } else {
                const person = new Person({
                    name: body.name,
                    number: body.number,
                });
                // console.log(person);
                person.save().then((saved) => res.json(saved));
            }
        })
        .catch((e) => {
            next(e);
        });

    // if (exists) {
    //     return res.status(400).json({
    //         error: "name already exists",
    //     });
    // }

    // const person = new Person({
    //     name: body.name,
    //     number: body.number,
    // });

    // persons = [...persons, person];
    // persons.concat(person);
    // console.log(person);
    // person.save().then((saved) => res.json(saved));
    // res.json(person);
});

// app.put("/api/persons", (req, res, next) => {
//     (async function () {
//         const body = req.body;
//         const modified = new Person({
//             name: body.name,
//             number: body.number,
//         });
//         let o_id = "";
//         await Person.find({ name: body.name }).then((old) => {
//             o_id = old.id;
//         });
//         Person.findByIdAndUpdate(o_id, modified, { new: true })
//             .then((updated) => res.json(updated))
//             .catch((e) => next(e));
//     })();
// });

app.put("/api/persons/:id", (req, res, next) => {
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number,
    };
    Person.findByIdAndUpdate(req.params.id, person, { new: true})
        .then((updated) => res.json(updated))
        .catch((e) => next(e));
});

const unknownEndpoint = (_, res) => {
    res.status(404).json({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
