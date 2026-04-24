# 📄 Document Management System

<p align="center">
  <b>Secure • Scalable • Enterprise-Ready Document Management Platform</b><br>
  Built for organizations to manage, store, and control digital documents efficiently.
</p>

---

## 🔷 Project Status

![Status](https://img.shields.io/badge/status-active-success)
![Backend](https://img.shields.io/badge/backend-Node.js-green)
![Frontend](https://img.shields.io/badge/frontend-Next.js-black)
![Database](https://img.shields.io/badge/database-MongoDB-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 🚀 Overview

The Document Management System (DMS) is a full-stack application designed to help organizations securely manage digital files with authentication, structured access, and scalable architecture.

This project is built with a **production-ready mindset**, making it suitable for:

* Enterprise internal tools
* Government/Institution systems
* SaaS product development

---

## ✨ Core Features

* 🔐 JWT-based Secure Authentication
* 📤 File Upload System (PDF, Images, Docs)
* 📂 Document Viewing & Management
* ⬇️ Download Support
* 🗑️ Delete with Access Control
* 🔍 Search & Filtering
* 🛡️ Protected Routes (Admin-based)
* ⚡ Fast REST API
* 📁 Modular & Scalable Backend

---

## 🏗 Architecture

### Frontend

* Next.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Multer (File handling)
* JWT Authentication
* Bcrypt (Security)

---

## 📁 Project Structure

```bash
backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── uploads/
├── server.js
└── .env

frontend/
├── pages/
├── components/
├── services/
├── styles/
├── utils/
```

---

## ⚙️ Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/MaheshGaikwad97/document-system.git
cd document-system
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run server:

```bash
node server.js
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Authentication Flow

1. Admin logs in
2. Credentials validated
3. JWT token generated
4. Token stored on client
5. Secure API access enabled

---

## 📡 API Endpoints

### Auth

| Method | Endpoint        | Description |
| ------ | --------------- | ----------- |
| POST   | /api/auth/login | Admin Login |

---

### Documents

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/documents     | Upload file   |
| GET    | /api/documents     | Get all files |
| GET    | /api/documents/:id | Get file      |
| DELETE | /api/documents/:id | Delete file   |

---

## 📁 File Handling

* Multer-based upload system
* Files stored in `/uploads`
* Metadata stored in MongoDB
* Static file serving enabled

---

## 🔒 Security

* JWT Authentication
* Password hashing (bcrypt)
* Protected API middleware
* Input validation
* Role-based access (extendable)

---

## 🚀 Deployment

| Layer    | Platform Options            |
| -------- | --------------------------- |
| Frontend | Vercel / Netlify            |
| Backend  | Render / AWS / DigitalOcean |
| Database | MongoDB Atlas               |
| Storage  | AWS S3 (Recommended)        |

---

## 📈 Roadmap

* ☁️ Cloud Storage Integration
* 👥 Multi-User Role System
* 📊 Admin Dashboard Analytics
* 🔔 Notification System
* 🧾 Audit Logs
* 📱 Mobile Optimization
* 🌐 Multi-tenant SaaS Version

---

## 🏢 Business Use Cases

* Educational Institutions
* Government Offices
* Corporate Document Handling
* Internal Company Tools
* SaaS Document Platforms

---

## 👨‍💻 Author

Mahesh Gaikwad

---

## 📜 License

This project is licensed under the MIT License.

---

## ⭐ Support

If you find this project useful, give it a star ⭐
