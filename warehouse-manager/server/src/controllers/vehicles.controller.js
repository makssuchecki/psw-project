import * as service from "../services/vehicles.service.js"

export const getAll = (req, res) => {
    const { search } = req.query
    res.json(service.getAll(search))
}

export const getById = (req, res) => {
    const vehicle = service.getById(Number(req.params.id))
    if (!vehicle) return res.sendStatus(404)
    res.json(vehicle)
}

export const create = (req, res) => {
    const vehicle = service.create(req.body)
    res.status(201).json(vehicle)
}

export const update = (req, res) => {
    const vehicle = service.update(Number(req.params.id), req.body)
    if (!vehicle) return res.sendStatus(404)
    res.json(vehicle)
}

export const remove = (req, res) => {
    const ok = service.remove(Number(req.params.id))
    if (!ok) return res.sendStatus(404)
    res.sendStatus(204)
}