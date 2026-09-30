import { BicycleDetail } from "./bicycle-detail.model";

export class BicycleDetailService {
  static async findAll() {
    return BicycleDetail.findAll({
      order: [["id", "ASC"]],
    });
  }

  static async findById(id: number) {
    return BicycleDetail.findByPk(id);
  }

  static async findByBicycleId(bicycleId: number) {
    return BicycleDetail.findOne({
      where: { bicycleId },
    });
  }

  static async create(data: {
    bicycleId: number;
    frameMaterial: "Aluminum" | "Carbon" | "Steel" | "Titanium";
    wheelSize: number;
    weight: number;
    suspension?: string | null;
  }) {
    return BicycleDetail.create(data);
  }

  static async update(
    detail: BicycleDetail,
    data: {
      frameMaterial?: "Aluminum" | "Carbon" | "Steel" | "Titanium";
      wheelSize?: number;
      weight?: number;
      suspension?: string | null;
    }
  ) {
    return detail.update(data);
  }

  static async delete(detail: BicycleDetail) {
    await detail.destroy();
  }
}