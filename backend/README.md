# TopRoof Solutions Backend API

A Spring Boot REST API for the TopRoof Solutions e-commerce platform for roofing materials and accessories.

## Technology Stack

- **Java 21** (Spring Boot 3.5.3)
- **Spring Boot Starter Web** - REST API
- **Spring Boot Starter Data JPA** - Database ORM
- **Spring Boot Starter Security** - Authentication & Authorization
- **MySQL Connector** - Database driver
- **Maven** - Build tool

## Prerequisites

- Java 21 or higher
- Maven 3.6+
- MySQL 8.0+
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

## Database Setup

1. Install MySQL and start the MySQL server
2. Create database (optional - the app will auto-create it):

```sql
CREATE DATABASE toproofdb;
```

3. Update `application.properties` with your MySQL credentials if different:

```properties
spring.datasource.username=root
spring.datasource.password=your_password
```

## Running the Application

### Using Maven Wrapper (Recommended)

```bash
# Windows
.\mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

### Using Maven

```bash
mvn spring-boot:run
```

### Using IDE

Run the `BackendApplication.java` main class directly from your IDE.

The application will start on **http://localhost:8080**

## API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "1234567890",
  "address": "123 Main St",
  "role": "USER"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Products

#### Get All Products

```http
GET /api/products
```

#### Get Product by ID

```http
GET /api/products/{id}
```

#### Get Products by Category

```http
GET /api/products/category/{category}
```

Categories: `ROOFING`, `ACCESSORIES`

#### Get Featured Products

```http
GET /api/products/featured
```

#### Get Best Sellers

```http
GET /api/products/bestsellers
```

#### Search Products

```http
GET /api/products/search?keyword=tile
```

#### Add Product (Admin)

```http
POST /api/products
Content-Type: application/json

{
  "name": "Premium Roofing Tile",
  "description": "High-quality ceramic roofing tile",
  "price": 25.99,
  "imageUrl": "https://example.com/image.jpg",
  "category": "ROOFING",
  "brand": "TopRoof",
  "stockQuantity": 100,
  "featured": true,
  "bestSeller": false
}
```

#### Update Product

```http
PUT /api/products/{id}
Content-Type: application/json
```

#### Delete Product

```http
DELETE /api/products/{id}
```

### Cart

#### Get User Cart

```http
GET /api/cart/user/{userId}
```

#### Add to Cart

```http
POST /api/cart/add
Content-Type: application/json

{
  "userId": 1,
  "productId": 1,
  "quantity": 2
}
```

#### Update Cart Item Quantity

```http
PUT /api/cart/{cartItemId}
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove from Cart

```http
DELETE /api/cart/{cartItemId}
```

#### Clear Cart

```http
DELETE /api/cart/user/{userId}/clear
```

#### Get Cart Total

```http
GET /api/cart/user/{userId}/total
```

### Orders

#### Get All Orders

```http
GET /api/orders
```

#### Get Order by ID

```http
GET /api/orders/{id}
```

#### Get User Orders

```http
GET /api/orders/user/{userId}
```

#### Get Orders by Status

```http
GET /api/orders/status/{status}
```

Status values: `PENDING`, `CONFIRMED`, `SHIPPED`, `DELIVERED`, `CANCELLED`

#### Create Order

```http
POST /api/orders
Content-Type: application/json

{
  "userId": 1,
  "shippingAddress": "123 Main St, City, Country",
  "paymentMethod": "CREDIT_CARD"
}
```

#### Update Order Status

```http
PUT /api/orders/{id}/status
Content-Type: application/json

{
  "status": "SHIPPED"
}
```

#### Update Payment Status

```http
PUT /api/orders/{id}/payment-status
Content-Type: application/json

{
  "paymentStatus": "PAID"
}
```

#### Cancel Order

```http
DELETE /api/orders/{id}
```

### Users

#### Get All Users

```http
GET /api/users
```

#### Get User by ID

```http
GET /api/users/{id}
```

#### Get User by Email

```http
GET /api/users/email/{email}
```

#### Update User

```http
PUT /api/users/{id}
Content-Type: application/json
```

#### Delete User

```http
DELETE /api/users/{id}
```

### Admin

#### Get All Users (Admin)

```http
GET /api/admin/users
```

#### Get All Products (Admin)

```http
GET /api/admin/products
```

## Database Schema

### Tables

- **users** - User accounts and profiles
- **products** - Product catalog
- **cart_items** - Shopping cart items
- **orders** - Customer orders
- **order_items** - Order line items

## Security Configuration

- CORS enabled for `http://localhost:3000` (React frontend)
- Password encryption using BCrypt
- CSRF disabled for REST API
- All endpoints currently open (can be secured with roles)

## Development Tips

### Hot Reload

The application includes Spring Boot DevTools for hot reload during development.

### Database Console

View database tables using MySQL Workbench or phpMyAdmin.

### Testing with Postman/Thunder Client

Import the endpoints above into Postman or use VS Code's Thunder Client extension for API testing.

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/toproof/backend/
│   │   │   ├── BackendApplication.java
│   │   │   ├── config/
│   │   │   │   └── SecurityConfig.java
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── CartController.java
│   │   │   │   ├── OrderController.java
│   │   │   │   ├── ProductController.java
│   │   │   │   ├── UserController.java
│   │   │   │   └── AdminController.java
│   │   │   ├── models/
│   │   │   │   ├── User.java
│   │   │   │   ├── Product.java
│   │   │   │   ├── CartItem.java
│   │   │   │   ├── Order.java
│   │   │   │   └── OrderItem.java
│   │   │   ├── repo/
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── ProductRepository.java
│   │   │   │   ├── CartItemRepository.java
│   │   │   │   ├── OrderRepository.java
│   │   │   │   └── OrderItemRepository.java
│   │   │   └── service/
│   │   │       ├── UserService.java
│   │   │       ├── ProductService.java
│   │   │       ├── CartService.java
│   │   │       └── OrderService.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
└── pom.xml
```

## Troubleshooting

### Port Already in Use

Change the port in `application.properties`:

```properties
server.port=8081
```

### Database Connection Issues

- Verify MySQL is running
- Check username/password in `application.properties`
- Ensure database exists or set `createDatabaseIfNotExist=true` in URL

### Build Errors

```bash
# Clean and rebuild
.\mvnw.cmd clean install

# Skip tests if needed
.\mvnw.cmd clean install -DskipTests
```

## Next Steps

1. ✅ Start MySQL server
2. ✅ Configure database credentials
3. ✅ Run the application
4. ✅ Test API endpoints with Postman/Thunder Client
5. 🔄 Connect with React frontend

## Support

For issues or questions, create an issue in the repository.
