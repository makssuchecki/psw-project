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