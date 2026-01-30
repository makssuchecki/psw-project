import * as controller from "../controllers/sensors.controller.js"
import { Router } from "express"
import { requireAuth } from "../controllers/auth.controller.js";

const router = Router();

router.use(requireAuth);

router.get("/", controller.getAll)

router.get("/temperature", controller.getTemperature)
router.get("/humidity", controller.getHumidity)

router.get("/:id", controller.getById)
router.post("/", controller.create)
router.put("/:id", controller.update)
router.delete("/:id", controller.remove)

export default router