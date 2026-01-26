import mqtt from "mqtt";

const client = mqtt.connect(process.env.MQTT_URL || "mqtt://localhost:1883");

setInterval(() => {
    const value = (20 + Math.random() * 6).toFixed(1)
    client.publish(
        "sensors/temperature", 
        JSON.stringify({ value })
    )
}, 3000)