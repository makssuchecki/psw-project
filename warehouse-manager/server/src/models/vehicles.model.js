import crypto from "crypto";

export const vehicles = [{"id": 1, "plate": "GD00000", "driver": "Jan Kowalski", "status":"active", "lastgps": [54.0, 18.0]}]

export const getAll = () => vehicles

export const getById = (id) => {
    return vehicles.find(v => v.id === id)
}

export const create = (vehicle) => {
    const newVehicle = { id: crypto.randomUUID(), ...vehicle }
    vehicles.push(newVehicle)
    return newVehicle
}

export const update = (id, data) => {
    const idx = vehicles.findIndex(v => v.id === id) 
    if (idx === -1) return null

    vehicles[idx] = { ...vehicles[idx], ...data }
    return vehicles[idx]
}

export const remove = (id) => {
    const idx = vehicles.findIndex(v => v.id === id) 
    if (idx === -1) return null

    vehicles.splice(idx, 1)
    return true
}

// vehicle {
// id: int,
// plate: str,
// driver: str,
// status: str,
// lastgps: str,
// }

