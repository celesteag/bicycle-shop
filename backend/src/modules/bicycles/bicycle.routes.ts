import { Router } from "express";
import { BicycleController } from "./bicycle.controller";

const router = Router();

// Eager loading route
router.get("/eagerly/:id", BicycleController.getEagerlyById);

router.get("/eagerly/frame-material/:frameMaterial", BicycleController.getAllEagerlyByFrameMaterial);

router.get("/", BicycleController.getAll);

router.get("/:id", BicycleController.getById);

router.post("/", BicycleController.create);

router.put("/:id", BicycleController.update);

router.delete("/:id", BicycleController.delete);


export default router;