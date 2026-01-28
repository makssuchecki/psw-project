import mqtt from "mqtt";

const client = mqtt.connect(process.env.MQTT_URL || "mqtt://localhost:1883");

setInterval(() => {  
    client.publish(
        "packages/status", 
        JSON.stringify({
            "packageId": 1,
            "statusUpdate": "delivered"
         })
    )
}, 5000)