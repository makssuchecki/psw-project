import { useWebSocket } from "../hooks/useWebSocket";

export default function SensorsLive() {
    const { connected, lastMsg } = useWebSocket("wss://localhost:3000")

    return (
        <div>
            <h2>Czujniki</h2>
            <p>Status: {connected ? "connected" : "disconnected"}</p>

            {lastMsg?.type === "sensor.temperature" && (
                <p>Temperatura: {lastMsg.value} {lastMsg.unit}</p>
            )}
            
            {lastMsg?.type === "sensor.humidity" && (
                <p>Wilgotność: {lastMsg.value} {lastMsg.unit}</p>
            )}

        </div>
    )
}