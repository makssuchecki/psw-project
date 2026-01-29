import * as model from "../models/alerts.model.js"
import crypto from "crypto"

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

export const createOverheatAlert = () => {
    const alert = {
        id: crypto.randomUUID(),
        type: "overheat",
        severity: "high",
        message: "temperature over 30",
        createdAt: new Date()
    }
    create(alert)
    return alert
}

export const createCustomAlert = (message, severity) =>{ 
    const alert = {
        id: crypto.randomUUID(),
        type: "manual",
        severity,
        message,
        createdAt: new Date()
    }
    create(alert)
    return alert
}
export const clearAll = () => model.clearAll()
