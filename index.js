const mongoose = require('mongoose');
const Person = require('./models/person');
const app = require('./app');

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () =>
    console.log(`Server running on port: ${PORT}`)
);

const uri = process.env.MONGODB_URI;

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
