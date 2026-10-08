import { Order } from "./order.model";
import { Customer } from "../customers/customer.model";

type statusTypes = "pending" | "shipped" | "paid" | "cancelled";

export class OrderService {

    static async findAll() {
        return Order.findAll({
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return Order.findByPk(id);
    }

    static async findByCustomerId(customerId: number) {
        return Order.findAll({
            where: { customerId },
            include: [{
                model: Customer,
                // same name than associations.ts
                as: "customer",
                // decide what attributes select sql
                attributes: ["id", "name", "email"]
            }],
            order: [["orderDate", "DESC"]],
        });
    }

    static async create(data: {
        customerId: number;
        orderDate?: Date;
        status?: statusTypes;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        return Order.create(data);
    }

    //posibility to update diferents
    static async update(
        order: Order,
        data: Partial<{
            customerId: number;
            orderDate: Date;
            status: statusTypes;
        }>
    ) {
        return order.update(data);
    }


    static async delete(order: Order) {
        await order.destroy();
    }
}