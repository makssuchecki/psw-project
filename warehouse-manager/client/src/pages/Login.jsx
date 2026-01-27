import { useState } from "react"

export default function Login({ setToken, api }){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const login = async(e) => {
        e.preventDefault()

        const res = await fetch (`${api}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
        })

        if (!res.ok) {
            setError("Nieprawidłowy login lub hasło")
            return
        }

        const data = await res.json()
        setToken(data.token)
    }
    return (
        <form onSubmit={login}>
            <input placeholder="username" onChange={e => setUsername(e.target.value)}/>
            <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)}/>
            {error && (<p>{error}</p>)}
            <button type="submit">Login</button>
        </form>
    )
}