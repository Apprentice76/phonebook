const morgan = require('morgan');

morgan.token('body', (req, _) =>
    JSON.stringify(req.body) === '{}' ? ' ' : JSON.stringify(req.body)
);
morgan.format(
    'ctiny',
    ':method :url :status :res[content-length] - :response-time ms :body'
);
morgan.compile('ctiny');

const config = morgan('ctiny');

module.exports = config;