import { useState,useEffect } from "react";
import { useWebSocket } from "../hooks/useWebSocket";

export default function VehiclesLive() {
    const { lastMsg } = useWebSocket("wss://localhost:3000")
    const [vehicles, setVehicles] = useState({})

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