import mqtt from "mqtt";

const client = mqtt.connect(process.env.MQTT_URL || "mqtt://localhost:1883");

let lat = 54.0;
let lon = 18.0;
setInterval(() => {
    lat += (Math.random() - 0.5) * 0.001;
    lon += (Math.random() - 0.5) * 0.001; 
    client.publish(
        "vehicles/location", 
        JSON.stringify({
            "longitude": lat,
            "latitude": lon,
            "vehicleId": 1
         })
    )
}, 5000)