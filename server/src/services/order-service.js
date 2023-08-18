const OrderModel = require('../models/OrderModel')
const ProductModel = require('../models/ProductModel')

class OrderService {
    async createOrder(userId, products, totalPrice) {
        const order = new OrderModel({ user: userId, products: products, totalPrice: totalPrice });
        await order.save();
        return order;
    }

    async calculateTotalPrice(products) {
        let totalPrice = 0;
        for (const product of products) {
            const { price } = await ProductModel.findById(product.product);
            totalPrice += price * product.quantity;
        }
        return totalPrice;
    }

    async getOrderById(orderId) {
        return OrderModel.findById(orderId)
        }

}

module.exports = new OrderService();