const mqtt = require("mqtt")

const client = mqtt.connect(process.env.MQTT_URL);

client.on("connect", () => {
    console.log("Connected to  local HiveMQ broker");

    client.subscribe("warehouse/#", () => {
        console.log("Subscribed to warehouse/#");
    });
});

client.on("message", (topic, payload) => {
    console.log("MQTT message");
    console.log("Topic:", topic);
    console.log("Payload:", payload.toString());
});

client.on("error", (err) => {
    console.error("MQTT error", err);
})

module.exports = client;