import * as service from "../services/auth.service.js"

export const login = (req, res) => {
    const { username, password } = req.body

    const token = service.login(username, password)

    if (!token) return res.sendStatus(401).json({ error: "Invalid credentials" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60
    })

    return res.status(200).json({ success: true})
}

export const logout = (req, res) => {
    const token = req.cookies.token;

    service.logout(token)

    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
    });

    return res.status(200).json({ success: true})
}

export const requireAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!service.isAuthenticated(token)){
        return res.status(401).json({ error: "Unauthorized" });
    }
    next()
};

export const logged = (req, res) => {
    const token = req.cookies.token;
    
    if (!token || !service.isAuthenticated(token)){
        return res.status(401).json({ authenticated: false })
    }
    return res.status(200).json({ authenticated: true })
}