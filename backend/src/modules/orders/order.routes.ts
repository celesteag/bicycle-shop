import { Router } from "express";
import { OrderController } from "./order.controller";

const router = Router();

router.get("/", OrderController.getAll);

router.get("/orders/:id", OrderController.getByCustomerId);

router.get("/:id", OrderController.getById);

router.post("/", OrderController.create);

router.put("/:id", OrderController.update);

router.delete("/:id", OrderController.delete);

// Endpoint to get detailed order (order -> items -> bicycle)
router.get("/detailed/:id", OrderController.getDetailedOrderById);

export default router;
