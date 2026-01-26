import * as service from "../services/sensors.service.js"

export const getAll = (req, res) => {
    const { search } = req.query
    res.json(service.getAll(search))
}

export const getById = (req, res) => {
    const sensor = service.getById(Number(req.params.id))
    if (!sensor) return res.sendStatus(404)
    res.json(sensor)
}

export const create = (req, res) => {
    const sensor = service.create(req.body)
    res.status(201).json(sensor)
}

export const update = (req, res) => {
    const sensor = service.update(Number(req.params.id))
    if (!sensor) return res.sendStatus(404)
    res.json(sensor)
}

export const remove = (req, res) => {
    const ok = service.remove(Number(req.params.id))
    if (!ok) return res.sendStatus(404)
    res.sendStatus(204)
}

export const getTemperature = (req, res) => {
    const temp = service.getTemperature()

    if (!temp) {
        return res.status(204).send()
    }
    res.json(temp)
}

export const getHumidity = (req, res) => {
    const humidity = service.getHumidity()

    if (!humidity) {
        return res.status(204).send()
    }
    res.json(humidity)
}
