import { useState, useEffect } from "react";

export default function Packages({ api }) {
    const [packagesData, setPackagesData] = useState([])
    const [input, setInput] = useState("")

    useEffect(() => {
        const url = input ? `${api}/packages?search=${input}` : `${api}/packages` 
        fetch(url, {
            method: "GET",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => setPackagesData(data))
    }, [input, api]);

    const deleteDelivered = async (id) => {
        await fetch(`${api}/packages/${id}`, {
            method: "DELETE",
            credentials: "include"
        }) 
        setPackagesData(prev => prev.filter(p => p.id !== id))
    }
    return (
        <div>
            <h2>Panel przesyłek</h2>
            <label>Wyszukaj</label>
            <input onChange={(e) => setInput(e.target.value)} placeholder="Nazwa przesyłki"/>
            {Array.isArray(packagesData) && packagesData.map(p => (
                <div key={p.id}>
                    <p>{p.id} - {p.code} - {p.status}</p>
                    {p.status === "delivered" && (<button onClick={() => deleteDelivered(p.id)}>Usuń</button>)} 
                </div>
            ))}
            { packagesData.length === 0 && (<p>Brak aktywnych przesyłek</p>)}  
        </div>
    )
}