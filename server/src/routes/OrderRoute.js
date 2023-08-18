const express = require('express');
const router = express.Router();
const { requiredRole, isLoggedin } = require('../middleware/authMiddleware')
const { placeOrder, getOrderDetails } = require('../controllers/OrderController')

router.route('/orderdetails/:orderId').get(isLoggedin, getOrderDetails)
router.route('/place/:userId').post(isLoggedin, placeOrder)


module.exports = router;
