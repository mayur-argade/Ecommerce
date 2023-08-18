const productService = require('../services/product-service')
const categoryService = require('../services/category-service')
const statusCode = require('../data/statusCode')

// create a product and and into categories
exports.createProduct = async (req, res) => {
    const { title, description, price, stock, categoryName } = req.body

    if (!title || !description || !price || !stock || !categoryName) {
        return res.status(statusCode.BAD_REQUEST.code).json({ msg: "All fields are mandatory" })
    }

    try {
        let category = await categoryService.findCategory({ name: categoryName })
        if (!category) {
            return res.status(statusCode.NOT_FOUND.code).json({ msg: "Category not found" })
        }
        console.log(category[0])
        let productdata = {
            title: title,
            description: description,
            price: price,
            stock: stock,
            category: category[0]._id
        }
        const product = await productService.createProduct(productdata)
        // Update the category's products array without directly pushing to it
        category[0].products.push(product._id);

        // Save the updated category
        await category[0].save();
        return res.status(statusCode.SUCCESS.code).json({ message: "Product added", data: { product: product, category: category } })
    } catch (error) {
        // console.log(error)
        res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({error: statusCode.INTERNAL_SERVER_ERROR.message})
    }
}

// User selects a category and retrieves products using GET /api/products/:categoryId.
exports.productsByCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const category = await categoryService.findCategory({ _id: categoryId });
        if (!category || category.length === 0) {
            return res.status(statusCode.BAD_REQUEST.code).json({ message: "Category not found" });
        }

        const productIds = category[0].products;
        const products = await productService.getProductsByIds(productIds);
        if (products.length === 0) {
            return res.status(statusCode.NO_CONTENT.code).json({ message: "No products available" })
        }
        return res.status(statusCode.SUCCESS.code).json({ message: "list of products", products: products });
    } catch (error) {
        // console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({error: statusCode.INTERNAL_SERVER_ERROR.message});
    }
}

// User views detailed product information using GET /api/products/:productId.
exports.getProductDetails = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await productService.getProductById(productId);
        if (!product) {
            return res.status(statusCode.NO_CONTENT.code).json({ message: "Product not found" });
        }

        return res.status(statusCode.SUCCESS.code).json({message: "Product Details", data: product});
    } catch (error) {
        // console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR.code).json({error: statusCode.INTERNAL_SERVER_ERROR.message});
    }
}