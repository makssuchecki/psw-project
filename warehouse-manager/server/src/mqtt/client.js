import mqtt from "mqtt";

const client = mqtt.connect(process.env.MQTT_URL || "mqtt://localhost:1883");

client.on("connect", () => {
    console.log("MQTT connected")
    client.subscribe("sensors/temperature")
    client.subscribe("sensors/humidity")
})

client.on("error", err => {
    console.error("MQTT error: ", err)
})

export default client;