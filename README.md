<div align="center">

# 🏠 TopRoof Solutions

### E-Commerce Platform for Roofing and Gutter Products in Sri Lanka

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.7-6DB33F?style=for-the-badge&logo=spring-boot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-9.5-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Java](https://img.shields.io/badge/Java-20-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

_A robust, full-stack e-commerce platform designed to modernize the distribution of roofing products across Sri Lanka_

[🚀 Getting Started](#-installation--setup) • [📖 Documentation](#-api-documentation) • [🎯 Features](#-features) • [📸 Screenshots](#-screenshots)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Database Design](#-database-design)
- [API Documentation](#-api-documentation)
- [Installation & Setup](#-installation--setup)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**TopRoof Solutions** is a comprehensive e-commerce web application built to serve the construction industry in Sri Lanka. The platform connects contractors, homeowners, manufacturers, and distributors, providing a centralized marketplace for roofing tiles, metal sheets, gutters, downspouts, and construction accessories.

### 🎯 Project Objectives

- Enable customers to browse, compare, and purchase roofing and guttering products online
- Provide manufacturers and distributors a digital storefront with wider market reach
- Offer secure payment options and reliable order management
- Support role-based access (Admin/Customer) for streamlined operations
- Deliver a responsive, mobile-friendly user experience

---

## 📌 Problem Statement

In Sri Lanka, the roofing product industry faces significant challenges:

| Challenge                        | Impact                             |
| -------------------------------- | ---------------------------------- |
| 🏪 Traditional retail dependency | Limited product availability       |
| 📍 Geographic constraints        | Inconvenient for remote customers  |
| ⏰ Operating hour limitations    | Reduced accessibility              |
| 📦 Inconsistent product variety  | Difficulty finding specialty items |

**TopRoof Solutions addresses these issues by offering:**

✅ A centralized online marketplace for roofing products  
✅ 24/7 access to product catalogs and ordering  
✅ Wide range of quality items, including specialty products  
✅ Mobile-responsive, secure shopping experience

---

## 🚀 Features

### 👤 Customer Features

| Feature                            | Description                                                           |
| ---------------------------------- | --------------------------------------------------------------------- |
| 🔐 **Secure Authentication**       | User registration and login with BCrypt password encryption           |
| 🛍️ **Product Browsing**            | View products by categories (Roofing, Accessories)                    |
| 🔍 **Advanced Search & Filtering** | Search by keyword, filter by category/brand/price, multi-sort options |
| 🛒 **Shopping Cart**               | Add, update quantity, remove items with real-time totals              |
| ❤️ **Wishlist**                    | Save favorite products for later purchase                             |
| 📦 **Order Management**            | Track order history with status updates                               |
| 👤 **User Dashboard**              | Personal profile, order tracking, password management                 |
| 🔄 **Persistent Sessions**         | Stay logged in with localStorage integration                          |

### 👨‍💼 Admin Features

| Feature                    | Description                                                     |
| -------------------------- | --------------------------------------------------------------- |
| 📊 **Dashboard Analytics** | Real-time stats for orders, revenue, users, and products        |
| 🏷️ **Product Management**  | Full CRUD operations with image URLs, featured/bestseller flags |
| 👥 **User Management**     | Create, update, delete users with role assignment               |
| 📋 **Order Management**    | View all orders, update status and payment tracking             |
| 📈 **Reports & Insights**  | Revenue metrics, order statistics, inventory alerts             |

### ⚙️ Technical Features

| Feature                    | Description                                          |
| -------------------------- | ---------------------------------------------------- |
| 📱 **Responsive Design**   | Optimized for mobile, tablet, and desktop            |
| ⚡ **RESTful API**         | 50+ endpoints for complete backend operations        |
| 🔒 **Security**            | BCrypt password hashing, Spring Security integration |
| 🎨 **Modern UI/UX**        | Gradient designs, hover effects, smooth transitions  |
| 🗄️ **Auto-Initialization** | Sample data seeding on first startup                 |

---

## 🧱 Tech Stack

<div align="center">

### Frontend

| Technology                                                                                | Version | Purpose             |
| ----------------------------------------------------------------------------------------- | ------- | ------------------- |
| ![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)                     | 19.1.0  | UI Library          |
| ![React Router](https://img.shields.io/badge/React_Router-7.6.1-CA4245?logo=react-router) | 7.6.1   | Client-side Routing |
| ![Axios](https://img.shields.io/badge/Axios-1.9.0-5A29E4?logo=axios)                      | 1.9.0   | HTTP Client         |
| ![CSS3](https://img.shields.io/badge/CSS3-Grid_&_Flexbox-1572B6?logo=css3)                | -       | Styling             |

### Backend

| Technology                                                                                       | Version | Purpose              |
| ------------------------------------------------------------------------------------------------ | ------- | -------------------- |
| ![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.7-6DB33F?logo=spring-boot)           | 3.5.7   | Backend Framework    |
| ![Spring Data JPA](https://img.shields.io/badge/Spring_Data_JPA-3.5.7-6DB33F?logo=spring)        | 3.5.7   | ORM & Data Access    |
| ![Spring Security](https://img.shields.io/badge/Spring_Security-6.x-6DB33F?logo=spring-security) | 6.x     | Security Framework   |
| ![Java](https://img.shields.io/badge/Java-20-ED8B00?logo=openjdk)                                | 20      | Programming Language |

### Database

| Technology                                                                         | Version | Purpose             |
| ---------------------------------------------------------------------------------- | ------- | ------------------- |
| ![MySQL](https://img.shields.io/badge/MySQL-9.5-4479A1?logo=mysql&logoColor=white) | 9.5     | Relational Database |
| ![HikariCP](https://img.shields.io/badge/HikariCP-5.x-blue)                        | 5.x     | Connection Pooling  |

</div>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                               │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                    React.js Frontend                         │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐│    │
│  │  │  Pages   │ │Components│ │  Assets  │ │   Config/API     ││    │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘│    │
│  └─────────────────────────────────────────────────────────────┘    │
│                              ▼ HTTP/REST                             │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          SERVER LAYER                                │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                  Spring Boot Backend                         │    │
│  │  ┌──────────────────────────────────────────────────────┐   │    │
│  │  │                   Controllers                         │   │    │
│  │  │  Auth │ Product │ Cart │ Order │ Wishlist │ User │Admin│   │    │
│  │  └──────────────────────────────────────────────────────┘   │    │
│  │                           ▼                                  │    │
│  │  ┌──────────────────────────────────────────────────────┐   │    │
│  │  │                    Services                           │   │    │
│  │  │  UserService │ ProductService │ CartService │ etc.   │   │    │
│  │  └──────────────────────────────────────────────────────┘   │    │
│  │                           ▼                                  │    │
│  │  ┌──────────────────────────────────────────────────────┐   │    │
│  │  │                  Repositories                         │   │    │
│  │  │  Spring Data JPA with Hibernate ORM                   │   │    │
│  │  └──────────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────────┘    │
│                              ▼ JDBC                                  │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         DATABASE LAYER                               │
│  ┌─────────────────────────────────────────────────────────────┐    │
│  │                      MySQL Database                          │    │
│  │   users │ products │ cart_items │ orders │ order_items │     │    │
│  │                      wishlist_items                          │    │
│  └─────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🗃️ Database Design

### Entity Relationship Diagram

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│     USER     │       │   CART_ITEM  │       │   PRODUCT    │
├──────────────┤       ├──────────────┤       ├──────────────┤
│ id (PK)      │───┐   │ id (PK)      │   ┌───│ id (PK)      │
│ email        │   │   │ user_id (FK) │───┘   │ name         │
│ password     │   └───│ product_id(FK)│──────│ description  │
│ firstName    │       │ quantity     │       │ price        │
│ lastName     │       │ subtotal     │       │ imageUrl     │
│ phone        │       └──────────────┘       │ category     │
│ address      │                              │ brand        │
│ role         │       ┌──────────────┐       │ stockQuantity│
│ createdAt    │       │    ORDER     │       │ averageRating│
│ updatedAt    │       ├──────────────┤       │ featured     │
└──────────────┘       │ id (PK)      │       │ bestSeller   │
        │              │ user_id (FK) │───┐   └──────────────┘
        │              │ status       │   │           │
        └──────────────│ totalAmount  │   │           │
                       │ shippingAddr │   │   ┌───────┴───────┐
┌──────────────┐       │ paymentMethod│   │   │               │
│ WISHLIST_ITEM│       │ paymentStatus│   │   ▼               │
├──────────────┤       │ createdAt    │   │ ┌──────────────┐  │
│ id (PK)      │       └──────────────┘   │ │  ORDER_ITEM  │  │
│ user_id (FK) │───┐           │          │ ├──────────────┤  │
│ product_id(FK)│──────────────┼──────────┤ │ id (PK)      │  │
│ addedAt      │   │           │          └─│ order_id (FK)│  │
└──────────────┘   │           ▼            │ product_id(FK)│──┘
                   │   ┌──────────────┐     │ quantity     │
                   │   │ (1:N Orders) │     │ price        │
                   └───┴──────────────┘     └──────────────┘
```

### Database Tables

| Table            | Description      | Key Fields                                      |
| ---------------- | ---------------- | ----------------------------------------------- |
| `users`          | User accounts    | id, email, password, role, firstName, lastName  |
| `products`       | Product catalog  | id, name, price, category, brand, stockQuantity |
| `cart_items`     | Shopping cart    | id, user_id, product_id, quantity               |
| `orders`         | Customer orders  | id, user_id, status, totalAmount, paymentStatus |
| `order_items`    | Order line items | id, order_id, product_id, quantity, price       |
| `wishlist_items` | Saved products   | id, user_id, product_id, addedAt                |

---

## 📖 API Documentation

### Base URL

```
http://localhost:8080/api
```

### Authentication Endpoints

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login`    | Authenticate user |

### Product Endpoints

| Method   | Endpoint                               | Description                                            |
| -------- | -------------------------------------- | ------------------------------------------------------ |
| `GET`    | `/api/products`                        | Get all products                                       |
| `GET`    | `/api/products/{id}`                   | Get product by ID                                      |
| `GET`    | `/api/products/category/{category}`    | Get products by category                               |
| `GET`    | `/api/products/featured`               | Get featured products                                  |
| `GET`    | `/api/products/bestsellers`            | Get best-selling products                              |
| `GET`    | `/api/products/search?query={keyword}` | Search products                                        |
| `GET`    | `/api/products/filter`                 | Filter products (search, category, brand, price, sort) |
| `GET`    | `/api/products/brands`                 | Get all distinct brands                                |
| `GET`    | `/api/products/categories`             | Get all categories                                     |
| `POST`   | `/api/products`                        | Create product (Admin)                                 |
| `PUT`    | `/api/products/{id}`                   | Update product (Admin)                                 |
| `DELETE` | `/api/products/{id}`                   | Delete product (Admin)                                 |

### Cart Endpoints

| Method   | Endpoint                        | Description               |
| -------- | ------------------------------- | ------------------------- |
| `GET`    | `/api/cart/user/{userId}`       | Get user's cart items     |
| `POST`   | `/api/cart/add`                 | Add item to cart          |
| `PUT`    | `/api/cart/{cartItemId}`        | Update cart item quantity |
| `DELETE` | `/api/cart/{cartItemId}`        | Remove item from cart     |
| `DELETE` | `/api/cart/user/{userId}/clear` | Clear entire cart         |
| `GET`    | `/api/cart/user/{userId}/total` | Get cart total            |

### Order Endpoints

| Method   | Endpoint                          | Description           |
| -------- | --------------------------------- | --------------------- |
| `GET`    | `/api/orders`                     | Get all orders        |
| `GET`    | `/api/orders/{id}`                | Get order by ID       |
| `GET`    | `/api/orders/user/{userId}`       | Get user's orders     |
| `GET`    | `/api/orders/status/{status}`     | Get orders by status  |
| `POST`   | `/api/orders`                     | Create new order      |
| `PUT`    | `/api/orders/{id}/status`         | Update order status   |
| `PUT`    | `/api/orders/{id}/payment-status` | Update payment status |
| `DELETE` | `/api/orders/{id}`                | Cancel order          |

### Wishlist Endpoints

| Method   | Endpoint                            | Description                  |
| -------- | ----------------------------------- | ---------------------------- |
| `GET`    | `/api/wishlist/user/{userId}`       | Get user's wishlist          |
| `POST`   | `/api/wishlist/add`                 | Add to wishlist              |
| `DELETE` | `/api/wishlist/{id}`                | Remove from wishlist         |
| `GET`    | `/api/wishlist/check`               | Check if product in wishlist |
| `DELETE` | `/api/wishlist/user/{userId}/clear` | Clear wishlist               |
| `GET`    | `/api/wishlist/user/{userId}/count` | Get wishlist count           |

### User Endpoints

| Method   | Endpoint                   | Description       |
| -------- | -------------------------- | ----------------- |
| `GET`    | `/api/users`               | Get all users     |
| `GET`    | `/api/users/{id}`          | Get user by ID    |
| `GET`    | `/api/users/email/{email}` | Get user by email |
| `PUT`    | `/api/users/{id}`          | Update user       |
| `DELETE` | `/api/users/{id}`          | Delete user       |
| `GET`    | `/api/users/{id}/profile`  | Get user profile  |
| `PUT`    | `/api/users/{id}/profile`  | Update profile    |

### Admin Endpoints

| Method   | Endpoint                         | Description              |
| -------- | -------------------------------- | ------------------------ |
| `GET`    | `/api/admin/users`               | Get all users (Admin)    |
| `PUT`    | `/api/admin/users/{id}`          | Update user (Admin)      |
| `DELETE` | `/api/admin/users/email/{email}` | Delete user by email     |
| `GET`    | `/api/admin/products`            | Get all products (Admin) |
| `POST`   | `/api/admin/products`            | Create product           |
| `PUT`    | `/api/admin/products/{id}`       | Update product           |
| `DELETE` | `/api/admin/products/{id}`       | Delete product           |
| `GET`    | `/api/admin/reports/dashboard`   | Get dashboard report     |

---

## 📦 Installation & Setup

### Prerequisites

| Requirement | Version                     |
| ----------- | --------------------------- |
| Java JDK    | 20.0.1+                     |
| Node.js     | 18.x+                       |
| npm         | 9.x+                        |
| MySQL       | 9.5+                        |
| Maven       | 3.8+ (included via wrapper) |

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/madurangaPrabhath/TopRoof-Solutions.git
cd TopRoof-Solutions
```

### 2️⃣ Database Setup

Create a MySQL database:

```sql
CREATE DATABASE toproofdb;
```

> **Note:** The application will auto-create tables on first run using JPA DDL auto-update.

### 3️⃣ Backend Setup (Spring Boot)

```bash
# Navigate to backend directory
cd backend

# Build the project (Windows)
./mvnw.cmd clean package -DskipTests

# Build the project (Linux/Mac)
./mvnw clean package -DskipTests

# Run the application (Windows)
./mvnw.cmd spring-boot:run

# Run the application (Linux/Mac)
./mvnw spring-boot:run
```

The backend will start on **http://localhost:8080**

### 4️⃣ Frontend Setup (React)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will open at **http://localhost:3000**

### 🔄 Auto-Initialized Data

On first startup, the DataInitializer automatically populates:

| Data               | Count | Details                                  |
| ------------------ | ----- | ---------------------------------------- |
| 👤 Admin User      | 1     | `admin@toproof.com` / `admin123`         |
| 👤 Regular User    | 1     | `user@toproof.com` / `user123`           |
| 📦 Sample Products | 14+   | Roofing tiles, metal sheets, accessories |

---

## 🔑 Default Login Credentials

<div align="center">

| Role         | Email               | Password   |
| ------------ | ------------------- | ---------- |
| 👨‍💼 **Admin** | `admin@toproof.com` | `admin123` |
| 👤 **User**  | `user@toproof.com`  | `user123`  |

</div>

---

## 📁 Project Structure

```
TopRoof-Solutions/
│
├── 📂 backend/                          # Spring Boot Application
│   ├── 📂 src/main/java/com/toproof/backend/
│   │   ├── 📄 BackendApplication.java   # Main entry point
│   │   ├── 📂 config/                   # Configuration classes
│   │   │   ├── CorsConfig.java          # CORS settings
│   │   │   ├── DataInitializer.java     # Sample data seeding
│   │   │   └── SecurityConfig.java      # Security configuration
│   │   ├── 📂 controller/               # REST Controllers (8)
│   │   │   ├── AdminController.java
│   │   │   ├── AuthController.java
│   │   │   ├── CartController.java
│   │   │   ├── OrderController.java
│   │   │   ├── ProductController.java
│   │   │   ├── ReportController.java
│   │   │   ├── UserController.java
│   │   │   └── WishlistController.java
│   │   ├── 📂 models/                   # JPA Entities (6)
│   │   │   ├── User.java
│   │   │   ├── Product.java
│   │   │   ├── CartItem.java
│   │   │   ├── Order.java
│   │   │   ├── OrderItem.java
│   │   │   └── WishlistItem.java
│   │   ├── 📂 repo/                     # JPA Repositories (6)
│   │   ├── 📂 service/                  # Business Logic (6)
│   │   ├── 📂 dto/                      # Data Transfer Objects (4)
│   │   └── 📂 exception/                # Custom Exceptions
│   ├── 📂 src/main/resources/
│   │   ├── application.properties       # App configuration
│   │   └── application-prod.properties  # Production config
│   └── 📄 pom.xml                       # Maven dependencies
│
├── 📂 frontend/                         # React Application
│   ├── 📂 public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── 📂 src/
│   │   ├── 📄 App.js                    # Root component
│   │   ├── 📄 index.js                  # Entry point
│   │   ├── 📂 pages/                    # Page Components (9)
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Products.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Cart.js
│   │   │   ├── Wishlist.js
│   │   │   ├── UserDashboard.js
│   │   │   └── AdminDashboard.js
│   │   ├── 📂 components/               # Reusable Components (11)
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── HeroSection.js
│   │   │   ├── TopSellingProducts.js
│   │   │   ├── RoofingProducts.js
│   │   │   ├── AccessoriesProducts.js
│   │   │   └── [more components...]
│   │   ├── 📂 config/
│   │   │   └── api.js                   # API configuration
│   │   └── 📂 assets/
│   │       ├── 📂 images/
│   │       └── 📂 styles/               # CSS Files (18)
│   └── 📄 package.json                  # NPM dependencies
│
├── 📂 Prototype/                        # Design prototypes
├── 📄 README.md                         # Project documentation
└── 📄 .gitignore
```

---

## 🎨 Screenshots

### 🏠 Home Page

- Hero section with call-to-action
- Featured roofing products carousel
- Top selling products section
- Accessories showcase
- Testimonials and about sections

### 🛍️ Products Page

- Advanced filtering sidebar
- Search functionality
- Category and brand filters
- Price range slider
- Sort options (price, name)

### 🛒 Shopping Cart

- Item quantity management
- Real-time total calculation
- Checkout modal
- Multiple payment options

### 👤 User Dashboard

- Profile management
- Order history
- Password change
- Quick action cards

### 👨‍💼 Admin Dashboard

- Statistics overview
- Product CRUD operations
- User management
- Order status updates
- Revenue reports

---

## 🔮 Future Enhancements

| Feature                               | Priority | Status  |
| ------------------------------------- | -------- | ------- |
| ⭐ Product reviews and ratings        | High     | Planned |
| 📸 Product image upload functionality | High     | Planned |
| 💳 Payment gateway integration        | High     | Planned |
| 🔔 Stock alert notifications          | Medium   | Planned |
| 📧 Email notifications                | Medium   | Planned |
| 📊 Advanced analytics dashboard       | Medium   | Planned |
| 🌍 Multi-language support             | Low      | Planned |
| 📱 Mobile app (React Native)          | Low      | Planned |
| 🚚 Real-time delivery tracking        | Low      | Planned |
| 🔐 JWT Authentication                 | Medium   | Planned |

---

## 👥 Who Benefits?

<div align="center">

| Stakeholder                         | Benefits                                 |
| ----------------------------------- | ---------------------------------------- |
| 🏗️ **Contractors & Homeowners**     | Access to quality roofing solutions 24/7 |
| 🏢 **Manufacturers & Distributors** | Digital storefront, wider market reach   |
| 💼 **Platform Owners**              | Increased sales, customer retention      |

</div>

---

## 🔗 References & Inspiration

**Global E-Commerce Models:**

- Amazon, eBay – User experience, payment flow, order handling

**Local Industry References:**

- [Daraz.lk](https://www.daraz.lk)
- [LankaRoof.lk](https://www.lankaroof.lk)
- [Roofing.lk](https://www.roofing.lk)
- [BuildingMaterial.lk](https://www.buildingmaterial.lk)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Access the Platform

| Service        | URL                                                                            |
| -------------- | ------------------------------------------------------------------------------ |
| 🖥️ Frontend    | [http://localhost:3000](http://localhost:3000)                                 |
| ⚙️ Backend API | [http://localhost:8080](http://localhost:8080)                                 |
| 📖 API Health  | [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health) |

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

```
MIT License

Copyright (c) 2025 TopRoof Solutions

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

Made with ❤️ for the Sri Lankan Construction Industry

</div>
