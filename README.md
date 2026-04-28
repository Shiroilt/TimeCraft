# ⌚ TimeCraft — Watch Service Coordination & Customization Platform

![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![Django](https://img.shields.io/badge/Django-Backend-green?logo=django)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![AWS](https://img.shields.io/badge/AWS-Deployed-FF9900?logo=amazonaws)
![SSL](https://img.shields.io/badge/SSL-Enabled-brightgreen?logo=letsencrypt)
![License](https://img.shields.io/badge/License-MIT-yellow)

> TimeCraft is a full-stack web platform for browsing, customizing, and purchasing wristwatches and accessories — with integrated service booking, subscription plans, technician management, and an AI-powered RAG chatbot.

🌐 **Live Site:** [https://timecraft.timekeeper.ro](https://timecraft.timekeeper.ro)

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [AI Chatbot (RAG)](#ai-chatbot-rag)
- [AWS Infrastructure](#aws-infrastructure)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment Guide](#deployment-guide)
- [User Stories](#user-stories)
- [Team Members](#team-members)

---

## 📖 About the Project

TimeCraft is a **Watch Service Coordination and Customization Platform** built as a full-stack web application. It connects customers, technicians/service partners, and administrators in a single unified platform.

Customers can browse and customize watches, purchase accessories with compatibility enforcement, book servicing, and manage subscription-based service plans. Technicians can accept and manage service requests. Admins have full control over the product catalog, service partners, and analytics.

---

## ✨ Features

### 👤 Customer
- Secure registration & login with JWT authentication
- Browse & search watches by category with filters
- View detailed watch information
- Accessory compatibility enforcement (no incompatible purchases)
- Smart accessory & plan recommendations
- Add to cart & complete checkout
- View order history
- Book watch servicing
- Subscribe to periodic service plans
- Watch-specific dashboard for services & subscriptions

### 🔧 Technician / Service Partner
- Accept and manage assigned service requests
- Update service status in real time
- Upload service images for transparency

### 🛠️ Admin
- Manage watches and accessories (full CRUD)
- Approve and verify service partners
- View reports and analytics dashboard
- Notification system for orders, services, subscriptions

### 🤖 AI Chatbot (RAG)
- Context-aware chatbot specific to TimeCraft's products and services
- Built using **Retrieval-Augmented Generation (RAG)** technology
- Answers questions about watches, accessories, services, and orders

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite), Tailwind CSS, Axios |
| Backend | Django (Python 3.12), Django REST Framework |
| Database | PostgreSQL (AWS RDS) |
| File Storage | AWS S3 |
| Web Server | Nginx + Gunicorn |
| SSL | Let's Encrypt (Certbot) |
| Deployment | AWS EC2 (Ubuntu 24) |
| Monitoring | AWS CloudWatch + Lambda + SNS |
| AI Chatbot | RAG (Retrieval-Augmented Generation) |

---

## 🤖 AI Chatbot (RAG)

TimeCraft includes an intelligent chatbot powered by **RAG (Retrieval-Augmented Generation)** technology — making it specific and accurate to TimeCraft's own data.

### How RAG Works in TimeCraft:

```
User asks a question
        ↓
Query is converted to vector embeddings
        ↓
Similar content retrieved from TimeCraft's knowledge base
(products, services, FAQs, watch catalog)
        ↓
Retrieved context + user question sent to LLM
        ↓
LLM generates accurate, site-specific answer
        ↓
Response shown to user in chat UI
```

### Why RAG instead of a regular chatbot?

| Regular Chatbot | RAG Chatbot (TimeCraft) |
|----------------|------------------------|
| Generic answers | Answers specific to TimeCraft products |
| Makes up information | Grounded in real product/service data |
| Can't access your catalog | Knows your watches, accessories, prices |
| Static responses | Always up to date with your data |

### RAG Components:
- **Embedding Model** — converts product data & queries into vectors
- **Vector Store** — stores and retrieves relevant TimeCraft content
- **Knowledge Base** — watch catalog, service FAQs, accessory data
- **LLM** — generates final natural language response

---

## ☁️ AWS Infrastructure

TimeCraft is fully deployed on AWS using the following services:

---

### 🖥️ EC2 (Elastic Compute Cloud)
**Purpose:** Main application server hosting both React frontend and Django backend.

- **Instance Type:** t2.micro (AWS Free Tier)
- **OS:** Ubuntu 24 LTS
- **Region:** us-east-1 (N. Virginia)
- **Public IP:** 98.89.95.99 (Elastic IP)
- **What runs on it:**
  - Nginx (reverse proxy & static file server)
  - Gunicorn (Django production WSGI server)
  - React production build (dist/ folder served by Nginx)
  - CloudWatch Agent (monitoring)

**Nginx Configuration:**
```
Browser (HTTPS) → Nginx (port 443)
                    ↙           ↘
           React /dist/      Django API
           (static files)    127.0.0.1:8000
                             (Gunicorn)
```

---

### 🗄️ RDS (Relational Database Service)
**Purpose:** Managed PostgreSQL database for all TimeCraft data.

- **Engine:** PostgreSQL
- **Instance:** db.t3.micro (AWS Free Tier)
- **What it stores:**
  - User accounts & profiles
  - Watch & accessory catalog
  - Orders & cart data
  - Service bookings & history
  - Subscription plans
  - Technician assignments
- **Security:** Private subnet, only accessible from EC2 (not public internet)
- **Backups:** Automated daily backups by AWS

---

### 🪣 S3 (Simple Storage Service)
**Purpose:** File and media storage for user uploads and product images.

- **What it stores:**
  - Product images (watches, accessories)
  - User profile pictures
  - Service images uploaded by technicians
  - Static assets
- **Access:** Private bucket with IAM role-based access from EC2
- **Free Tier:** 5GB storage included

---

### 🌐 Nginx + SSL (Let's Encrypt)
**Purpose:** Production-grade web server with HTTPS.

- **Domain:** timecraft.timekeeper.ro
- **SSL Certificate:** Let's Encrypt (free, auto-renewing every 90 days)
- **Nginx handles:**
  - Serves React frontend from `/home/ubuntu/TimeCraft/frontend/dist/`
  - Proxies `/api/` requests to Django (Gunicorn on port 8000)
  - Proxies `/admin/` to Django admin
  - Serves Django static files from `/static/`
  - HTTP → HTTPS redirect (port 80 → 443)
  - File upload size limit: 10MB (`client_max_body_size 10M`)

---

### 📊 CloudWatch
**Purpose:** Monitor EC2 server health and collect application logs.

- **Metrics collected every 60 seconds:**
  - CPU usage (user, system, idle)
  - Memory usage (%)
  - Disk usage (%)
- **Logs collected:**
  - Nginx error logs → `timecraft-nginx-errors` log group
  - Nginx access logs → `timecraft-nginx-access` log group
- **Alarm:** `timecraft-cpu-high` — triggers when CPU > 70%

---

### 🔔 SNS (Simple Notification Service)
**Purpose:** Send alert notifications when CloudWatch alarms trigger.

- **Topic:** `timecraft-alerts`
- **Subscription:** Email notification to admin
- **Trigger:** CloudWatch alarm → SNS → Email alert
- **Use case:** CPU high, server errors, downtime alerts

---

### ⚡ Lambda
**Purpose:** Serverless function that processes CloudWatch alarm events and sends detailed alerts.

- **Function:** `timecraft-cpu-alert`
- **Runtime:** Python 3.12
- **Trigger:** SNS topic (`timecraft-alerts`)
- **What it does:**
  - Receives CloudWatch alarm event
  - Extracts alarm name, state, and reason
  - Publishes formatted email alert via SNS
- **Cost:** ~Free (runs only when alarm triggers, well within free tier)

**Alert Flow:**
```
CPU > 70% detected
      ↓
CloudWatch Alarm triggers
      ↓
SNS Topic notified
      ↓
Lambda function runs
      ↓
Formatted email sent to admin 📧
```

---

### 🔐 IAM (Identity and Access Management)
**Purpose:** Secure role-based access control for AWS services.

- **Role: `watcherLog`** — attached to EC2 instance
  - `CloudWatchAgentServerPolicy` — allows EC2 to send metrics/logs to CloudWatch
  - `AmazonEC2ReadOnlyAccess` — allows reading EC2 metadata
- **Role: `timecraft-cpu-alert-role`** — attached to Lambda function
  - `AWSLambdaBasicExecutionRole` — allows Lambda to write logs
  - `AmazonSNSFullAccess` — allows Lambda to publish SNS messages

---

### Complete AWS Architecture Diagram

```
                        Users
                          │
                    HTTPS (443)
                          │
                   timecraft.timekeeper.ro
                   (FreeDNS → 98.89.95.99)
                          │
                    ┌─────▼─────┐
                    │   Nginx   │  ← SSL (Let's Encrypt)
                    │  (EC2)    │
                    └─────┬─────┘
                 ┌────────┴────────┐
                 ▼                 ▼
          React Frontend      Django API
          (/dist/ static)    (Gunicorn :8000)
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼               ▼
              PostgreSQL        AWS S3         CloudWatch
               (RDS)         (Media/Files)   (Monitoring)
                                                   │
                                            ┌──────┴──────┐
                                            ▼             ▼
                                           SNS          Alarm
                                            │        (CPU > 70%)
                                            ▼
                                         Lambda
                                            │
                                            ▼
                                      Email Alert 📧
```

---

## 📁 Project Structure

```
TimeCraft/
├── frontend/                   # React (Vite) frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── utils/
│   │   │   ├── axios.js        # API base URL config
│   │   │   └── constants.js    # Global constants
│   │   └── App.jsx
│   ├── dist/                   # Production build (served by Nginx)
│   └── package.json
│
├── backend/                    # Django backend
│   ├── backend/
│   │   ├── settings.py         # Django settings
│   │   ├── urls.py
│   │   └── wsgi.py             # Gunicorn entry point
│   ├── api/                    # REST API app
│   ├── users/                  # User management
│   ├── products/               # Watch & accessory catalog
│   ├── orders/                 # Order management
│   ├── services/               # Service booking
│   ├── chatbot/                # RAG chatbot
│   ├── static/                 # Django static files
│   ├── venv/                   # Python virtual environment
│   └── requirements.txt
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.12+
- Node.js 18+
- PostgreSQL
- Git

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/TimeCraft.git
cd TimeCraft
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Configure environment variables
```bash
cp .env.example .env
nano .env                        # Fill in your values
```

### 4. Run Django (development)
```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### 5. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`
Backend runs at: `http://localhost:8000`

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Django
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=timecraft.timekeeper.ro,98.89.95.99,localhost

# Database (AWS RDS)
DB_NAME=timecraft
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_HOST=your-rds-endpoint.rds.amazonaws.com
DB_PORT=5432

# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_STORAGE_BUCKET_NAME=your-bucket-name
AWS_S3_REGION_NAME=us-east-1

# CORS
CORS_ALLOWED_ORIGINS=https://timecraft.timekeeper.ro
```

---

## 🌍 Deployment Guide

### On EC2 — Start Everything

```bash
# Start Nginx
sudo systemctl start nginx

# Start Django (Gunicorn)
cd ~/TimeCraft/backend
source venv/bin/activate
gunicorn backend.wsgi:application --bind 127.0.0.1:8000 --daemon
```

### When you change Django code
```bash
pkill gunicorn
cd ~/TimeCraft/backend
source venv/bin/activate
gunicorn backend.wsgi:application --bind 127.0.0.1:8000 --daemon
```

### When you change React code
```bash
cd ~/TimeCraft/frontend
npm run build
sudo systemctl restart nginx
```

### Check status
```bash
sudo systemctl status nginx       # Nginx status
ps aux | grep gunicorn            # Gunicorn status
sudo tail -20 /var/log/nginx/error.log   # Nginx errors
```

### Stop everything
```bash
sudo systemctl stop nginx
pkill gunicorn
```

---

## 📋 User Stories

| ID | Role | Feature |
|----|------|---------|
| US001 | Customer | Secure registration |
| US002 | Customer | Login & account management |
| US003 | Customer | Update profile |
| US004 | Customer | Browse watches by category |
| US005 | Customer | Search & filter watches |
| US006 | Customer | View detailed watch info |
| US007 | Customer | Add to cart |
| US008 | Customer | Checkout & place orders |
| US009 | Customer | View order history |
| US010 | Customer | View compatible accessories |
| US011 | Customer | Get accessory recommendations |
| US012 | Customer | Book watch servicing |
| US013 | Customer | Subscribe to service plans |
| US014 | Customer | Watch-specific dashboard |
| US015 | Technician | Accept & manage service requests |
| US016 | Technician | Update service status & upload images |
| US017 | Admin | Manage watches & accessories |
| US018 | Admin | Approve service partners |
| US019 | Admin | View reports & analytics |

---

## 👥 Team Members

| Name | ID |
|------|----|
| Dhrumil Doshi | 202512088 |
| Harsh Rathod | 202512086 |
| Shashwat Soni | 202512040 |
| Deep Soni | 202512089 |

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">Built with ❤️ by Team TimeCraft</p>
