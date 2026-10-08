import { Bicycle } from "../modules/bicycles/bicycle.model";
import { BicycleDetail } from "../modules/bicycle-details/bicycle-detail.model";
import { Brand } from "../modules/brands/brand.model";
import { Customer } from "../modules/customers/customer.model";
import { Order } from "../modules/orders/order.model";
import { OrderItem } from "../modules/order-items/order-item.model";

//all model associations for Sequelize ORM

export function defineAssociations() {
  // Brand 1:N Bicycle (One brand manufactures many bicycles)
  // must be the same name than include in service.ts
  Brand.hasMany(Bicycle, { foreignKey: "brandId", as: "bicycles" });
  Bicycle.belongsTo(Brand, { foreignKey: "brandId", as: "brand" });
  // Direct associations with the join table OrderItem
  Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
  OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });

  Bicycle.hasMany(OrderItem, { foreignKey: "bicycleId", as: "orderItems" });
  OrderItem.belongsTo(Bicycle, { foreignKey: "bicycleId", as: "bicycle" });
  

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


  // Order N:M Bicycle (through OrderItem)
  // Order 1:N OrderItem (One order places many orders items)
  Order.belongsToMany(Bicycle, {
    through: OrderItem,
    foreignKey: "orderId",
    otherKey: "bicycleId",
    as: "bicycles",
  });

  // Bicycle 1:N OrderItem (One bicycle places many orders items)
  Bicycle.belongsToMany(Order, {
    through: OrderItem,
    foreignKey: "bicycleId",
    otherKey: "orderId",
    as: "orders",
  });

}