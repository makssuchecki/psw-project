import { users, sessions } from "../models/auth.model.js"
import crypto from "crypto"

export const login = (username, password) => {
    const user = users.find(
        u => u.username === username && u.password === password
    )
    if (!user) return null

    const token = crypto.randomUUID()
    sessions.set(token, user.id)

    return token
}

export const logout = (token) => {
    return sessions.delete(token)
}

export const isAuthenticated = (token) => {
    return sessions.has(token)
}
