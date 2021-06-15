const unknownEndpoint = (_, res) => {
    res.status(404).json({ error: 'unknown endpoint' });
};

module.exports = unknownEndpoint;
