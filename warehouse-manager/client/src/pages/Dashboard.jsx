import { use, useState } from "react";
import SensorsLive from "../components/SensorsLive";

export default function Dashboard({token, logout, api}){
    const [packages, setPackages] = useState([]);
    const [error, setError] = useState("")
    const loadPackages = async () => {
        try{
            const res = await fetch(`${api}/packages`, {
            headers: { Authorization: token }
            })
            setPackages(await res.json())
        }catch(e){
            setError(e)
        }
        }

    return (
        <div>
            <p>{token}</p>
            <button onClick={logout}>Wyloguj</button>

            <button onClick={loadPackages}>
                Pobierz paczki
            </button>
            {error && (<p>{error}</p>)}
            <pre>{JSON.stringify(packages, null, 2)}</pre>
            <SensorsLive />
        </div>
    )
}