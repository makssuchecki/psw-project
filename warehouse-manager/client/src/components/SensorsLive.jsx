import { useEffect, useState, useRef } from "react";
export default function SensorsLive() {
    const wsRef = useRef(null);
    const [connected, setConnected] = useState(false);
    const [lastMsg, setLastMsg] = useState(null);

    useEffect(() => {
        const ws = new WebSocket("wss://localhost:3000")
        wsRef.current = ws;

        ws.onopen = () => setConnected(true)
        ws.onclose = () => setConnected(false)
        ws.onmessage = (e) => {
            try {
                setLastMsg(JSON.parse(e.data))
            }catch{
                setLastMsg(e.data)
            }
        };
        return () => ws.close()

    }, []);
    return (
        <div>
            <h2>Czujniki</h2>
            <p>Status: {connected ? "connected" : "disconnected"}</p>

            {lastMsg?.type === "sensor.temperature" && (
                <p>Temperatura: {lastMsg.value}°{lastMsg.unit}</p>
            )}
            
            {lastMsg?.type === "sensor.humidity" && (
                <p>Wilgotność: {lastMsg.value} {lastMsg.unit}</p>
            )}

        </div>
    )
}