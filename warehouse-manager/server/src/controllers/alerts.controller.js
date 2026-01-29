import * as service from "../services/alerts.service.js"

export const getAll = (req, res) => {
    const { search } = req.query
    res.json(service.getAll(search))
}

export const getById = (req, res) => {
    const alert = service.getById(Number(req.params.id))
    if (!alert) return res.sendStatus(404)
    res.json(alert)
}

export const create = (req, res) => {
    const alert = service.create(req.body)
    res.status(201).json(alert)
}

export const update = (req, res) => {
    const alert = service.update(Number(req.params.id), req.body)
    if (!alert) return res.sendStatus(404)
    res.json(alert)
}

export const remove = (req, res) => {
    const ok = service.remove(Number(req.params.id))
    if (!ok) return res.sendStatus(404)
    res.sendStatus(204)
}
export const clearAll = (req, res) => {
    service.clearAll()
    res.sendStatus(204)
}
