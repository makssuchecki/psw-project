import { useState, useRef, useEffect } from "react";
import styles from "./CreateAlert.module.css"
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
            wsCurr.send(JSON.stringify(obj))
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
        <div className={styles.mainDiv}>
            <input className={styles.msgInput} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Wiadomość ostrzeżenia"></input>
            <div className={styles.sevDiv}>
                <label className={styles.sevLabel} htmlFor="severity">Wybierz powagę:</label>
                <select className={styles.sevSelect} value={severity} name="severity" onChange={(e) => setSeverity(e.target.value)}>
                    <option className={styles.sevOpt} value="high">Wysoka</option>
                    <option className={styles.sevOpt} value="medium">Średnia</option>
                    <option className={styles.sevOpt} value="low">Niska</option>
                </select>
            </div>
            <button className={styles.sendBtn} disabled={!message || !connected} onClick={() => sendAlert(message, severity)}>Dodaj ostrzeżenie</button>
        </div>

    )
}