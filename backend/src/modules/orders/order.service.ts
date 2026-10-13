import { Order } from "./order.model";
import { Customer } from "../customers/customer.model";
import { Bicycle } from "../bicycles/bicycle.model";
import { BicycleDetail } from "../bicycle-details/bicycle-detail.model";
import { OrderItem } from "../order-items/order-item.model";
import {Op} from "sequelize";

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

    // Find order by id with items
    static async findDetailedOrderById(orderId: number) {
        return Order.findByPk(orderId, {
            include: [
                {
                    model: OrderItem,
                    as: "items",
                    attributes: ["id", "quantity", "unitPrice"],
                    include: [
                        {
                            model: Bicycle,
                            as: "bicycle",
                            attributes: ["id", "model", "price", "stock"],
                        },
                    ],
                },
            ],
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

    static async findOrdersWithCheapAndHeavyBicycles() {
        return Order.findAll({
            include: [
                {
                    model: OrderItem,
                    as: "orderItems",
                    required: true, // Inner join
                    include: [
                        {
                            model: Bicycle,
                            as: "bicycle",
                            required: true,
                            where: {
                                price: {
                                    [Op.lt]: 100, // Price less than 100
                                },
                            },
                            include: [
                                {
                                    model: BicycleDetail,
                                    as: "bicycleDetail",
                                    required: true,
                                    where: {
                                        weight: {
                                            [Op.gt]: 20, // Weight greater than 20
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
            order: [["id", "ASC"]],
        });
    }
}