import * as service from "../services/auth.service.js"

export const login = (req, res) => {
    const { username, password } = req.body
    const token = service.login(username, password)

    if (!token) return res.sendStatus(401)

    res.json({ token })
}

export const logout = (req, res) => {
    const token = req.headers.authorization
    if (!token) return res.sendStatus(400)
    service.logout(token)
    res.sendStatus(204)
}

