import * as service from "../services/packages.service.js"

export const getAll = (req, res) => {
    const { search } = req.query
    res.json(service.getAll(search))
}