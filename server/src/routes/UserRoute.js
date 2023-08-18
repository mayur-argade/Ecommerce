const express = require('express');
const router = express.Router();
const { register, signin, updateuser } = require('../controllers/UserController');
const { requiredRole, isLoggedin } = require('../middleware/authMiddleware')
router.route('/register').post(register);
router.route('/signin').post(signin)
router.route('/update').put(isLoggedin, updateuser)

module.exports = router;
