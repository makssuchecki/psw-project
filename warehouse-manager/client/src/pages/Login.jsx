import { useState } from "react"
import styles from "./Login.module.css" 

export default function Login({ setToken, api }){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    
    const login = async(e) => {
        e.preventDefault()

        const res = await fetch (`${api}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password })
        })

        if (!res.ok) {
            setError("Nieprawidłowy login lub hasło")
            return
        }

        setToken(true)
    }
    return (
        <div className={styles.wrapDiv}>
            <div className={styles.contentDiv}>
                <h2 className={styles.mainTitle}>Warehouse Manager</h2>
                <p>Zaloguj się</p>
                <form onSubmit={login} className={styles.mainForm}>
                    <input className={styles.userInput} placeholder="username" onChange={e => setUsername(e.target.value)}/>
                    <input className={styles.passwordInput} placeholder="password" type="password" onChange={e => setPassword(e.target.value)}/>
                    <button className={styles.loginBtn}type="submit">Login</button>
                    {error && (<p className={styles.loginError}>{error}</p>)}
                </form>
            </div>
        </div>

    )
}