E-COMMERCE BACKEND API
Group Members:

David Amarikwa

Ezimah Chinonso Raphael

Oludare Dennis Oluwatobi

Chikodi Agubosim

Project Objective:

Develop an E-commerce Backend API that allows customers to browse products, manage shopping carts and place orders.

Functional Requirements:

Create and manage customer records.

Create and manage product categories.

Create, retrieve, update and delete products.

Allow customers to add products to shopping carts.

Allow customers to remove products from shopping carts.

Allow customers to place orders.

Calculate the total price of each order.

Track order status (Pending, Processing, Shipped, Delivered and Cancelled).

Retrieve all orders belonging to a particular customer.

Prevent customers from ordering products with insufficient stock.

Automatically update product stock when an order is placed.

Validate product prices, quantities and customer information.

Database Relationships:

Category → Products (One-to-Many).

Customer → Orders (One-to-Many).

Order → Products (Many-to-Many through OrderItems).

Customer → Cart (One-to-One).
