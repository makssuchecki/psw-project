import * as model from "../models/packages.model.js"

export const getAll = (search) => {
    let data = model.getAll()

    if (search) {
        data = data.filter(p => 
            p.code.toLowerCase().includes(search.toLowerCase())
        )
    }

    return data
}

export const getById = (id) => model.getById(id)


export const create = (pack) => model.create(pack)

export const update = (id, data) => model.update(id, data)

export const remove = (id) => model.remove(id)
