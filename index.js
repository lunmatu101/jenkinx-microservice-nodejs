const express = require('express');
const logger = require("./logger");
const task = require("./task");

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

app.get("/enqueue", (req, res) => {
    const msg = task.enqueue("Job at: " + new Date().toLocaleTimeString());
    res.send(msg);
});

app.get("/health/readiness", (req, res) => {
    const status = task.isReady();
    if (status) {
        res.sendStatus(200);
    } else {
        res.sendStatus(503);
    }
});

app.get("/health/liveness", (req, res) => {
    setTimeout(() => {
        res.sendStatus(200);
    }, 3000);
});