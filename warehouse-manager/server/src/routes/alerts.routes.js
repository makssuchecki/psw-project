import * as controller from "../controllers/alerts.controller.js"
import { Router } from "express"

const router = Router()

router.get("/", controller.getAll)
router.get("/:id", controller.getById)
router.post("/", controller.create)
router.put("/:id", controller.update)
router.delete("/:id", controller.remove)
router.delete("/", controller.clearAll)

export default router