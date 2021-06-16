const mongoose = require('mongoose');
const validator = require('mongoose-unique-validator');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        minlength: 6,
        required: true,
    },
});

const kind = (kind, path) => {
    if (kind === 'minLength') {
        return `ValidatorError: ${path} is shorter than the minimum allowed length.`;
    } else if (kind === 'unique') {
        return `ValidatorError: expected ${path} to be unique.`;
    }
};

personSchema.plugin(validator, { message: 'check' });

personSchema.set('toJSON', {
    transform: (_, retObj) => {
        retObj.id = retObj._id.toString();
        delete retObj._id;
        delete retObj.__v;
    },
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
