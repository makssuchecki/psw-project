import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import vehiclesRoutes from "./routes/vehicles.routes.js";
import packagesRoutes from "./routes/packages.routes.js";
import sensorsRoutes from "./routes/sensors.routes.js";
import alertsRoutes from "./routes/alerts.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

app.use("/vehicles", vehiclesRoutes);
app.use("/packages", packagesRoutes);
app.use("/sensors", sensorsRoutes);
app.use("/alerts", alertsRoutes);


export default app;