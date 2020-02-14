const express = require('express');

const actionRouter = require('./routers/actionRouters');
const projectRouter = require('./routers/projectRouters');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Node API Challenge</h2>`);
});

function logger(req, res, next) {
    console.log(`${req.method} Request to ${req.originalUrl} ${Date(Date.now).toString()}`);
        next();
};

module.exports = server;