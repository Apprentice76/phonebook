const router = require('express').Router();
const Person = require('../models/person');

router.get('/api/persons', (_, res) => {
    Person.find({}).then((persons) => res.json(persons));
});

router.get('/info', (_, res) => {
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

router.get('/api/persons/:id', (req, res, next) => {
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

router.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then((person) => {
            if (person) res.status(204).end();
            else res.status(404).end();
        })
        .catch((e) => next(e));
});

router.post('/api/persons', (req, res, next) => {
    const body = req.body;

    if (!body || !body.name || !body.number) {
        console.error(`Error: Content missing in one or multiple fields.`);
        return res.status(400)
            .json({
                error: 'Error: Content missing in one or multiple fields.',
            })
            .end();
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });
    person
        .save()
        .then((saved) => res.json(saved))
        .catch((e) => next(e));
});

router.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number,
    };
    Person.findByIdAndUpdate(req.params.id, person, {
        new: true,
        runValidators: true,
        context: 'query',
    })
        .then((updated) => res.json(updated))
        .catch((e) => next(e));
});

module.exports = router;
