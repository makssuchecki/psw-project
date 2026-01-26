import * as model from "../models/sensors.model.js"
import client from "../mqtt/client.js"

let tempMeasurements = [{"value": "20", "unit": "C", "timestamp": new Date()}]
let humidityMeasurements = [{"value": "70", "unit": "%", "timestamp": new Date()}]

client.on("message", (topic, message) => {
    const data = JSON.parse(message.toString())
    
    if (topic === "sensors/temperature"){
        const value = Number(data.value)
        tempMeasurements.push({
            value: value,
            unit: "C",
            timestamp: new Date()
        })
        
        if (tempMeasurements.length > 100){
            tempMeasurements.shift()
        }
        console.log("New temperature measurement: ", data)
    }
    
    if (topic === "sensors/humidity"){
        
        humidityMeasurements.push({
            value: data.value,
            unit: "%",
            timestamp: new Date()
        })
        
        if (humidityMeasurements.length > 100){
            humidityMeasurements.shift()
        }
        console.log("New humidity measurement: ", data)
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


