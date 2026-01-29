import { useState, useEffect } from "react";
import { useWebSocket } from "../hooks/useWebSocket";

export default function AlertsLive({ api }) {
    const { lastMsg } = useWebSocket("ws://localhost:3000")
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        if (!lastMsg) return
        if (lastMsg.type !== "alert.new") return;

        setAlerts(prev => [lastMsg.payload, ...prev]);
    }, [lastMsg]) 

    const clearAlerts = async () => {
        try{
            await fetch(`${api}/alerts`, {
                method: "DELETE"
                }
            )
            setAlerts([])
        }catch{}

    }
    return (
        <div>
            <h2>Ostrzeżenia</h2>
            <button onClick={clearAlerts}>Oznacz jako przeczytane</button>
            {alerts.map(alert => (
                <div key={alert.id}>
                    <h4>{alert.type}</h4>
                    <p>{alert.message}</p>
                    <p>{alert.createAt}</p>
                </div>
            ))}
        </div>
    )
}

