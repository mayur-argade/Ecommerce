### User Registration and Authentication:
[x] User registers using POST /api/register.
[x] User logs in using POST /api/login.

### Category and Product Interaction:
[x] User retrieves a list of categories using GET /api/categories.

### Product information
[x] User selects a category and retrieves products using GET /api/products/:categoryId.
[x] User views detailed product information using GET /api/products/:productId.

### Cart Management:
[x] User adds products to the cart using POST /api/cart/add.
[x] User views the cart and its contents using GET /api/cart.
[x] User updates product quantities in the cart using PUT /api/cart/:productId.
[x] User removes products from the cart using DELETE /api/cart/:productId.

### Order Placement:
[x] User places an order using POST /api/orders/place. The order includes products from the cart.
[x] The products in the cart are removed after the order is placed.

### Order History:
[x] User retrieves their order history using GET /api/orders/history.
[x] User views details of a specific order using GET /api/orders/:orderId.
