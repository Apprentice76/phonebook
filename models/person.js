const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");


const uri = process.env.MONGODB_URI;

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log("db connected"))
    .catch((e) => console.log("error connecting db", e));;

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        minlength: 8,
        required: true,
    },
});

personSchema.plugin(validator);

personSchema.set('toJSON', {
    transform: (_, retObj) => {
        retObj.id = retObj._id.toString();
        delete retObj._id;
        delete retObj.__v;
    }
})

module.exports = mongoose.model('Person', personSchema);