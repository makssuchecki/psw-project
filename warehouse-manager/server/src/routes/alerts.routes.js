import * as controller from "../controllers/alerts.controller.js"
import { Router } from "express"
import { requireAuth } from "../controllers/auth.controller.js"

const router = Router()

router.use(requireAuth);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.delete("/", controller.clearAll);

export default router;