// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,

  // Product endpoints
  PRODUCTS: `${API_BASE_URL}/api/products`,

  // Cart endpoints
  CART_ADD: `${API_BASE_URL}/api/cart/add`,
  CART_GET: `${API_BASE_URL}/api/cart`,
  CART_UPDATE: `${API_BASE_URL}/api/cart/update`,
  CART_REMOVE: `${API_BASE_URL}/api/cart/remove`,
  CART_CLEAR: `${API_BASE_URL}/api/cart/clear`,

  // Order endpoints
  ORDERS: `${API_BASE_URL}/api/orders`,

  // Admin endpoints
  ADMIN_PRODUCTS: `${API_BASE_URL}/api/admin/products`,
  ADMIN_USERS: `${API_BASE_URL}/api/admin/users`,
  ADMIN_STATS: `${API_BASE_URL}/api/admin/stats`,
};

export default API_BASE_URL;
