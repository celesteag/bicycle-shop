import { Bicycle } from "./bicycle.model";
import { BicycleDetail } from "../bicycle-details/bicycle-detail.model";
import { Brand } from "../brands/brand.model";

export class BicycleService {

  static async findAll() {
    return Bicycle.findAll({
      order: [["id", "ASC"]],
    });
  }


  static async findById(id: number) {
    return Bicycle.findByPk(id);
  }


  static async create(data: {
    brandId: number;
    model: string;
    description?: string | null;
    price: number;
    stock: number;
  }) {
    return Bicycle.create(data);
  }


  static async update(
    bicycle: Bicycle,
    data: {
      model?: string;
      description?: string | null;
      price?: number;
      stock?: number;
    }
  ) {
    return bicycle.update(data);
  }


  static async delete(bicycle: Bicycle) {
    await bicycle.destroy();
  }

  // Executes a LEFT JOIN on the brands table using the declared association alias
  static async findEagerlyById(id: number) {
    return Bicycle.findByPk(id, {
      include: [
        {
          model: Brand,
          as: "brand", // Association alias defined in associations.ts
        },
      ],
    });
  }

  static async findAllEagerlyByFrameMaterial(frameMaterial: string) {
  return Bicycle.findAll({
    include: [
      {
        model: BicycleDetail,
        as: "detail", // Matches the alias configured in associations.ts
        where: {
          frameMaterial, // Placing inside the include filters
        },
      },
    ],
    order: [["id", "ASC"]],
  });
}
}