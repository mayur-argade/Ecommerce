const CartModel = require('../models/CartModel')

class CartService {

    // Add product to the cart
    async addToCartOrUpdateQuantity(userId, productId, quantity) {
        // Find the user's cart
        let cart = await CartModel.findOne({ user: userId });

        if (!cart) {
            // If cart doesn't exist, create a new one
            cart = new CartModel({ user: userId, products: [] });
        }

        // Check if the product is already in the cart
        const existingProduct = cart.products.find(p => p.product.toString() === productId);

        if (existingProduct) {
            // If product exists, update its quantity
            existingProduct.quantity = quantity;
        } else {
            // If product doesn't exist, add it to the cart
            cart.products.push({ product: productId, quantity });
        }

        // Save the updated cart
        await cart.save();

        return cart;
    }

    // Get cart contents
    async getCart(userId) {
        return await CartModel.find({ user: userId }).select('products')
    }

    // Update product quantity in the cart
    async updateQuantity(userId, productId, quantity) {
        await CartModel.updateOne({ user: userId, product: productId }, { $set: { quantity } });
    }



    async deleteFromCart(userId, productId) {
        const cart = await CartModel.findOne({ user: userId });
        if (!cart) {
            throw new Error('Cart not found');
        }

        const productIndex = cart.products.findIndex(product => product.product.toString() === productId);
        if (productIndex !== -1) {
            // Remove the product from the array
            cart.products.splice(productIndex, 1);

            // Save the updated cart
            await cart.save();
        }

        return cart;
    }

    async clearCart(userId) {
        await CartModel.findOneAndDelete({ user: userId });
    }
}

module.exports = new CartService();