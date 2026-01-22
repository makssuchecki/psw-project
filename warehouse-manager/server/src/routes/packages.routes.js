import { controller } from "../controllers/packages.controller.js"
import { Router } from "express"

const router = Router()

router.get("/", controller.getAll)
router.get("/:id", controller.getById)
router.post("/", controller.create)
router.put("/:id", controller.update)
router.delete("/:id", controller.remove)

export default router