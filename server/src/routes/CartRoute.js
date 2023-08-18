const express = require('express');
const router = express.Router();
const { requiredRole, isLoggedin } = require('../middleware/authMiddleware')
const { addToCartOrUpdateQuantity, getCartProducts, removeFromCart } = require('../controllers/CartController')

router.route('/addproduct').post(isLoggedin, addToCartOrUpdateQuantity)
router.route('/items').get(isLoggedin, getCartProducts)
router.route('/deleteitem/:productId').delete(isLoggedin, removeFromCart)
module.exports = router;
