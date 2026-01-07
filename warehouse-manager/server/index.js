require("dotenv").config({ path: "../.env"});

require("./mqtt")

const express = require("express")
const http = require("http")
const { startWebSocket } = require("./ws")

const app = express()

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        timestamp: Date.now()
    });
});

const server = http.createServer(app);

server.listen(3000, () => {
    console.log("HTTP running on 3000")
});

startWebSocket(server);