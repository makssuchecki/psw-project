let packages = []
let nextId = 1

export const getAll = () => packages

export const getById = (id) => {
    return packages.find(p => p.id === id)

}

export const create = (pack) => {
    const newPack = { id: nextId++, ...pack }
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