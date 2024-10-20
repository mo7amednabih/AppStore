# App Store

## Project Description

App Store is a product management system that allows admins to add, update, delete, and manage products. It also allows users to browse products, add them to the cart, and proceed with purchases. The system features separate routes for admin and user functionalities to facilitate product and user account management.

## Technologies Used

- **Node.js**
- **Express**
- **MongoDB**

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/mo7amednabih/AppStore.git
   ```

2. Install the required dependencies using npm:

   ```bash
   npm install
   ```

3. Ensure MongoDB is installed and running on your machine, and set up the database configuration in the environment variables.

4. To start the project, run:
   ```bash
   npm start
   ```

## Project Usage

### Admin Routes for Product Management

- **Create a new product**  
  `POST /products`  
  Admin can add a new product.

- **Get all products**  
  `GET /products`  
  Retrieves all available products.

- **Get a specific product**  
  `GET /product/:id`  
  Retrieves a specific product by its ID.

- **Update a product**  
  `PATCH /products/:id`  
  Updates the details of an existing product.

- **Delete a product**  
  `DELETE /products/:id`  
  Deletes a specific product by its ID.

### Admin Routes for User Account Management

- **Get all users**  
  `GET /users`  
  Retrieves all user accounts.

- **Get a specific user**  
  `GET /users/:id`  
  Retrieves details of a specific user.

- **Delete a user**  
  `DELETE /users/:id`  
  Deletes a user account.

### User Routes for Registration and Authentication

- **Register a new user**  
  `POST /register`  
  Registers a new user.

- **User login**  
  `POST /login`  
  Logs in a user and generates an authentication token.

- **Edit user details**  
  `PATCH /edit/:id`  
  Updates the details of a specific user.

- **Delete user account**  
  `DELETE /del/:id`  
  Deletes a specific user account.

### User Routes for Cart and Order Management

- **Add product to cart**  
  `POST /cart/:productId/:quantity`  
  Adds a product to the cart based on product ID and quantity.

- **Verify order**  
  `POST /verifyOrder`  
  Verifies and completes an order.

- **Cancel order**  
  `POST /cancelOrder`  
  Cancels an order.

- **Get cart products**  
  `GET /cart/list`  
  Lists all products in the cart.

- **Delete a product from the cart**  
  `DELETE /del/:productId`  
  Removes a specific product from the cart.

## Contributing

We welcome contributions! If you would like to contribute to the project, feel free to open a pull request after following our contribution guidelines.


## Contact Information

For any inquiries or suggestions, you can reach us via email at: [eid46060@example.com](mailto:eid46060@example.com).
