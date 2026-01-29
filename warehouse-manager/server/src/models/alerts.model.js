import crypto from "crypto";

const alerts = []

export const getAll = () => alerts

export const getById = (id) => {
    return alerts.find(a => a.id == id)
}

export const create = (alertData) => {
    const newAlert = { id: crypto.randomUUID(), ...alertData }
    alerts.push(newAlert)
    return newAlert
}

export const update = (id, data) => {
    const idx = alerts.findIndex(a => a.id === id)
    if (idx === -1) return

    alerts[idx] = { ...alerts[idx], ...data }
    return alerts[idx]
} 


export const remove = (id) => {
    const idx = alerts.findIndex(a => a.id === id)
    if (idx === -1) return

    alerts.splice(idx, 1)
    return true
}

export const clearAll = () => alerts.length = 0
// alerts{
// id: int,
// type: str,
// severity: str,
// message: str,
// createdAt: str
// }
