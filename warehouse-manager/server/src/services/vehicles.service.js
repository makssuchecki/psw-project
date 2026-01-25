import * as model from "../models/vehicles.model.js"

export const getAll = (search) => {
    let data = model.getAll()

    if (search) {
        data = data.filter(v => 
            v.plate.toLowerCase().includes(search.toLowerCase())
        )
    }

    return data
}

export const getById = (id) => model.getById(id)


export const create = (vehicle) => model.create(vehicle)

export const update = (id, data) => model.update(id, data)

export const remove = (id) => model.remove(id)
