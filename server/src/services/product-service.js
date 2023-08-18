const ProductModel = require('../models/ProductModel');

class ProductService {
    async createProduct(data) {
        const product = productModel.create(data);
        return product;
    }
    async findProduct(filter) {
        const product = productModel.find(filter)
        return product
    }

    async getProductsByIds(productIds) {
        return await ProductModel.find({ _id: { $in: productIds } });
    }

    async getProductById(productId) {
        return await ProductModel.findById(productId);
    }
}

module.exports = new ProductService();
