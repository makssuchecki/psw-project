import * as model from "../models/sensors.model.js"

export const getAll = (search) => {
    let data = model.getAll()

    if (search) {
        data = data.filter(v => 
            v.type.toLowerCase().includes(search.toLowerCase())
        )
    }

    return data
}

export const getById = (id) => model.getById(id)


export const create = (sensor) => model.create(sensor)

export const update = (id, data) => model.update(id, data)

export const remove = (id) => model.remove(id)
