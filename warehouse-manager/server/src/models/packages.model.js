import crypto from "crypto";

const packages = [
    { "id": 1, "code": "paczka1", "vehicleId": "vehicle-1", "status": "in_transit"},
    { "id": 2, "code": "paczka2", "vehicleId": "vehicle-1", "status": "delivered"}
]

export const getAll = () => packages

export const getById = (id) => {
    return packages.find(p => p.id === id)

}

export const create = (pack) => {
    const newPack = { id: crypto.randomUUID(), ...pack }
    packages.push(newPack)
    return newPack
}

export const update = (id, data) => {
    const idx = packages.findIndex(p => p.id === id) 
    if (idx === -1) return null

    packages[idx] = { ...packages[idx], ...data }
    return packages[idx]
}

export const remove = (id) => {
    const idx = packages.findIndex(p => p.id === id) 
    if (idx === -1) return null

    packages.splice(idx, 1)
    return true
}

// packages {
// id: int
// code: str
// vehicleId: str	
// status: str
// }
