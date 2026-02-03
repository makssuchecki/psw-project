import { useState, useEffect } from "react";
import styles from "./Packages.module.css";
import CreatePackage from "./CreatePackage";
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
        <div className={styles.mainDiv}>
            <p className={styles.mainTitle}>Panel przesyłek</p>
            <CreatePackage api={api} setPackagesData={setPackagesData}/>
            <input className={styles.inputPackage} onChange={(e) => setInput(e.target.value)} placeholder="Wyszukaj przesyłkę"/>
            <div className={styles.packageGrid}>
                {Array.isArray(packagesData) && packagesData.map(p => (
                    <div className={`${styles.packageDiv} ${styles[p.status]}`} key={p.id}>
                        <p>{p.code}</p>
                        {p.status === "delivered" ? (<p>Dostarczona</p>) : (<p>W transporcie</p>)}
                        {p.status === "delivered" && (<button className={styles.deleteBtn} onClick={() => deleteDelivered(p.id)}>Usuń</button>)} 
                    </div>
                ))}
            </div>
            { packagesData.length === 0 && (<p className={styles.noPacks}>Brak aktywnych przesyłek</p>)}  
        </div>
    )
}