# 📦 Dynamic Event Registration System

**Project Folder:** SECT-Internship-Project/Development/event-registration-system

**Tech Stack:** MERN Stack (MongoDB, Express, React, Node.js), Vite, TailwindCSS, JWT, Cookies, Express Middleware

---

## 📷 Screenshots

> Coming soon: UI previews of registration form, admin dashboard, and event creation page.

---

## 📌 Overview

This is a robust, full-stack event registration platform designed and developed during my internship at SECT. **It offers seamless admin control, real-time user registration, email notifications, and a visually appealing responsive UI** — all integrated in a modular, scalable architecture. It supports:

- **🔐 Admin** authentication and session management
- **🧑‍💼 Event** creation, editing, and deletion by admins
- **📝 Real-time** registration and confirmation via email
- **🎨 Visually expressive** UI/UX optimized for responsiveness
- **📁 Modular code** structure for scalability and readability

---

## 🗂️ File & Folder Structure

SECT-Internship-Project/
│
├── Development/
│   └── event-registration-system/
│       ├── Backend/
│       │   ├── middleware/auth.js
│       │   ├── models/{admin.js, Contact.js, Event.js, Registration.js}
│       │   ├── routes/{admin.js, contact.js, events.js, register.js, registratins.js}
│       │   ├── utils/{mailer.js, sendConfirmationEmail.js}
│       │   ├── uploads/        # Banner image storage
│       │   ├── .env
│       │   └── package.json
│       │
│       ├── Public/
│       │   └── images/, videos/       # Used for styling UI
│       │
│       ├── src/
│       │   ├── components/
│       │   │   ├── HOC/{AdminLayout, Layout, ProtectedRoute, WrongUrl}.jsx
│       │   │   ├── styles/index.css
│       │   │   └── {AdminNav, Card, Footer, Nav}.jsx
│       │   ├── pages/
│       │   │   └── {AddEvent, EditEvent, AdminDashboard, Home, Contact, ...}.jsx
│       │   └── main.jsx
│       │
│       ├── .gitignore
│       ├── vite.config.js
│       ├── index.html
│       └── README.md
│
├── Documentation/
│   ├── Coding/             # Starter components and notes
│   └── UI Ideas/           # Page-wise design breakdown (.docx files)
│
└── README.md               # Main repo overview (see separate file later)

---

## 🧰 Core Features

- **Authentication:**
Protected admin routes with jwt, custom middleware, and cookies. Backend logic lives in middleware/auth.js with secure route wrappers like ProtectedRoute.jsx.

- **Event CRUD Operations:**
Admins manage events through intuitive UIs powered by AddEvent, EditEvent, and AdminDashboard.jsx. Data handled via RESTful APIs (routes/events.js).

- **User Registration Flow:**
Public users can browse events (Events.jsx), see details (eventDetails.jsx), and register with confirmation sent via utils/mailer.js.

- **Dynamic Media:**
Images, videos, and banners rendered from Public and uploads folders to deliver a high-impact, visually compelling interface.

- **Error Handling & Fallbacks:**
WrongUrl.jsx and server-side middleware handle invalid paths and unexpected behavior gracefully.

---

## 🧪 Tech Breakdown

| Layer     | Stack & Tools                                       | 
| Frontend  | React (Vite), TailwindCSS, HOC, ProtectedRoute      | 
| Backend   | Node.js, Express.js, MongoDB, JWT, Cookies          | 
| UI/UX     | Figma-inspired layouts, dynamic banner support      | 
| Deployment| Render (planned), GitHub Integration, .env security | 
| Styling   | Custom CSS, responsive layout from styles/index.css | 
| Misc.     | Email confirmation (Nodemailer), ESLint               | 


---

## 🛠️ Setup & Run

**Clone repo**
git clone https://github.com/ram-bhagat-thakur/Dynamic-Public-Event-Registration-System.git

**Backend setup**
*cd event-registration-system/Backend*
npm install
npm run dev      # or nodemon index.js if configured

**Frontend setup**
cd ../
npm install
npm run dev      # Launches on Vite dev server


**Ensure your .env file includes:**

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_key
RESEND_API_KEY=your_email_address
ADMIN_REGISTRATION_KEY=A_SECRET_KEY_FOR_REGISTERING_ADMIN



---

## 📢 Acknowledgements
*Special thanks to SECT for the internship opportunity and guidance.*
### Built with ❤️ by Ram Bhagat Thakur.

---

## 🧑‍💻 Author

**Ram Bhagat Thakur**  
B.Tech CSE @ Sandip University  
GitHub: [@RamBhagatThakur](https://github.com/ram-bhagat-thakur)  
LinkedIn: [Ram Bhagat Thakur](https://www.linkedin.com/in/ram-bhagat-thakur)

---


