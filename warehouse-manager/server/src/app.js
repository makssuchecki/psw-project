import express from "express";

const express = require("express")

const app = express()
app.use(express.json())

app.use("/vehicles", require("./routes/vehicles.routes"))
app.use("/packages", require("./routes/vehicles.routes"))
app.use("/sensors", require("./routes/vehicles.routes"))
app.use("/alerts", require("./routes/vehicles.routes"))


export default app;