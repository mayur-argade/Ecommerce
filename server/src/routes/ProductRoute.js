const express = require('express');
const router = express.Router();
const { requiredRole, isLoggedin } = require('../middleware/authMiddleware')
const { createProduct, productsByCategory, getProductDetails } = require('../controllers/ProductController')

// router.route('/').get(getAllCategory)
router.route('/admin/create-product').post(isLoggedin, requiredRole('admin'), createProduct)
router.route('/:categoryId').get(productsByCategory)
router.route('/:productId').get(getProductDetails)

module.exports = router;
