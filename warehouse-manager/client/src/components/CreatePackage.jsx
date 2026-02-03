import { useState, useEffect } from "react";
import styles from "./CreatePackage.module.css"

export default function CreatePackage({ api, setPackagesData }) {
    const [code, setCode] = useState("");
    const [vehicleIds, setVehicleIds] = useState([]);
    const [vehicleId, setVehicleId] = useState("");

    useEffect(() => {
        fetch(`${api}/vehicles`, {
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => setVehicleIds(data));
    }, [api]);

    async function createPack(e) {
        e.preventDefault();

        const body = {
            code,
            status: "shipped",
            vehicleId
        };

        await fetch(`${api}/packages`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(body)
        });
        setPackagesData(prev => [...prev, body])
        setCode("");
        setVehicleId("");
    }

    return (
        <div className={styles.mainDiv}>
            <form onSubmit={createPack}>
                <input 
                    className={styles.packName}
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="Podaj nazwę"
                />

                <select
                    className={styles.vehicleSelect}
                    value={vehicleId}
                    onChange={e => setVehicleId(e.target.value)}
                >
                    <option value="">Wybierz pojazd</option>

                    {vehicleIds.map(v => (
                        <option className={styles.optVehicle} key={v.id} value={v.id}>
                            {v.name ?? `Pojazd ${v.id}`}
                        </option>
                    ))}
                </select>
                <button disabled={!vehicleId || !code} className={styles.submitBtn} type="submit">Dodaj paczkę</button>
            </form>
        </div>
    );
}