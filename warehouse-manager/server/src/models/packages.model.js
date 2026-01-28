import crypto from "crypto";

const packages = [
    { "id": 1, "code": "paczka1", "vehicleId": "a-1", "status": "in_transit", "targetTempRange": "0-30"},
    { "id": 2, "code": "paczka2", "vehicleId": "a-1", "status": "delivered", "targetTempRange": "0-30"}
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
// targetTempRange: str
// }
