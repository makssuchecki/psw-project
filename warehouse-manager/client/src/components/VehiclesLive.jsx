import { useState,useEffect, useRef } from "react";
import styles from "./VehiclesLive.module.css";
import AllVehicles from "./allVehicles";

export default function VehiclesLive({api}) {
    const [connected, setConnected] = useState(null);
    const [lastMsg, setLastMsg] = useState(null);
    const wsRef = useRef(null);
    const [vehicles, setVehicles] = useState({})
    const [allShown, setAllShown] = useState(false)
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
        <div className={styles.mainDiv}>
            <p className={styles.mainTitle}>Aktywne Pojazdy</p>
            {Object.keys(vehicles).length === 0 && (<p className={styles.noActive}>Brak aktywnych pojazdów</p>)}
            <div className={styles.vehicleGrid}>
                {Object.entries(vehicles).map(([id, v]) =>(
                    <div className={styles.vehicleDiv} key={id}>
                        <p>ID: {id}</p> 
                        <p>GPS:</p>
                        <div className={styles.gpsCircle}>
                            <p>{v.lastgps[0].toFixed(4)} </p> 
                            <p>{v.lastgps[1].toFixed(4)}</p>
                        </div>
                    </div>
                ))
                }
            </div>
            {!allShown 
                ?  <button className={styles.showBtn} onClick={() => setAllShown(!allShown)}>Pokaż wszystkie</button> 
                : <AllVehicles api={api} setAllShown={setAllShown} />}
        </div>
    )
}