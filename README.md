# 🚀 Invitar — Multivendor Greeting Card Marketplace

Invitar is a **full-stack multivendor ecommerce platform** focused on **exploring, customizing, and purchasing greeting cards**.  
It connects customers with local vendors, offers personalization options, and provides order workflows — all built with **React.js** on the frontend and **Django + MySQL** on the backend.

---

## 🧠 Project Overview

Invitar is designed to be a user-friendly marketplace where vendors can upload and manage greeting cards, and customers can browse, customize, and order them. The platform supports vendor dashboards, order tracking, search filters, advertisements, and more.

---

## 📦 Features

### 🛍️ Core Functionality
- Browse and search greeting cards
- Filter cards by category and vendor
- Product customization before ordering
- Shopping cart management
- Order tracking system

### 🧑‍💼 Vendor Features
- Vendor registration and login
- Upload and manage greeting cards
- Request promotional advertisements
- Vendor dashboard for product control

### 🔐 Authentication & Email
- User authentication (login & signup)
- Secure password reset via Gmail SMTP
- Email notifications

### 🛠️ Admin Capabilities
- Approve or reject vendor advertisements
- Manage users, vendors, and products
- Monitor platform activity

---

## 🧩 Tech Stack

| Layer | Technology |
|------|-----------|
| Frontend | React.js (JSX) |
| Backend | Django |
| Database | MySQL |
| Email | Gmail SMTP |
| Deployment | Vercel |

---

## 🏗️ System Architecture

- **Frontend (React)** communicates with the backend using REST APIs
- **Backend (Django)** handles authentication, product management, cart logic, orders, ads, and emails
- **MySQL** stores all persistent data

---

## 🚀 Getting Started

### ⚙️ Backend Setup (Django)

```bash
git clone https://github.com/Shiroilt/Invitar.git
cd Invitar/backend
```

###  Create virtual environment:
```
python -m venv venv
source venv/bin/activate
```

###  Install dependencies:
```
pip install -r requirements.txt
```
### Configure environment variables in .env:
```
SECRET_KEY=your_secret_key
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
EMAIL_HOST_USER=your_gmail
EMAIL_HOST_PASSWORD=your_gmail_app_password
```
### Run migrations and server:
```
python manage.py migrate
python manage.py runserver
```
---
### Frontend Setup (React)
```
cd frontend
npm install
npm start
```
### Frontend runs at:
```
http://localhost:3000
```
---

### 📬 Email Configuration

Invitar uses Gmail SMTP for:
Password reset
Account notifications
Make sure App Password is enabled in your Google account.

---
### 📁 Project Structure
Invitar/
├── backend/
│   ├── users/
│   ├── products/
│   ├── orders/
│   ├── advertisement/
│   ├── manage.py
│   └── settings.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   └── App.jsx
│   └── package.json
├── requirements.txt
└── README.md

---
### 🧪 Testing

Backend tests:

python manage.py test


Frontend tests:

npm test
---

### 🤝 Contributing

Contributions are welcome!!!

Fork the repository

Create a feature branch

Commit your changes

Open a pull request

---
### 📜 License

This project is open-source.

---
### 📞 Contact

GitHub: https://github.com/Shiroilt

Email: sonishashwat@818gmail.com

---

### ✅ What you can do next
If you want, I can:
- Add **GitHub badges**
- Add **screenshots section**
- Write **API documentation**
- Optimize README for **recruiters / resume**
- Convert this into **professional open-source style**

Just tell me 👍
