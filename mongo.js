const mongoose = require("mongoose");

// const user = process.argv[2];
// const password = process.argv[3];
// const user = "client-side";
// const password = "asdfghjkl";

const url = process.env.MONGODB_URI;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date,
});

const Person = mongoose.model("Person", personSchema);
console.log(process.argv);

if (process.argv.length > 2) {
    const name = process.argv[2];
    const number = process.argv[3];

    const person = new Person({
        name: name,
        number: number,
        date: new Date(),
    });

    person
        .save()
        .then((res) => {
            console.log(`added ${res.name} ${res.number} to phonebook`);
            mongoose.connection.close();
        })
        .catch((e) => console.log(e.message));
}

Person.find({}).then((p) => {
    console.log(p);
    mongoose.connection.close();
});
