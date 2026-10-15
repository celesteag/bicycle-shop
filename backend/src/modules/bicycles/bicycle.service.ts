import { Bicycle } from "./bicycle.model";
import { BicycleDetail } from "../bicycle-details/bicycle-detail.model";
import { Brand } from "../brands/brand.model";
import { BicycleModel } from "../models/bicycleModel.model";
import { Op } from "sequelize";

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
    modelId: number;
    description?: string | null;
    price: number;
    stock: number;
  }) {
    return Bicycle.create(data);
  }

  // Corregido: tipado actualizado a claves foráneas numéricas
  static async update(
    bicycle: Bicycle,
    data: {
      brandId?: number;
      modelId?: number;
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

  // Punto 2 del examen: JOIN con Brand y BicycleModel
  static async findAllWithBrandAndModel() {
    return Bicycle.findAll({
      include: [
        { model: Brand, as: "brand" },
        { model: BicycleModel, as: "model" },
      ],
      order: [["id", "ASC"]],
    });
  }

  // Punto 3 del examen: Operador Op.gt sobre price
  static async findBicyclesWithPriceGreaterThan100() {
    return Bicycle.findAll({
      where: {
        price: {
          [Op.gt]: 100, // gt operator
        },
      },
      order: [["price", "ASC"]],
    });
  }
}