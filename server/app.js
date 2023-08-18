const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser')
// Morgan middleware
app.use(morgan('tiny'));

// Regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser())

// cors middleware
app.use(cors())

// Import all the routes here
const home = require('./src/routes/HomeRoute');
const user = require('./src/routes/UserRoute');
const category = require('./src/routes/CategoryRoute')
const product = require('./src/routes/ProductRoute')
const cart = require('./src/routes/CartRoute')
const order = require('./src/routes/OrderRoute')

// Router middleware
app.use('/api/v1/home', home);
app.use('/api/v1/user', user);
app.use('/api/v1/category', category)
app.use('/api/v1/product', product)
app.use('/api/v1/cart', cart)
app.use('/api/v1/order', order)

module.exports = app;
