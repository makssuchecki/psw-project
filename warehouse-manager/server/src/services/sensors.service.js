import * as model from "../models/sensors.model.js"
import client from "../mqtt/client.js"

let broadcast = () => {}
export const setBroadcast = (fn) => {
    broadcast = typeof fn === "function" ? fn : () => {};
}
let tempMeasurements = [{"type": "sensor.temperature", "value": "20", "unit": "C", "timestamp": new Date()}]
let humidityMeasurements = [{"type": "sensor.humidity","value": "70", "unit": "%", "timestamp": new Date()}]

client.on("message", (topic, message) => {
    const data = JSON.parse(message.toString())
    
    if (topic === "sensors/temperature"){
        const value = Number(data.value)
        const tempData = {
            type: "sensor.temperature",
            value: value,
            unit: "C",
            timestamp: new Date()
        }
        
        tempMeasurements.push(tempData)
        if (tempMeasurements.length > 100) tempMeasurements.shift()
        
        broadcast(tempData)
    }
    
    if (topic === "sensors/humidity"){
        const humData = {
            type: "sensor.humidity",
            value: data.value,
            unit: "%",
            timestamp: new Date()
        }
        humidityMeasurements.push(humData)
        
        if (humidityMeasurements.length > 100) humidityMeasurements.shift()

        broadcast(humData)
    }
})

export const getTemperature = () => tempMeasurements.at(-1) || null

export const getHumidity = () => humidityMeasurements.at(-1) || null

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


