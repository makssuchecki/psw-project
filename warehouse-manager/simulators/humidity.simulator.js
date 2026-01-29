import mqtt from "mqtt";

const client = mqtt.connect(process.env.MQTT_URL || "mqtt://localhost:1883");

setInterval(() => {
    const value = (40 + Math.random() * 30).toFixed(1)
    client.publish(
        "sensors/humidity", 
        JSON.stringify({ value })
    )
}, 5000)