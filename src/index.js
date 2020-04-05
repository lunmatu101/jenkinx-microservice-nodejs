const express = require('express');
const logger = require("./logger");

const app = express();

app.listen(80, () => {
    console.log(`Worker started --> PID: `, process.pid);
});

app.get("/", (req, res) => {
    logger.info((new Date).toUTCString());
    res.sendStatus(200);
});

app.get("/new", (req, res) => {
    logger.info(req.url);
    res.send("This is new routing");
});