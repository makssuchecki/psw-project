import "dotenv/config";
import "./mqtt/client.js";

import app from "./app.js";
import http from "http";
import { createWsServer } from "./ws/ws.server.js";
import * as sensorService from "./services/sensors.service.js";
import * as vehiclesService from "./services/vehicles.service.js";

const server = http.createServer(app);

const { broadcast } = createWsServer(server);

sensorService.setBroadcast(broadcast)
vehiclesService.setBroadcast(broadcast)
app.set("wsBroadcast", broadcast)

server.listen(3000, () => {
    console.log("HTTP running on 3000")
});

