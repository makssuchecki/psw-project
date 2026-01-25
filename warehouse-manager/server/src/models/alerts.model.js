const alerts = []
let nextId = 1

export const getAll = () => alerts

export const getById = (id) => {
    return alerts.find(a => a.id == id)
}

export const create = (alertData) => {
    const newAlert = { id: nextId++, ...alertData }
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

// alerts{
// id: int,
// type: str,
// severity: str,
// message: str,
// createdAt: str
// }
