import express from "express";

import vehiclesRoutes from "./routes/vehicles.routes.js"
import packagesRoutes from "./routes/packages.routes.js"
import sensorsRoutes from "./routes/sensors.routes.js"
// import alertsRoutes from "./routes/vehicles.routes.js"



const app = express()

app.use(express.json())

app.use("/vehicles", vehiclesRoutes)
app.use("/packages", packagesRoutes)
app.use("/sensors", sensorsRoutes)
// app.use("/alerts", alertsRoutes)


export default app;