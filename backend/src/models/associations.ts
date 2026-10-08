import { Bicycle } from "../modules/bicycles/bicycle.model";
import { BicycleDetail } from "../modules/bicycle-details/bicycle-detail.model";
import { Brand } from "../modules/brands/brand.model";
import { Customer } from "../modules/customers/customer.model";
import { Order } from "../modules/orders/order.model";

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

  // Customer 1:N Order (One customer places many orders)
  Customer.hasMany(Order, {
    foreignKey: "customerId",
    as: "orders",
  });
  Order.belongsTo(Customer, {
    foreignKey: "customerId",
    as: "customer",
  });
}