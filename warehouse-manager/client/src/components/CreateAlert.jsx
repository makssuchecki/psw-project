import { useWebSocket } from "../hooks/useWebSocket"
import { useState } from "react";



export default function CreateAlert(){
    const { send, connected } = useWebSocket("ws://localhost:3000")
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState("medium")

    const sendAlert = (message, severity) => {
        if (!message.trim()) return;
        send({
            type: "alert.create",
            message, 
            severity
        })    
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