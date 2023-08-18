const express = require('express');
const router = express.Router();
const { requiredRole, isLoggedin } = require('../middleware/authMiddleware')
const { createCategory, getAllCategory } = require('../controllers/CategoryController')

router.route('/').get(getAllCategory)
router.route('/admin/create-category').post(isLoggedin, requiredRole('admin'), createCategory)

module.exports = router;
