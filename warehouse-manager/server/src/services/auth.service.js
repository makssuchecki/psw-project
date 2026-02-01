import { users, sessions } from "../models/auth.model.js"
import crypto from "crypto"
import bcrypt from "bcrypt";

export const login = async (username, password) => {
    const user = users.find(u => u.username === username)
    if (!user) return null

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return null

    const token = crypto.randomUUID()
    sessions.set(token, user.id)

    return token
}

export const logout = (token) => {
    return sessions.delete(token)
}

export const isAuthenticated = (token) => {
    return token && sessions.has(token)
}

