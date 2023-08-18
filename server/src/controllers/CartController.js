const statusCode = require('../data/statusCode');
const cartService = require('../services/cart-service')
const userService = require('../services/user-service')

exports.addToCartOrUpdateQuantity = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id
    if (!userId || !productId) {
        return res.status(statusCode.BAD_REQUEST.code).json({ message: 'Username, productId are required' });
    }

    try {
        const user = await userService.findUser({ _id: userId })
        if (!user) {
            return res.status(statusCode.NOT_FOUND.code).json({ message: 'User not found' });
        }

        const cart = await cartService.addToCartOrUpdateQuantity(userId, productId, quantity);
        res.status(statusCode.SUCCESS).json({ message: 'Cart updated', data: cart });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: statusCode.INTERNAL_SERVER_ERROR.message });
    }
};

exports.getCartProducts = async (req, res) => {
    const userId = req.user._id

    try {
        const cart = await cartService.getCart(userId)
        return res.status(statusCode.SUCCESS.code).json({ msg: "Cart Items", data: cart })
    } catch (error) {
        // console.log(error)
        return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({ error: statusCode.INTERNAL_SERVER_ERROR.message })
    }
}

exports.removeFromCart = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id
    if (!userId || !productId) {
        return res.status(statusCode.BAD_REQUEST.code).json({ message: 'userId and productId are required' });
    }

    try {
        const user = await userService.findUser({ _id: userId });
        if (!userId) {
            return res.status(statusCode.NOT_FOUND.code).json({ message: 'User not found' });
        }

        await cartService.deleteFromCart(userId, productId);
        return res.status(statusCode.SUCCESS.code).json({ message: 'Product removed from cart' });
    } catch (error) {
        // console.error(error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({ error: statusCode.INTERNAL_SERVER_ERROR.message });
    }
};