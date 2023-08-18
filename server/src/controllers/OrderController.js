const orderService = require('../services/order-service')
const cartService = require('../services/cart-service');
const userService = require('../services/user-service');
const statusCode = require('../data/statusCode');

exports.placeOrder = async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(statusCode.BAD_REQUEST.code).json({ message: 'Userid is required' });
    }

    try {
        const user = await userService.findUser({ _id: userId });
        if (!userId) {
            return res.status(statusCode.NOT_FOUND.code).json({ message: 'User not found' });
        }

        // Get the user's cart and products
        const cart = await cartService.getCart(userId);
        if (!cart || cart[0].products.length === 0) {
            return res.status(statusCode.NO_CONTENT.code).json({ message: 'Cart is empty' });
        }

        // Calculate total price using the service
        const totalPrice = await orderService.calculateTotalPrice(cart[0].products);

        // Create the order using products from the cart and calculated total price
        const order = await orderService.createOrder(userId, cart[0].products, totalPrice);

        // Clear the user's cart
        await cartService.clearCart(userId);

        res.status(statusCode.SUCCESS.code).json({ message: 'Order placed successfully', order });
    } catch (error) {
        // console.error(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({ error: statusCode.INTERNAL_SERVER_ERROR.message });
    }
};

exports.getOrderDetails = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await orderService.getOrderById(orderId);

        if (!order) {
            return res.status(statusCode.NOT_FOUND.code).json({ message: 'Order not found' });
        }

        res.status(statusCode.SUCCESS.code).json({ message: "Order Details", data: order });
    } catch (error) {
        // console.error(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({ error: statusCode.INTERNAL_SERVER_ERROR.message });
    }
}