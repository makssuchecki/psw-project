import { useState } from 'react'

const API = "http://localhost:3000"

export default function App(){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState(null)
  const [packages, setPackages] = useState([])
  const [error, setError] = useState("")
  const login = async() => {
    const res = await fetch (`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
    if (!res.ok) {
      setError("Nieprawidłowy login lub hasło")
    }else{
      setError("")
    }
    const data = await res.json()
    setToken(data.token)
  }

  const loadPackages = async () => {
     const res = await fetch(`${API}/packages`, {
      headers: { Authorization: token }
     })
     setPackages(await res.json())
  }

  return (
    <div>

      <h2>Login</h2>
      <input
        placeholder="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {error && (<p>{error}</p>)}
      <button onClick={login}>Login</button>

      <hr />

      <button onClick={loadPackages} disabled={!token}>
        Pobierz paczki
      </button>

      <pre>{JSON.stringify(packages, null, 2)}</pre>
    </div>
  )
}