import { useState, useEffect, useRef } from "react";
import CreateAlert from "./CreateAlert";

export default function AlertsLive({ api }) {
    const wsRef = useRef(null);
    const [connected, setConnected] = useState(false);
    const [lastMsg, setLastMsg] = useState(null);
    const [alerts, setAlerts] = useState([]);

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

    useEffect(() => {
        if (!lastMsg) return
        if (lastMsg.type !== "alert.new") return;

        setAlerts(prev => [lastMsg.payload, ...prev]);
    }, [lastMsg]) 

    const clearAlerts = async () => {
        try{
            await fetch(`${api}/alerts`, {
                method: "DELETE",
                credentials: "include"
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
                    <p>{alert.createdAt}</p>
                </div>
            ))}
            <CreateAlert />
        </div>
    )
}

