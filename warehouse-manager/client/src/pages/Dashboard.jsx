import { useState } from "react";
import SensorsLive from "../components/SensorsLive";

export default function Dashboard({token, logout, api}){
    const [packages, setPackages] = useState([]);

    const loadPackages = async () => {
        const res = await fetch(`${api}/packages`, {
        headers: { Authorization: token }
        })
        setPackages(await res.json())
    }

    return (
        <div>
            <p>{token}</p>
            <button onClick={logout}>Wyloguj</button>

            <button onClick={loadPackages}>
                Pobierz paczki
            </button>

            <pre>{JSON.stringify(packages, null, 2)}</pre>
            <SensorsLive />
        </div>
    )
}