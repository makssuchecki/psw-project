import "dotenv/config";
import "./mqtt/client.js";

import app from "./app.js";
import { createWsServer } from "./ws/ws.server.js";
import * as sensorService from "./services/sensors.service.js";
import * as vehiclesService from "./services/vehicles.service.js";

import https from "https";
import fs from "fs";

const options = {
    key: fs.readFileSync("./certs/plik_klucz"), 
    cert: fs.readFileSync("./certs/plik_certyfikat")
}

const server = https.createServer(options, app);

const { broadcast } = createWsServer(server);

sensorService.setBroadcast(broadcast)
vehiclesService.setBroadcast(broadcast)
app.set("wsBroadcast", broadcast)

server.listen(3000, () => {
    console.log("HTTPS running on 3000")
});

