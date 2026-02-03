import { useState, useEffect } from "react";
import styles from "./AllVehicles.module.css";

export default function AllVehicles({api, setAllShown}){
    const [vehicles,setVehicles] = useState([])

    useEffect(() => {
        fetch(`${api}/vehicles`, {
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => setVehicles(data));
    }, [api]);


    return (
        <>
            <button className={styles.hideBtn} onClick={() => setAllShown(false)}>Schowaj wszystkie</button>
            <div className={styles.gridDiv}>

                {vehicles.map(v => (
                    <div className={styles.vehicleDiv} key={v.id}>
                        <p>{v.id}</p>
                        <p>{v.plate}</p>
                        <p>{v.driver}</p>

                    </div>
                ))}
            </div>

        </>
    )
}

// vehicle {
// id: int,
// plate: str,
// driver: str,
// status: str,
// lastgps: str,
// }

