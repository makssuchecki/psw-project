import { useState, useEffect } from "react";

export default function Packages({ token, api }) {
    const [packagesData, setPackagesData] = useState([])

    useEffect(() => {
        fetch(`${api}/packages`, {
            method: "GET",
            headers: { Authorization: token }
        })
        .then(response => response.json())
        .then(data => setPackagesData(data))
        .catch(err => console.error(err));
    }, [api, token]);

    return (
        <div>
            <h2>Wszystkie przesyłki</h2>
            {packagesData.map(p => (
                <div key={p.id}>
                    <p>{p.id} - {p.code} - {p.status}</p>
                </div>
            ))}
        </div>
    )
}