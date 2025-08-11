# Bulls-Mart API Documentation

## Base URL
```
http://localhost:8000/api/v2
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## User Endpoints

### Register User
```
POST /user/create-user
```
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@usf.edu",
  "password": "password123",
  "phoneNumber": "1234567890",
  "address": "4202 E Fowler Ave, Tampa, FL 33620"
}
```

### Activate User
```
POST /user/activation
```
**Body:**
```json
{
  "activation_token": "your-activation-token"
}
```

### Login User
```
POST /user/login-user
```
**Body:**
```json
{
  "email": "john@usf.edu",
  "password": "password123"
}
```

## Shop Endpoints

### Create Shop
```
POST /shop/create-shop
```
**Body:**
```json
{
  "name": "Student Shop",
  "email": "shop@usf.edu",
  "password": "password123",
  "address": "4202 E Fowler Ave, Tampa, FL 33620",
  "phoneNumber": "1234567890",
  "zipCode": 33620
}
```

### Login Shop
```
POST /shop/login-shop
```
**Body:**
```json
{
  "email": "shop@usf.edu",
  "password": "password123"
}
```

## Product Endpoints

### Get All Products
```
GET /product/get-all-products
```

### Create Product
```
POST /product/create-product
```
**Headers:**
```
Authorization: Bearer <shop-jwt-token>
```
**Body (multipart/form-data):**
```
name: "Product Name"
description: "Product Description"
category: "Electronics"
tags: "tag1, tag2"
originalPrice: 100
discountPrice: 80
stock: 50
images: [file1, file2, ...]
```

### Get Shop Products
```
GET /product/get-all-products-shop/:shopId
```

### Delete Product
```
DELETE /product/delete-shop-product/:productId
```

## Order Endpoints

### Create Order
```
POST /order/create-order
```
**Headers:**
```
Authorization: Bearer <user-jwt-token>
```

### Get User Orders
```
GET /order/get-all-orders-user/:userId
```

### Get Shop Orders
```
GET /order/get-all-orders-shop/:shopId
```

## Payment Endpoints

### Process Payment
```
POST /payment/process
```
**Headers:**
```
Authorization: Bearer <user-jwt-token>
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access denied"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

## Success Responses

### 200 OK
```json
{
  "success": true,
  "data": {}
}
```

### 201 Created
```json
{
  "success": true,
  "message": "Created successfully"
}
``` 