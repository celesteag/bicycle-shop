import { BicycleModel } from "./bicycleModel.model";
import { Bicycle } from "../bicycles/bicycle.model";
import { Op } from "sequelize";

export class ModelService {

    static async findAll() {
        return BicycleModel.findAll({
            order: [["id", "ASC"]],
        });
    }


    static async findById(id: number) {
        return BicycleModel.findByPk(id);
    }

    
    static async findByIdWithBicycles(id: number) {
    return BicycleModel.findByPk(id, {
      include: [
        {
          model: Bicycle,
          as: "bicycles",
        },
      ],
    });
  }

    static async create(data: {
        name: string
    }) {
        return BicycleModel.create(data);
    }


    static async update(
        model: BicycleModel,
        data: {
            name: string;
        }
    ) {
        return model.update(data);
    }


    static async delete(model: BicycleModel) {
        await model.destroy();
    }

}