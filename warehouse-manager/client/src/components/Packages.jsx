import { useState, useEffect } from "react";

export default function Packages({ token, api }) {
    const [packagesData, setPackagesData] = useState([])
    const [input, setInput] = useState("")

    useEffect(() => {
        const url = input ? `${api}/packages?search=${input}` : `${api}/packages` 
        fetch(url)
        .then(response => response.json())
        .then(data => setPackagesData(data))
    }, [input, api, token]);

    const deleteDelilvered = async (id) => {
        fetch(`${api}/packages/${id}`, {
            method: "DELETE"
        }) 
        setPackagesData(prev => prev.filter(p => p.id !== id))
    }
    return (
        <div>
            <h2>Panel przesyłek</h2>
            { packagesData.length === 0 && (<p>Brak aktywnych przesyłek</p>)}  
            <label>Wyszukaj</label>
            <input onChange={(e) => setInput(e.target.value)} placeholder="Nazwa przesyłki"/>
            {packagesData.map(p => (
                <div key={p.id}>
                    <p>{p.id} - {p.code} - {p.status}</p>
                    {p.status === "delivered" && (<button onClick={() => deleteDelilvered(p.id)}>Usuń</button>)} 
                </div>
            ))}
        </div>
    )
}