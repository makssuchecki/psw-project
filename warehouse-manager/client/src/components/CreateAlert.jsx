import { useState, useRef, useEffect } from "react";

export default function CreateAlert(){
    const wsRef = useRef(null);
    const [connected, setConnected] = useState(null);
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("medium")

    useEffect(() => {
        const ws = new WebSocket("wss://localhost:3000")
        wsRef.current = ws

        ws.onopen = () => setConnected(true)
        ws.onmessage = (e) => {} 
        ws.onclose = () => setConnected(false)

        return () => ws.close()
    }, [])

    const send = (obj) => {
        const wsCurr = wsRef.current
        if (!wsCurr) return;
        
        if (wsCurr.readyState === WebSocket.OPEN){
            ws.send(JSON.stringify(obj))
        }
        return
    }
    const sendAlert = (message, severity) => {
        if (!message.trim()) return;
        send({
            type: "alert.create",
            message, 
            severity
        })
        setMessage("")
        setSeverity("medium")
    }

    return (
        <div>
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Wiadomość ostrzeżenia"></input>
            <label htmlFor="severity">Wybierz powagę:</label>
            <select value={severity} name="severity" onChange={(e) => setSeverity(e.target.value)}>
                <option value="high">Wysoka</option>
                <option value="medium">Średnia</option>
                <option value="low">Niska</option>
            </select>
            <button disabled={!connected} onClick={() => sendAlert(message, severity)}>Dodaj alert</button>
        </div>

    )
}