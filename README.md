# 🚀 Admin Panel API (Node.js + Express + MySQL)

A production-ready REST API for an Admin Panel built with Node.js, Express, and MySQL.
Includes authentication, role-based access control, product management, dashboard analytics, and reporting.

---

## 📌 Features

### 🔐 Authentication & Authorization

* User registration & login (JWT)
* Password hashing with bcrypt
* Role-based access (Admin / User)
* Protected routes with middleware

---

### 👤 User Management

* Register users
* Login users
* Profile access
* Role system (admin/user)

---

### 📦 Product Management (Admin)

* Create product (with image upload)
* Get all products (pagination + search + filter)
* Get a single product
* Update product (with image replacement)
* Delete product (with image cleanup)

---

### 📊 Dashboard & Reports

* Admin dashboard statistics
* Date-based report system
* Analytics-ready API responses

---

### 🖼️ File Upload System

* Image upload using Multer
* Static file serving
* Old image auto-delete on update

---

### 🛡️ Security Features

* Helmet (secure HTTP headers)
* Rate limiting (DDoS protection)
* CORS configuration
* Input validation (express-validator)

---

### ⚙️ Clean Architecture

* MVC pattern (Model-View-Controller)
* Centralized error handling
* Standard API response format
* Modular folder structure

---

## 📁 Project Structure

```
project/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── config/
├── uploads/
├── app.js
└── .env
```

---

## ⚡ Installation

```bash
git clone https://github.com/your-username/admin-api.git
cd admin-api
npm install
```

---

## 🔑 Environment Variables (.env)

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=node_crud
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

---

## ▶️ Run Project

```bash
npm start
```

Server will run at:

```
http://localhost:3000
```

---

## 🔗 API Endpoints

### 🔐 Auth

| Method | Endpoint      |
| ------ | ------------- |
| POST   | /api/register |
| POST   | /api/login    |
| GET    | /api/profile  |

---

### 📦 Products (Admin)

| Method | Endpoint                   |
| ------ | -------------------------- |
| POST   | /api/admin/create-product  |
| GET    | /api/admin/products        |
| GET    | /api/admin/single-product/ |
| PUT    | /api/admin/update-product/ |
| DELETE | /api/admin/delete-product/ |

---

### 📊 Dashboard

| Method | Endpoint             |
| ------ | -------------------- |
| GET    | /api/admin/dashboard |

---

### 📈 Reports

| Method | Endpoint                                        |
| ------ | ----------------------------------------------- |
| GET    | /api/admin/report?from=YYYY-MM-DD&to=YYYY-MM-DD |

---

## 📦 Example Request (Create Product)

**Form-data**

```
name: Phone
price: 500
status: 1
image: (file)
```

---

## 🧠 Tech Stack

* Node.js
* Express.js
* MySQL
* JWT (jsonwebtoken)
* bcryptjs
* multer
* express-validator
* helmet
* cors
* express-rate-limit

---

## 📌 API Response Format

### ✅ Success

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

### ❌ Error

```json
{
  "success": false,
  "message": "Error message",
  "errors": {}
}
```

---

## 🚀 Future Improvements

* Redis caching
* Docker support
* CI/CD pipeline
* Advanced analytics
* Payment integration

---

## 👨‍💻 Author

**Md Tuhin Sarker**
Backend Developer (Node.js, Laravel, React)

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
