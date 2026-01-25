import express from "express";
import cors from "cors";

import vehiclesRoutes from "./routes/vehicles.routes.js"
import packagesRoutes from "./routes/packages.routes.js"
import sensorsRoutes from "./routes/sensors.routes.js"
import alertsRoutes from "./routes/alerts.routes.js"
import authRoutes from "./routes/auth.routes.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/vehicles", vehiclesRoutes)
app.use("/packages", packagesRoutes)
app.use("/sensors", sensorsRoutes)
app.use("/alerts", alertsRoutes)

app.use("/auth", authRoutes)

export default app;