import { useState,useEffect, useRef, useSyncExternalStore } from "react";

export default function VehiclesLive() {
    const [connected, setConnected] = useState(null);
    const [lastMsg, setLastMsg] = useState(null);
    const wsRef = useRef(null);
    const [vehicles, setVehicles] = useState({})

    useEffect(() => {
        const ws = new WebSocket("wss://localhost:3000")
        wsRef.current = ws;

        ws.onopen = () => setConnected(true)
        ws.onclose = () => setConnected(false)
        ws.onmessage = (e) => {
            try{
                setLastMsg(JSON.parse(e.data))    
            }
            catch{
                setLastMsg(e.data)
            }
        }
        return () => ws.close()
    }, [])

    useEffect(() =>{
        if (!lastMsg) return
        if (lastMsg.type !== "vehicle.move") return

        const {vehicleId, lastgps} = lastMsg.payload;
        setVehicles(prev => ({
            ...prev,
            [vehicleId]: {lastgps}
        }))
    }, [lastMsg])

    return (
        <div>
            <h2>Aktywne Pojazdy</h2>

            {Object.entries(vehicles).map(([id, v]) =>(
                <div key={id}>
                    <p>ID: {id}</p> 
                    <p>GPS: {v.lastgps[0]} {v.lastgps[1]}</p> 
                </div>
            ))
            }
        </div>
    )
}