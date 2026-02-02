import { useEffect, useState, useRef } from "react";
import styles from "./SensorsLive.module.css";


export default function SensorsLive() {
    const wsRef = useRef(null);
    const [connected, setConnected] = useState(false);
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);

    
    useEffect(() => {
        const ws = new WebSocket("wss://localhost:3000")
        wsRef.current = ws;

        ws.onopen = () => setConnected(true)
        ws.onclose = () => setConnected(false)
        ws.onmessage = (e) => {
            try {
                const data = JSON.parse(e.data)
                if (data.type === "sensor.temperature"){
                    setTemperature(data)
                }else if (data.type === "sensor.humidity") {
                    setHumidity(data)
                }
            }catch{}
        };
        return () => ws.close()

    }, []);

    return (
        <div className={styles.mainDiv}>
            <p className={styles.mainTitle}>Czujniki</p>
            <p className={styles.statusText}>Status: {connected ? "connected" : "disconnected"}</p>
            <div className={styles.sensorsGrid}>
                {temperature?.type === "sensor.temperature" && (
                    <p className={styles.tempText}>Temperatura: {temperature.value}°{temperature.unit}</p>
                )}

                {humidity?.type === "sensor.humidity" && (
                    <p className={styles.humText}>Wilgotność: {humidity.value} {humidity.unit}</p>
                )}
            </div>
        </div>
    )
}