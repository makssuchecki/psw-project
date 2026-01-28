import * as model from "../models/packages.model.js"
import client from "../mqtt/client.js"

client.on("message", (topic, message) => {
    const data = JSON.parse(message.toString())

    if (topic === "packages/status"){
        const { packageId, statusUpdate } = data

        update(packageId, {status: statusUpdate})
    }
})

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

