# 🎨 Client (Frontend) Module — Dynamic Event Registration System

This folder contains the **React-based frontend** for user-facing workflows like event browsing, registration, admin access, and live email confirmations.

---

## 📁 Folder Overview

### 🖥️ `client/` — Frontend (Vite + React)

```txt
client/
├── public/
│   ├── images/              # Logos and static images
│   ├── videos/              # Background video for homepage header
│   └── _redirects           # SPA routing support (e.g., Netlify)
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Route-based views (Home, Events, Admin, etc.)
│   ├── services/            # API service logic
│   ├── styles/              # Global CSS
│   ├── utils/               # Shared utilities (e.g., axiosInstance)
│   ├── __test__/            # Frontend test suites
│   └── setupTests.js        # Vitest + Testing Library setup
├── .env
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🚀 Technologies Used

A modern frontend stack that balances speed, style, and scalability:

| 🔧 **Tool**           | 📄 **Description**                                    |
|----------------------|--------------------------------------------------------|
| 🎯 **React.js**       | Component-based library for building responsive UIs   |
| 🧭 **React Router**   | Seamless navigation and route management               |
| 🔌 **Axios**          | HTTP client for handling API requests efficiently      |
| 🎨 **Tailwind CSS**   | Utility-first CSS for custom, responsive styling       |
| 📝 **Formik + Yup**   | Declarative form handling with schema-based validation |
| ⚡ **Vite**           | Ultra-fast development server and bundler             |
| 🔔 **React Toastify** | Elegant, customizable toast notifications              |

---

## 🧩 Key Features

A responsive and user-friendly frontend packed with impactful functionality:

| 🌟 **Feature**                                              | 🧾 **Description**                                                     |
|-------------------------------------------------------------|------------------------------------------------------------------------|
| 🖱️ **Interactive Forms**                                    | Real-time validation powered by Formik + Yup                          |
| 🔐 **Admin Dashboard**                                      | Manage events, registrants, and analytics with role-based access      |
| ✨ **Responsive Design**                                     | Tailored views for mobile, tablet, and desktop users using Tailwind   |
| 🧭 **Protected Routes**                                      | Secure navigation with dynamic role checking                          |
| 📧 **Live Confirmation Emails**                              | Instant user feedback via Nodemailer triggered from the backend       |

---

## 🧪 Testing Setup

Robust testing ensures frontend stability and performance:

| 🧪 **Test Type**                     | 🔍 **Framework / Tool**           | 📝 **Purpose**                                  |
|-------------------------------------|----------------------------------|-------------------------------------------------|
| ✅ **Unit Testing**                  | **Vitest**                       | Component-level testing for individual logic    |
| 🧭 **End-to-End Testing (Planned)** | **Cypress / Playwright**         | Simulate full user flows for reliability checks |
| 📑 **Backend Test Logs**            | Refer `/server/README.md`        | Contains API responses, payloads, errors        |

> 🛠 To run tests locally:

```bash
npm run test

---

## 👨‍💻 Maintainer

| 👤 Name                       | 🎓 Role & Affiliation                  |
|------------------------------|----------------------------------------|
| **Ram Bhagat Thakur**        | B.Tech CSE @ Sandip University         |

### 🔗 Profiles

- 💼 GitHub: [@RamBhagatThakur](https://github.com/ram-bhagat-thakur/)  
- 💼 LinkedIn: [Ram Bhagat Thakur](https://www.linkedin.com/in/ram-bhagat-thakur/)

---

> 🎓 _Built as part of the **Internship Program** with [SECT](https://www.linkedin.com/company/sect-india/ ) and [Civora Nexus](https://www.linkedin.com/company/civoranexus/), empowering student developers to build real-world apps._
