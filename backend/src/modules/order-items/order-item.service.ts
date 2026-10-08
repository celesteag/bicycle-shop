import { OrderItem } from "../order-items/order-item.model";

export class OrderItemService {

    static async findAll() {
        // Get all order items
        return OrderItem.findAll({
            order: [["id", "ASC"]],
        });
    }

    // Find single item by id
    static async findById(id: number) {
        return OrderItem.findByPk(id);
    }

    // create new order item
    static async create(data: {
        orderId: number;
        bicycleId: number;
        quantity: number;
        unitPrice: number;

    }) {
        return OrderItem.create(data);
    }


    // Update an order item
    static async update(
        id: number,
        data: Partial<{ quantity: number; unitPrice: number }>
    ) {
        const item = await OrderItem.findByPk(id);
        if (!item) return null;
        return item.update(data);
    }


    static async delete(orderItem: OrderItem) {
        await orderItem.destroy();
    }
}