import * as model from "../models/alerts.model.js"

export const getAll = (search) => {
    let data = model.getAll()

    if (search){
        data = data.filter(a =>
            a.type.toLowerCase().includes(search.toLowerCase())
        )
    } 
    return data
} 

export const getById = (id) => model.getById(id)

export const create = (alert) => model.create(alert)

export const update = (id, data) => model.update(id, data) 

export const remove = (id) => model.remove(id)