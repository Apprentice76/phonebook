const errorHandler = (e, req, res, next) => {
    // console.error("Error:", e.message, e.errors);

    let eObj = {
        errors: [],
    };

    const eFunc = (obj) => {
        const o = obj;
        const path = o.path === 'name' ? 'Name' : 'Number';

        const e1 = `Error: Expected ${path} to be unique. ${path} '${o.value}' already exists.`;
        const e2 = `Error: ${path} '${o.value}' is shorter than the minimum allowed length: ${o.properties.minlength}.`;

        if (o.kind === 'unique') {
            console.error(e1);
            eObj['errors'].push(e1);
        } else if (o.kind === 'minlength') {
            console.error(e2);
            eObj['errors'].push(e2);
        }
    };

    if (e.errors.name) {
        eFunc(e.errors.name);
    }

    if (e.errors.number) {
        eFunc(e.errors.number);
    }
    res.status(400).json(eObj);
    next();
};

module.exports = errorHandler;
