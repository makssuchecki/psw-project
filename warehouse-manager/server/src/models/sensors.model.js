export const sensors = []

export const getAll = () => sensors

export const getById = (id) => {
    return sensors.find(s => s.id === id)
}

export const create = (sensor) => {
    const newSensor = { id: nextId++, ...sensor }
    sensors.push(newSensor)
    return newSensor
}

export const update = (id, data) => {
    const idx = sensors.findIndex(s => s.id === id) 
    if (idx === -1) return null

    sensors[idx] = { ...sensors[idx], ...data }
    return sensors[idx]
}

export const remove = (id) => {
    const idx = sensors.findIndex(v => v.id === id) 
    if (idx === -1) return null

    sensors.splice(idx, 1)
    return true
}


// sensors{
// id: int,
// type: str,
// assignedTo: str,
// lastSeen
// }