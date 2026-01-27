import { useWebSocket } from "../hooks/useWebSocket";

export default function SensorsLive() {
    const { connected, lastMsg } = useWebSocket("ws://localhost:3000")

    return (
        <div>
            <p>Status: {connected ? "connected" : "disconnected"}</p>

            {lastMsg?.type === "sensor.temperature" && (
                <p>Temperature: {lastMsg.value} {lastMsg.unit}</p>
            )}
            
            {lastMsg?.type === "sensor.humidity" && (
                <p>Humidity: {lastMsg.value} {lastMsg.unit}</p>
            )}

        </div>
    )
}