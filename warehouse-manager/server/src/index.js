import "dotenv/config";
import "./mqtt.js";

import express from "express";
import http from "http"
import { startWebSocket } from "./ws.js"

const app = express()
app.use(express.json())

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        timestamp: Date.now()
    });
});

const server = http.createServer(app);

startWebSocket(server);

server.listen(3000, () => {
    console.log("HTTP running on 3000")
});

