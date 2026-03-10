<div align="center">

# 🏠 TopRoof Solutions

### E-Commerce Platform for Roofing and Gutter Products in Sri Lanka

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.7-6DB33F?style=for-the-badge&logo=spring-boot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-9.5-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Java](https://img.shields.io/badge/Java-20-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://openjdk.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

_A robust, full-stack e-commerce platform designed to modernize the distribution of roofing products across Sri Lanka_

[🚀 Getting Started](#-installation--setup) • [📖 Documentation](#-api-documentation) • [🎯 Features](#-features) • [�️ Troubleshooting](#-troubleshooting)

---

### 📊 Project Statistics

![Backend](https://img.shields.io/badge/Backend-8_Controllers-blue) 
![Models](https://img.shields.io/badge/Models-6_Entities-green)
![API Endpoints](https://img.shields.io/badge/API_Endpoints-50+-orange)
![Components](https://img.shields.io/badge/React_Components-20+-purple)
![Pages](https://img.shields.io/badge/Pages-9-red)

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
  - [Quick Start](#-quick-start-windows)
  - [Detailed Setup](#-detailed-setup-instructions)
- [Troubleshooting](#-troubleshooting)
- [Configuration](#-configuration)
- [Development Guidelines](#-development-guidelines)
- [Security Features](#-security-features)
- [Performance Optimization](#-performance-optimization)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Future Enhancements](#-future-enhancements)
- [FAQ](#-frequently-asked-questions-faq)
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

## 💎 Why Choose TopRoof Solutions?

<div align="center">

| Advantage                      | Benefit                                                    |
| ------------------------------ | ---------------------------------------------------------- |
| 🚀 **Production-Ready**        | Complete e-commerce solution ready to deploy              |
| 📚 **Well-Documented**         | Comprehensive README and inline code documentation         |
| 🎓 **Educational**             | Perfect for learning full-stack development                |
| 🔧 **Easily Customizable**     | Clean architecture, easy to modify and extend              |
| 🛡️ **Secure**                  | BCrypt encryption, CORS, SQL injection prevention          |
| 📱 **Mobile-Responsive**       | Works seamlessly on all devices                            |
| 🎨 **Modern UI/UX**            | Professional design with smooth interactions               |
| 🔄 **RESTful API**             | Standard API design, easy to integrate                     |
| 💾 **Auto Database Setup**     | No manual table creation needed                            |
| 🆓 **Open Source**             | Free to use, modify, and distribute (MIT License)          |

</div>

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

Before you begin, ensure you have the following installed:

| Requirement | Version | Download Link                                                         |
| ----------- | ------- | --------------------------------------------------------------------- |
| Java JDK    | 20+     | [Oracle JDK](https://www.oracle.com/java/technologies/downloads/)     |
| Node.js     | 18.x+   | [Node.js Official](https://nodejs.org/)                               |
| npm         | 9.x+    | (Included with Node.js)                                               |
| MySQL       | 9.5+    | [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)      |
| Maven       | 3.8+    | (Included via Maven Wrapper)                                          |
| Git         | Latest  | [Git Downloads](https://git-scm.com/downloads)                        |

---

## 🚀 Quick Start (Windows)

For the fastest setup on Windows, use the PowerShell automation script:

```powershell
# 1. Ensure MySQL is running with database 'toproofdb' created
# 2. Navigate to backend directory
cd backend
.\start-backend.ps1

# 3. In a new terminal, navigate to frontend directory
cd frontend
npm install
npm start
```

---

## 📋 Detailed Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/madurangaPrabhath/TopRoof-Solutions.git
cd TopRoof-Solutions
```

### 2️⃣ Database Setup

**Step 1:** Start MySQL Server (ensure it's running on `localhost:3306`)

**Step 2:** Create the database:

```sql
CREATE DATABASE toproofdb;
```

**Step 3:** (Optional) Create a MySQL user:

```sql
CREATE USER 'toproof_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON toproofdb.* TO 'toproof_user'@'localhost';
FLUSH PRIVILEGES;
```

> **Note:** The application will auto-create tables on first run using JPA DDL auto-update.

### 3️⃣ Backend Configuration (Optional)

If you need to customize database credentials, edit:

**File:** `backend/src/main/resources/application.properties`

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/toproofdb
spring.datasource.username=root
spring.datasource.password=your_password

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
```

### 4️⃣ Backend Setup (Spring Boot)

#### Option A: Using PowerShell Script (Windows - Recommended)

```powershell
cd backend
.\start-backend.ps1
```

#### Option B: Using Maven Wrapper (All Platforms)

**Windows:**

```bash
cd backend
.\mvnw.cmd clean install -DskipTests
.\mvnw.cmd spring-boot:run
```

**Linux/Mac:**

```bash
cd backend
./mvnw clean install -DskipTests
./mvnw spring-boot:run
```

The backend will start on **http://localhost:8080**

✅ Verify backend is running: [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health)

### 5️⃣ Frontend Setup (React)

Open a **new terminal** window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will automatically open at **http://localhost:3000**

---

## ✅ Verify Installation

After both servers are running, verify the setup:

| Check                | URL                                       | Expected Result            |
| -------------------- | ----------------------------------------- | -------------------------- |
| Backend Health       | http://localhost:8080/actuator/health     | `{"status":"UP"}`          |
| API Products         | http://localhost:8080/api/products        | JSON array of products     |
| Frontend             | http://localhost:3000                     | TopRoof Solutions Homepage |
| Sample Data Loaded   | Check console logs                        | "DataInitializer" messages |

### 🔄 Auto-Initialized Data

On first startup, the DataInitializer automatically populates:

| Data               | Count | Details                                  |
| ------------------ | ----- | ---------------------------------------- |
| 👤 Admin User      | 1     | `admin@toproof.com` / `admin123`         |
| 👤 Regular User    | 1     | `user@toproof.com` / `user123`           |
| 📦 Sample Products | 14+   | Roofing tiles, metal sheets, accessories |

---

## 🛠️ Troubleshooting

### Common Issues and Solutions

<details>
<summary><b>❌ Backend fails to start - "Access denied for user"</b></summary>

**Problem:** MySQL authentication error

**Solution:**
1. Verify MySQL credentials in `backend/src/main/resources/application.properties`
2. Update `spring.datasource.username` and `spring.datasource.password`
3. Ensure MySQL user has proper permissions:
   ```sql
   GRANT ALL PRIVILEGES ON toproofdb.* TO 'your_user'@'localhost';
   FLUSH PRIVILEGES;
   ```
</details>

<details>
<summary><b>❌ Port 8080 already in use</b></summary>

**Problem:** Another application is using port 8080

**Solution:**
1. **Option A:** Stop the other application using port 8080
2. **Option B:** Change backend port in `application.properties`:
   ```properties
   server.port=8081
   ```
3. Update frontend API configuration in `frontend/src/config/api.js` accordingly
</details>

<details>
<summary><b>❌ Frontend "Network Error" when calling API</b></summary>

**Problem:** Backend not running or CORS issue

**Solution:**
1. Verify backend is running: http://localhost:8080/actuator/health
2. Check CORS configuration in `backend/config/CorsConfig.java`
3. Clear browser cache and restart frontend
4. Verify API base URL in `frontend/src/config/api.js`
</details>

<details>
<summary><b>❌ "Cannot find module" errors in frontend</b></summary>

**Problem:** Missing Node.js dependencies

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```
</details>

<details>
<summary><b>❌ MySQL "Unknown database 'toproofdb'"</b></summary>

**Problem:** Database not created

**Solution:**
```sql
CREATE DATABASE IF NOT EXISTS toproofdb;
```
</details>

<details>
<summary><b>❌ Java version mismatch error</b></summary>

**Problem:** Incompatible Java version

**Solution:**
1. Check your Java version: `java -version`
2. Ensure JDK 20 or higher is installed
3. Update JAVA_HOME environment variable
4. Verify with: `echo %JAVA_HOME%` (Windows) or `echo $JAVA_HOME` (Linux/Mac)
</details>

### Need More Help?

- Check the console logs for detailed error messages
- Review backend logs in `backend/logs/` (if logging is configured)
- Ensure all prerequisites are correctly installed
- Verify MySQL service is running: `services.msc` (Windows) or `systemctl status mysql` (Linux)

---

## ⚙️ Configuration

### Backend Configuration

**Primary Configuration:** `backend/src/main/resources/application.properties`

```properties
# Server Configuration
server.port=8080
spring.application.name=backend

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/toproofdb
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Logging Configuration
logging.level.com.toproof.backend=DEBUG
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %logger{36} - %msg%n
```

**Production Configuration:** `backend/src/main/resources/application-prod.properties`

```properties
# Production profile settings
spring.jpa.show-sql=false
logging.level.com.toproof.backend=INFO
```

### Frontend Configuration

**API Configuration:** `frontend/src/config/api.js`

```javascript
// Base URL for backend API
export const API_BASE_URL = 'http://localhost:8080/api';

// Axios default configuration
export const axiosConfig = {
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
};
```

### Environment Variables (Optional)

Create `.env` file in frontend directory:

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_ENVIRONMENT=development
```

---

## 👨‍💻 Development Guidelines

### Running in Development Mode

**Backend (with auto-reload):**
```bash
cd backend
.\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
```

**Frontend (with hot reload):**
```bash
cd frontend
npm start
```

### Building for Production

**Backend:**
```bash
cd backend
.\mvnw.cmd clean package -DskipTests
# JAR file will be in target/backend-*.jar
```

**Frontend:**
```bash
cd frontend
npm run build
# Build output will be in build/ directory
```

### Code Quality

**Backend:**
- Follow Java naming conventions (PascalCase for classes, camelCase for methods)
- Use meaningful variable and method names
- Add JavaDoc comments for public methods
- Keep controllers thin, business logic in services

**Frontend:**
- Use functional components with hooks
- Break down large components into smaller reusable ones
- Follow React best practices
- Use meaningful component and variable names

### Testing

**Backend:**
```bash
cd backend
.\mvnw.cmd test
```

**Frontend:**
```bash
cd frontend
npm test
```

### Database Management

**Reset Database:**
```sql
DROP DATABASE toproofdb;
CREATE DATABASE toproofdb;
```
Then restart backend to re-initialize with sample data.

**Backup Database:**
```bash
mysqldump -u root -p toproofdb > backup_$(date +%Y%m%d).sql
```

**Restore Database:**
```bash
mysql -u root -p toproofdb < backup_20260309.sql
```

### API Testing

Use tools like:
- **Postman** - GUI-based API testing
- **cURL** - Command-line testing
- **Thunder Client** (VS Code Extension)

Example cURL request:
```bash
# Get all products
curl -X GET http://localhost:8080/api/products

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@toproof.com","password":"user123"}'
```

---

## 🔒 Security Features

### Implementation Overview

TopRoof Solutions implements multiple security layers to protect user data and ensure safe transactions:

| Security Feature              | Implementation                                            | Status |
| ----------------------------- | --------------------------------------------------------- | ------ |
| 🔐 Password Encryption        | BCrypt hashing algorithm                                  | ✅     |
| 🛡️ Authentication             | Session-based with secure login/logout                    | ✅     |
| 👤 Role-Based Access Control  | Admin and User roles with permission management           | ✅     |
| 🔒 CORS Configuration         | Restricted cross-origin requests                          | ✅     |
| 🚫 SQL Injection Prevention   | Prepared statements via JPA/Hibernate                     | ✅     |
| 🔑 Input Validation           | Server-side validation for all user inputs                | ✅     |
| 🌐 HTTPS Support              | Ready for SSL/TLS certificate configuration               | 🔄     |
| 🔐 JWT Authentication         | Token-based authentication (planned for future)           | 📋     |
| 📧 Email Verification         | Account verification via email (planned)                  | 📋     |
| 🔄 Session Management         | Persistent login with localStorage                        | ✅     |

### Security Best Practices

**For Administrators:**
- Change default admin credentials immediately after first login
- Use strong passwords with mix of characters, numbers, and symbols
- Regularly update user access permissions
- Monitor user activity and order patterns
- Keep system and dependencies up to date

**For Developers:**
- Never commit sensitive credentials to version control
- Use environment variables for configuration
- Implement rate limiting for API endpoints (recommended)
- Regular security audits and penetration testing
- Keep dependencies updated to patch vulnerabilities

**Password Requirements:**
- Minimum 8 characters
- BCrypt encryption with strength 10
- Stored as irreversible hash in database

### CORS Configuration

Configured in `backend/config/CorsConfig.java`:

```java
// Allowed origins
.allowedOrigins("http://localhost:3000")

// Allowed HTTP methods
.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")

// Allowed headers
.allowedHeaders("*")
```

**⚠️ Production Note:** Update allowed origins to match your production domain.

---

## ⚡ Performance Optimization

### Backend Optimizations

| Optimization                    | Implementation                                              | Impact     |
| ------------------------------- | ----------------------------------------------------------- | ---------- |
| 🔄 **Connection Pooling**       | HikariCP (default in Spring Boot)                           | High       |
| 📊 **JPA Query Optimization**   | Lazy loading, fetch joins for related entities              | High       |
| 💾 **Database Indexing**        | Primary keys, foreign keys auto-indexed                     | Medium     |
| 🗃️ **Response Caching**         | Static resources cached (planned)                           | Medium     |
| ⚡ **Async Processing**         | For email notifications and heavy operations (planned)      | Low        |

### Frontend Optimizations

| Optimization                    | Implementation                                              | Impact     |
| ------------------------------- | ----------------------------------------------------------- | ---------- |
| 📦 **Code Splitting**           | React lazy loading for routes                               | High       |
| 🖼️ **Image Optimization**       | External image hosting, lazy loading (planned)              | High       |
| 💨 **Asset Minification**       | Production build optimization with React Scripts            | Medium     |
| 🔄 **Component Memoization**    | React.memo for expensive components                         | Medium     |
| 🌐 **CDN Delivery**             | For static assets in production (recommended)               | High       |

### Database Performance Tips

```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_product_category ON products(category);
CREATE INDEX idx_product_brand ON products(brand);
CREATE INDEX idx_order_user ON orders(user_id);
CREATE INDEX idx_order_status ON orders(status);

-- Analyze table performance
ANALYZE TABLE products;
ANALYZE TABLE orders;

-- Check query performance
EXPLAIN SELECT * FROM products WHERE category = 'Roofing';
```

### Performance Monitoring

**Backend Metrics:**
- Spring Boot Actuator endpoints
- Response time monitoring via logs
- Database connection pool stats

**Frontend Metrics:**
- React Developer Tools Profiler
- Chrome DevTools Lighthouse
- Network request analysis

### Recommended Settings

**Production application.properties:**
```properties
# Connection Pool
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000

# JPA
spring.jpa.properties.hibernate.jdbc.batch_size=20
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true

# Enable compression
server.compression.enabled=true
server.compression.mime-types=text/html,text/xml,text/plain,text/css,text/javascript,application/javascript,application/json
```

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

## 🚢 Deployment

### 🆓 Free Hosting Guide (Recommended for Beginners)

Host your complete project **100% FREE** on Railway and Vercel! Perfect for students and portfolios.

**📚 Complete Deployment Guides:**

| Guide | Description | Time |
|-------|-------------|------|
| **[🚀 QUICK_START.md](./QUICK_START.md)** | Simple 3-step guide - Start here! | 45 min |
| **[📋 DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** | Step-by-step checklist format | 60 min |
| **[📖 DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** | Detailed beginner-friendly guide | Full guide |
| **[🚂 backend/RAILWAY_SETUP.md](./backend/RAILWAY_SETUP.md)** | Backend deployment on Railway | Reference |
| **[▲ frontend/VERCEL_SETUP.md](./frontend/VERCEL_SETUP.md)** | Frontend deployment on Vercel | Reference |

**What's Included:**
- ✅ MySQL Database (Railway)
- ✅ Spring Boot Backend (Railway)
- ✅ React Frontend (Vercel)
- ✅ Automatic HTTPS/SSL
- ✅ CI/CD auto-deployment
- ✅ **Total Cost: $0/month**

**Quick Setup:**
1. Push code to GitHub
2. Deploy database + backend on Railway
3. Deploy frontend on Vercel
4. Connect everything - Done! 🎉

### 🛠️ Manual Deployment Options

**Option 1: JAR File Deployment**

```bash
# Build JAR
cd backend
.\mvnw.cmd clean package -DskipTests

# Run JAR
java -jar target/backend-*.jar
```

**Option 2: Docker Deployment**

```bash
# Build image
cd backend
docker build -t toproof-backend:latest .

# Run container
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/toproofdb \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=yourpassword \
  toproof-backend:latest
```

### Deploying Frontend

**Build for Production:**

```bash
cd frontend
npm run build
```

**Deploy Options:**
- **Static Hosting:** Deploy `build/` folder to Netlify, Vercel, or GitHub Pages
- **Web Server:** Serve with Nginx, Apache, or IIS
- **Docker:** Create Nginx-based container

**Example Nginx Configuration:**

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        root /path/to/frontend/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Production Considerations

- [ ] Update CORS settings in `CorsConfig.java` for production domain
- [ ] Enable HTTPS with SSL certificates
- [ ] Set strong MySQL passwords
- [ ] Configure production logging levels
- [ ] Set `spring.jpa.hibernate.ddl-auto=validate` or `none` in production
- [ ] Enable database connection pooling optimization
- [ ] Setup regular database backups
- [ ] Configure monitoring and alerting
- [ ] Use environment variables for sensitive configuration

---

## ❓ Frequently Asked Questions (FAQ)

<details>
<summary><b>Q: Can I use this project for commercial purposes?</b></summary>

Yes! This project is licensed under the MIT License, which allows commercial use. However, please review the full license terms and ensure you comply with all requirements.
</details>

<details>
<summary><b>Q: How do I change the default admin credentials?</b></summary>

1. Login as admin (`admin@toproof.com` / `admin123`)
2. Navigate to Admin Dashboard
3. Go to Profile Settings
4. Update your password
5. Alternatively, you can modify `DataInitializer.java` before first run
</details>

<details>
<summary><b>Q: Can I add payment gateway integration?</b></summary>

Yes! The order checkout system is designed to be extensible. You can integrate payment gateways like:
- Stripe
- PayPal
- PayHere (Sri Lankan payment gateway)
- Bank payment APIs

Add the integration in the `OrderController` and update frontend checkout component.
</details>

<details>
<summary><b>Q: How do I add more product categories?</b></summary>

1. **Via Admin Dashboard:** Login as admin and create products with new category names
2. **Via Database:** Insert products with desired category values
3. **Via API:** POST to `/api/admin/products` with new category

Categories are dynamic and don't require code changes.
</details>

<details>
<summary><b>Q: Is there a mobile app version?</b></summary>

Currently, the application is web-based but fully responsive and works on mobile browsers. A native mobile app using React Native is planned for future development.
</details>

<details>
<summary><b>Q: How do I backup my data?</b></summary>

Use MySQL backup commands:
```bash
mysqldump -u root -p toproofdb > backup.sql
```
Automate backups using cron jobs (Linux) or Task Scheduler (Windows).
</details>

<details>
<summary><b>Q: Can I deploy this to cloud platforms?</b></summary>

Yes! Deployment options include:
- **Backend:** Heroku, AWS EC2, Google Cloud, DigitalOcean, Azure
- **Frontend:** Netlify, Vercel, GitHub Pages, AWS S3 + CloudFront
- **Database:** AWS RDS, Google Cloud SQL, Azure Database for MySQL

See the [Deployment](#-deployment) section for detailed instructions.
</details>

<details>
<summary><b>Q: How do I enable email notifications?</b></summary>

1. Add Spring Boot Mail dependency to `pom.xml`
2. Configure SMTP settings in `application.properties`
3. Create `EmailService` class
4. Integrate email sending in order and registration flows

This feature is planned for future implementation.
</details>

<details>
<summary><b>Q: What if I encounter CORS errors?</b></summary>

Check `backend/config/CorsConfig.java` and ensure:
1. Frontend URL is in allowed origins
2. Required HTTP methods are allowed
3. Credentials are allowed if needed

For production, update to your domain name instead of `localhost:3000`.
</details>

<details>
<summary><b>Q: How can I contribute to this project?</b></summary>

See the [Contributing](#-contributing) section for detailed guidelines. We welcome:
- Bug reports
- Feature requests
- Code improvements
- Documentation updates
- UI/UX enhancements
</details>

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### How to Contribute

1. **Fork the Repository**
   ```bash
   # Click 'Fork' button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/TopRoof-Solutions.git
   cd TopRoof-Solutions
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

4. **Make Your Changes**
   - Write clean, well-documented code
   - Follow existing code style
   - Add tests if applicable
   - Update documentation as needed

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   ```
   
   **Commit Message Conventions:**
   - `Add:` New feature or functionality
   - `Fix:` Bug fix
   - `Update:` Changes to existing features
   - `Docs:` Documentation updates
   - `Style:` Code formatting, no functional changes
   - `Refactor:` Code restructuring

6. **Push to Your Fork**
   ```bash
   git push origin feature/AmazingFeature
   ```

7. **Open a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your fork and branch
   - Provide a clear description of your changes

### Code Review Process

- All submissions require review before merging
- We may suggest changes or improvements
- Tests must pass before merging
- Follow the project's coding standards

### Reporting Issues

Found a bug? Have a feature request?

1. Check if the issue already exists
2. Create a new issue with detailed description
3. Include steps to reproduce (for bugs)
4. Add screenshots if relevant

### Development Setup for Contributors

```bash
# Install backend dependencies
cd backend
.\mvnw.cmd clean install

# Install frontend dependencies  
cd frontend
npm install

# Run both servers
# Terminal 1: Backend
cd backend && .\mvnw.cmd spring-boot:run

# Terminal 2: Frontend
cd frontend && npm start
```

---

## 📞 Access the Platform

### Application URLs

| Service                  | URL                                                                            | Description                       |
| ------------------------ | ------------------------------------------------------------------------------ | --------------------------------- |
| 🖥️ **Frontend**          | [http://localhost:3000](http://localhost:3000)                                 | Main user interface               |
| ⚙️ **Backend API**       | [http://localhost:8080](http://localhost:8080)                                 | RESTful API endpoints             |
| 📖 **API Health Check**  | [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health) | Backend health status             |
| 🔍 **Sample API Calls**  | [http://localhost:8080/api/products](http://localhost:8080/api/products)       | View all products (test endpoint) |

### Direct Access Links

After starting the application, you can directly access:

- **Home Page:** http://localhost:3000
- **Products:** http://localhost:3000/products
- **Login:** http://localhost:3000/login
- **Register:** http://localhost:3000/register
- **Admin Dashboard:** http://localhost:3000/admin/dashboard (login as admin)
- **User Dashboard:** http://localhost:3000/dashboard (login as user)

### Testing the Setup

Quick verification checklist:

1. ✅ Backend responds: http://localhost:8080/actuator/health
2. ✅ API returns data: http://localhost:8080/api/products
3. ✅ Frontend loads: http://localhost:3000
4. ✅ Can login with: `admin@toproof.com` / `admin123`
5. ✅ Products display on homepage
6. ✅ Can add items to cart

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

```
MIT License

Copyright (c) 2024-2026 TopRoof Solutions

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

## 📈 Project Status

![Status](https://img.shields.io/badge/Status-Active_Development-success)
![Maintained](https://img.shields.io/badge/Maintained-Yes-brightgreen)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen)

**Current Version:** 1.0.0  
**Last Updated:** March 2026  
**Next Release:** Feature updates and enhancements planned

---

### ⭐ If you found this project helpful, please consider giving it a star!

### 🔗 Connect & Share

Share this project with others who might benefit from it:
- 🐦 Twitter
- 💼 LinkedIn
- 📘 Facebook
- 📌 Pinterest

---

<div align="center">
  <strong>Made with ❤️ for the Sri Lankan Construction Industry</strong>
  <br><br>
  <sub>© 2024-2026 TopRoof Solutions | Licensed under MIT</sub>
  <br>
  <sub>Built with Spring Boot, React, and MySQL</sub>
</div>

</div>
