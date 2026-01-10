# 🏠 TopRoof Solutions – E-Commerce Platform for Roofing and Gutter Products in Sri Lanka

TopRoof Solutions is a robust, user-friendly e-commerce platform designed to modernize the distribution of roofing products across Sri Lanka. This project caters to construction companies, contractors, and homeowners by providing a reliable, comprehensive, and accessible online store for gutters, roofing sheets, downspouts, and accessories.

---

## 📌 Problem Statement

In Sri Lanka, the roofing product industry is largely dependent on traditional retail stores with limited availability, inconsistent product variety, and inconvenient operating hours. Customers often struggle to find specific or custom roofing solutions easily.

TopRoof Solutions addresses these issues by offering:

- A centralized online marketplace for roofing products.
- Easy access to a wide range of quality items, including specialty products.
- A mobile-responsive, secure, and efficient shopping experience.

---

## 🎯 Project Objectives

- Enable customers to browse, compare, and purchase roofing and guttering products online.
- Provide manufacturers and distributors a broader platform to list their products.
- Offer a reliable delivery service and secure payment options.
- Support role-based access (Admin, Customer) for streamlined management.

---

## 🚀 Features

### **User Features**

- 🔐 **Secure Authentication**: User registration and login with BCrypt password encryption
- 🛍️ **Product Browsing**: View products by categories (Roofing, Accessories)
- 🔍 **Advanced Search & Filtering**:
  - Real-time product search by name and description
  - Filter by category, brand, and price range
  - Sort products by price (low to high, high to low) or name (A-Z, Z-A)
  - Combined multi-filter support with instant results
  - Collapsible filter panel for better UX
- 🛒 **Shopping Cart**: Add, update quantity, remove items, and checkout
- 📦 **Order Management**: View order history with status tracking
- 👤 **User Dashboard**: Personal profile, order tracking, and quick actions
- 🔄 **Persistent Sessions**: Auto-login with localStorage (stay logged in)
- 👨‍💼 **User Profile Dropdown**: Quick access to dashboard, cart, and logout

### **Admin Features**

- 👨‍💼 **Admin Dashboard**: Full-featured admin panel with tabbed navigation
- � **Statistics Overview**: Real-time stats for orders, revenue, and users
- 🏷️ **Product Management**: Create, read, update, and delete products
  - Product details: name, price, category, brand, stock, description
  - Image management with Unsplash URLs
  - Featured and bestseller flags
- � **User Management**: Create, update, and delete users and admins
  - Role assignment (USER/ADMIN)
  - Full CRUD operations on user accounts
- 📋 **Order Overview**: View all orders with status and details
- 🎨 **Responsive Layout**: Full-width dashboard optimized for all screen sizes

### **Technical Features**

- 🖥️ **Mobile-Responsive Design**: Breakpoints at 768px, 1024px, and 1920px
- ⚡ **RESTful API**: 33+ endpoints for complete backend operations
- 🔒 **Password Security**: BCrypt hashing for all user passwords
- 🌐 **Session Persistence**: localStorage integration for seamless experience
- 📐 **Overflow-Free UI**: No horizontal scrolling on any dashboard
- 🎨 **Modern UI/UX**: Gradient designs, hover effects, and smooth transitions
- 🔍 **Advanced Filtering**: Multi-parameter product filtering with real-time updates
- 🗂️ **Dynamic Sorting**: Multiple sorting options for better product discovery

---

## 🧱 Tech Stack

- **Frontend**: React.js 18 with React Router
- **Backend**: Spring Boot 3.5.7 (Java 20)
- **Database**: MySQL 9.5
- **Authentication**: BCrypt password hashing with localStorage session management
- **Styling**: Custom CSS with Grid and Flexbox layouts
- **Icons**: React Icons (FontAwesome)
- **Images**: Unsplash integration for product images

---

## 🎁 Deliverables

- Fully functional web-based e-commerce platform.
- Mobile-responsive user interface.
- Admin dashboard for moderation and product management.
- Customer panel for order tracking and account management.
- Secure payment and order handling system.

---

## 👥 Who Benefits?

- 🏗️ **Contractors & Homeowners**: Access to high-quality, specialized roofing solutions.
- 🏢 **Manufacturers & Distributors**: Digital storefront and wider market reach.
- 💼 **Platform Owners**: Increased sales opportunities and long-term customer retention.

---

## 🔗 Related Projects

- **Global Models**: Amazon, eBay – user experience, payment flow, order handling.
- **Local References**:
  - [Daraz.lk](https://www.daraz.lk)
  - [LankaRoof.lk](https://www.lankaroof.lk)
  - [Roofing.lk](https://www.roofing.lk)
  - [BuildingMaterial.lk](https://www.buildingmaterial.lk)

---

## 📦 Installation & Setup

### Prerequisites

- **Java 20.0.1** or higher
- **Node.js** and **npm**
- **MySQL 9.5** or higher
- **Maven** (included via Maven Wrapper)

### Clone the Repository:

```bash
git clone https://github.com/madurangaPrabhath/TopRoof-Solutions.git
cd TopRoof-Solutions
```

---

### Database Setup:

1. Create a MySQL database:

```sql
CREATE DATABASE toproofdb;
```

2. Update database credentials in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/toproofdb
spring.datasource.username=root
spring.datasource.password=1234
```

---

### Backend (Spring Boot):

1. Navigate to the backend directory:

```bash
cd backend
```

2. Build the project:

```bash
./mvnw.cmd clean package -DskipTests  # Windows
# OR
./mvnw clean package -DskipTests      # Linux/Mac
```

3. Run the application:

```bash
./mvnw.cmd spring-boot:run            # Windows
# OR
./mvnw spring-boot:run                # Linux/Mac
```

The backend will start on **http://localhost:8080**

**Note:** The DataInitializer will automatically populate the database with:

- 14 sample products (roofing and accessories)
- 2 sample users:
  - Admin: `admin@toproof.com` / `admin123`
  - User: `user@toproof.com` / `user123`

---

### Frontend (React):

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The frontend will open automatically at **http://localhost:3000**

---

## 🔑 Default Login Credentials

### Admin Account:

- **Email:** admin@toproof.com
- **Password:** admin123

### User Account:

- **Email:** user@toproof.com
- **Password:** user123

---

## 🌐 API Endpoints

### Authentication (`/api/auth`)

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products (`/api/products`)

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Get products by
- `GET /api/products/search?keyword={keyword}` - Search products by keyword
- `GET /api/products/filter?search={term}&category={cat}&brand={brand}&minPrice={min}&maxPrice={max}&sortBy={sort}` - Advanced filtering
- `GET /api/products/brands` - Get all unique brands
- `GET /api/products/categories` - Get all unique categories category
- `GET /api/products/featured` - Get featured products
- `GET /api/products/bestsellers` - Get bestseller products

### Cart (`/api/cart`)

- `POST /api/cart/add` - Add item to cart
- `GET /api/cart/user/{userId}` - Get user's cart
- `PUT /api/cart/{id}` - Update cart item
- `DELETE /api/cart/{id}` - Remove cart item

### Orders (`/api/orders`)

- `POST /api/orders` - Create new order
- `GET /api/orders/user/{userId}` - Get user's orders
- `GET /api/orders` - Get all orders (Admin)

### Admin (`/api/admin`)

- `GET /api/admin/products` - Get all products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/{id}` - Update product
- `DELETE /api/admin/products/{id}` - Delete product
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/{id}` - Update user
- `DELETE /api/admin/users/{email}` - Delete user

---

## 📁 Project Structure

```
TopRoof-Solutions/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/toproof/backend/
│   │   │   │   ├── BackendApplication.java
│   │   │   │   ├── config/
│   │   │   │   │   ├── CorsConfig.java
│   │   │   │   │   ├── DataInitializer.java
│   │   │   │   │   └── SecurityConfig.java
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AdminController.java
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── CartController.java
│   │   │   │   │   ├── OrderController.java
│   │   │   │   │   └── ProductController.java
│   │   │   │   ├── models/
│   │   │   │   │   ├── Cart.java
│   │   │   │   │   ├── Order.java
│   │   │   │   │   ├── OrderItem.java
│   │   │   │   │   ├── Product.java
│   │   │   │   │   └── User.java
│   │   │   │   ├── repo/
│   │   │   │   │   ├── CartRepository.java
│   │   │   │   │   ├── OrderRepository.java
│   │   │   │   │   ├── ProductRepository.java
│   │   │   │   │   └── UserRepository.java
│   │   │   │   └── service/
│   │   │   │       ├── CartService.java
│   │   │   │       ├── OrderService.java
│   │   │   │       ├── ProductService.java
│   │   │   │       └── UserService.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   └── mvnw.cmd
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── styles/
│   │   │       ├── Dashboard.css
│   │   │       ├── Header.css
│   │   │       ├── Footer.css
│   │   │       └── [other CSS files]
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── HeroSection.js
│   │   │   ├── TopSellingProducts.js
│   │   │   └── [other components]
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Products.js
│   │   │   ├── Cart.js
│   │   │   ├── UserDashboard.js
│   │   │   └── AdminDashboard.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

---

## 🎨 UI Highlights

- **Gradient Backgrounds**: Modern purple-blue gradient themes
- **Responsive Tables**: Fixed layout with percentage-based columns
- **Tab Navigation**: Clean admin dashboard with three main sections
- **User Dropdown**: Profile menu with user info, role badge, and quick actions
- **Card Layouts**: Grid-based product and action cards with hover effects
- **No Overflow**: Optimized CSS prevents horizontal scrolling on all pages

---

## 🔧 Technologies Used

### Backend

- Spring Boot 3.5.7
- Spring Data JPA
- Spring Security
- BCrypt Password Encoder
- MySQL Connector
- Maven

### Frontend

- React 18
- React Router DOM
- React Icons
- Fetch API for HTTP requests
- CSS Grid & Flexbox
- LocalStorage API

---

##⭐ Product reviews and ratings

- 📊 Advanced analytics dashboard
- 📱 Mobile app (React Native)
- 🌍 Multi-language support
- 🚚 Real-time delivery tracking
- 📸 Product image upload functionality
- 🔔 Stock alert notifications
- 📈 Sales reports and insights
- 📊 Advanced analytics dashboard
- 📱 Mobile app (React Native)
- 🌍 Multi-language support
- 🚚 Real-time delivery tracking

---

Access the platform:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8080](http://localhost:8080)
- API Docs: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html) (if Swagger is configured)

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use and adapt it as needed.
