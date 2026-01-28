import * as model from "../models/vehicles.model.js"
import client from "../mqtt/client.js"


client.on("message", (topic, message) => {
    const data = JSON.parse(message.toString())

    if (topic === "vehicles/location"){
        const { longitude, latitude, vehicleId } = data
        update(vehicleId, {lastgps: [longitude, latitude]})
    }
})

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
