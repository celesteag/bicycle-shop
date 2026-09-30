import { Request, Response, NextFunction } from "express";
import { BicycleDetailService } from "./bicycle-detail.service";

export class BicycleDetailController {
  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const details = await BicycleDetailService.findAll();
      res.json(details);
    } catch (error) {
      next(error);
    }
  }

  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Number(req.params.id);
      const detail = await BicycleDetailService.findById(id);

      if (!detail) {
        res.status(404).json({
          message: "Bicycle detail not found",
        });
        return;
      }

      res.json(detail);
    } catch (error) {
      next(error);
    }
  }

  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { bicycleId, frameMaterial, wheelSize, weight, suspension } = req.body;

      if (!bicycleId || !frameMaterial || wheelSize === undefined || weight === undefined) {
        res.status(400).json({
          message: "bicycleId, frameMaterial, wheelSize, and weight are required",
        });
        return;
      }

      const existingDetail = await BicycleDetailService.findByBicycleId(Number(bicycleId));
      if (existingDetail) {
        res.status(409).json({
          message: "A bicycle detail already exists for this bicycle (1:1 relationship)",
        });
        return;
      }

      const detail = await BicycleDetailService.create({
        bicycleId: Number(bicycleId),
        frameMaterial,
        wheelSize: Number(wheelSize),
        weight: Number(weight),
        suspension: suspension || null,
      });

      res.status(201).json(detail);
    } catch (error) {
      next(error);
    }
  }

  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Number(req.params.id);
      const detail = await BicycleDetailService.findById(id);

      if (!detail) {
        res.status(404).json({
          message: "Bicycle detail not found",
        });
        return;
      }

      const updatedDetail = await BicycleDetailService.update(detail, req.body);
      res.json(updatedDetail);
    } catch (error) {
      next(error);
    }
  }

  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Number(req.params.id);
      const detail = await BicycleDetailService.findById(id);

      if (!detail) {
        res.status(404).json({
          message: "Bicycle detail not found",
        });
        return;
      }

      await BicycleDetailService.delete(detail);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}