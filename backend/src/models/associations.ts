import { Bicycle } from "../modules/bicycles/bicycle.model";
import { BicycleDetail } from "../modules/bicycle-details/bicycle-detail.model";
import { Brand } from "../modules/brands/brand.model";

//all model associations for Sequelize ORM

export function defineAssociations() {
  // Brand 1:N Bicycle (One brand manufactures many bicycles)
  // must be the same name than include in service.ts
  Brand.hasMany(Bicycle, { foreignKey: "brandId", as: "bicycles" });
  Bicycle.belongsTo(Brand, { foreignKey: "brandId", as: "brand" });
  
  // Bicycle 1:1 BicycleDetail (One bicycle owns one detail)
  Bicycle.hasOne(BicycleDetail, {
    foreignKey: "bicycleId",
    as: "detail", // Alias used in eager loading include
    onDelete: "CASCADE",
  });
  BicycleDetail.belongsTo(Bicycle, {
    foreignKey: "bicycleId",
    as: "bicycle",
  });
}