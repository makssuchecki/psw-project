import * as service from "../services/packages.service.js"

export const getAll = (req, res) => {
    const { search } = req.query
    res.json(service.getAll(search))
}

export const getById = (req, res) => {
    const pack = service.getById(Number(req.params.id))
    if (!pack) return res.sendStatus(404)
    res.json(pack)
}

export const create = (req, res) => {
    const pack = service.create(req.body)
    res.status(201).json(pack)
}

export const update = (req, res) => {
    const pack = service.update(Number(req.params.id), req.body)
    if (!pack) return res.sendStatus(404)
    res.json(pack)
}

export const remove = (req, res) => {
    const ok = service.remove(Number(req.params.id))
    if (!ok) return res.sendStatus(404)
    res.sendStatus(204)
}