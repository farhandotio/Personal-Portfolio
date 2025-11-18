🌐 Farhan Sadik

Farhan Sadik is a modern Full-Stack Digital Agency Platform built for managing your freelance web development work like a professional SaaS.

Clients can explore services, can see our projects, place project orders, communicate via real-time chat, track progress, and manage their profiles — while you (Farhan) control everything through an admin dashboard.

🪄 Overview

This application represents your personal digital agency — where you can:

Offer Frontend, Backend, and Full-Stack Development Services

Display past projects and portfolios

Handle orders, chats, payments, and project tracking

Manage client communications from one dashboard

🧱 Tech Stack
🖥️ Frontend

React.js (Vite) – Fast and modular frontend

React Router DOM – Page navigation

Redux Toolkit – State management

Axios – API requests

Framer Motion – Smooth animations

Tailwind CSS – Utility-first modern styling

React Toastify – Notifications

Socket.io-client – Real-time chat

⚙️ Backend

Node.js + Express.js

MongoDB (Mongoose ORM)

Socket.io – Real-time communication

JWT Authentication (httpOnly cookies)

Multer – File uploads

Bcrypt – Password hashing

Nodemailer – Email verification & OTP

Manual Payment Integration – Admin generates link → client pays → order updated

☁️ Cloud & Deployment
Platform Usage
Vercel Frontend
Render Backend
MongoDB Atlas Database
Manual Payment Payoneer
📂 Project Structure
Farhan-Agency/
│
├── frontend/
│ ├── public/
│ │ └── assets/
│ ├── src/
│ │ ├── app/
│ │ │ ├── store.js
│ │ │ ├── api.js
│ │ │ ├── socket.js
│ │ │ ├── hooks/
│ │ │ │ ├── useAuth.js
│ │ │ │ ├── useOrders.js
│ │ │ │ ├── useChat.js
│ │ │ ├── slices/
│ │ │ │ ├── authSlice.js
│ │ │ │ ├── orderSlice.js
│ │ │ │ ├── projectSlice.js
│ │ │ │ ├── chatSlice.js
│ │ │ │ ├── uiSlice.js
│ │ │ │ └── adminSlice.js
│ │ ├── components/
│ │ │ ├── common/
│ │ │ │ ├── Navbar.jsx
│ │ │ │ ├── Footer.jsx
│ │ │ │ ├── Loader.jsx
│ │ │ │ ├── Toast.jsx
│ │ │ │ └── ProtectedRoute.jsx
│ │ │ ├── home/
│ │ │ │ ├── HeroSection.jsx
│ │ │ │ ├── ServiceSection.jsx
│ │ │ │ ├── ProjectShowcase.jsx
│ │ │ │ └── Testimonials.jsx
│ │ │ ├── services/
│ │ │ │ ├── ServiceCard.jsx
│ │ │ │ └── ServiceFilter.jsx
│ │ │ ├── projects/
│ │ │ │ ├── ProjectCard.jsx
│ │ │ │ ├── ProjectModal.jsx
│ │ │ │ └── AddProjectForm.jsx
│ │ │ ├── chat/
│ │ │ │ ├── ChatBox.jsx
│ │ │ │ ├── ChatSidebar.jsx
│ │ │ │ └── ChatMessage.jsx
│ │ │ ├── auth/
│ │ │ │ ├── LoginPopup.jsx
│ │ │ │ ├── RegisterPopup.jsx

<!-- │ │ │ │ ├── OTPVerification.jsx  -->

│ │ ├── pages/
│ │ │ ├── dashboard/
│ │ │ │ ├── client/
│ │ │ │ │ ├── DashboardHome.jsx
│ │ │ │ │ ├── Orders.jsx
│ │ │ │ │ ├── OrderDetails.jsx
│ │ │ │ │ └── AccountSettings.jsx
│ │ │ │ ├── admin/
│ │ │ │ │ ├── DashboardHome.jsx
│ │ │ │ │ ├── Clients.jsx
│ │ │ │ │ ├── ClientDetails.jsx
│ │ │ │ │ ├── Orders.jsx
│ │ │ │ │ ├── OrdersDetails.jsx
│ │ │ │ │ ├── Projects.jsx
│ │ │ │ │ ├── ProjectDetails.jsx
│ │ │ │ │ └── CreateProject.jsx
│ │ │ ├── Home.jsx
│ │ │ ├── About.jsx
│ │ │ ├── Services.jsx
│ │ │ ├── Projects.jsx
│ │ │ ├── Order.jsx
│ │ │ ├── Contact.jsx
│ │ │ └── NotFound.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│
├── backend/
│ ├── src/
│ │ ├── config/
│ │ │ ├── config.js
│ │ ├── db/
│ │ │ ├── db.js
│ │ ├── middleware/
│ │ │ ├── auth.middleware.js
│ │ │ ├── validate.middleware.js
│ │ ├── models/
│ │ │ ├── user
│ │ │ ├── project
│ │ │ ├── service
│ │ │ ├── order
│ │ ├── controllers/
│ │ │ ├── auth.controller.js
│ │ │ ├── admin.controller.js
│ │ │ ├── project.controller.js
│ │ │ ├── service.controller.js
│ │ │ ├── order.controller.js
│ │ ├── routes/
│ │ │ ├── auth.route.js
│ │ │ ├── admin.route.js
│ │ │ ├── project.route.js
│ │ │ ├── service.route.js
│ │ │ ├── order.route.js
│ │ ├── utils/
│ │ │ ├── email.js
│ │ ├── services/
│ │ │ ├── gemini.service.js
│ │ │ ├── socketio.service.js
│ │ ├── app.js
│ │ └── server.js
│
├── .env
├── .gitignore
└── README.md

🔐 Authentication Flow
🧾 Register

User submits name, email, password → OTP email sent

Verify OTP → user created in DB

JWT token set in httpOnly cookie

Welcome email sent

🔑 Login

Verify credentials

Issue JWT token (httpOnly cookie)

🛡️ Protected Routes

Accessible only with valid token (profile, order, chat, dashboard)

💬 Real-Time Chat Flow

Socket.io enables instant messaging between client ↔ admin

Each conversation stored in Message collection:

{
"senderId": "...",
"receiverId": "...",
"message": "Hello!",
"createdAt": "2025-10-28T12:00:00Z"
}

💰 Payment Flow (Manual / Client Request)

Client requests payment for an order

Admin generates Payment Request Link (Payoneer / Stripe)

Link shared to client via dashboard or order page

Client clicks Pay Now → completes payment

Order updated with:

amount

currency

payment status

Project starts after 50% advance

Final 50% collected after project completion

Important: Only admin can generate payment links. No other payment gateway option is available.

🧠 API Endpoints
Auth (/api/auth)
Method Endpoint Description

<!-- POST	/register	Register user + OTP verify
POST	/verify-email	Verify OTP -->

POST /login Login user
GET /profile Get user info

Services (/api/services)
Method Endpoint Description
POST /create Create new order
PUT /update/:id Update services
DELETE /cancel/:id Cancel order

Orders (/api/orders)
Method Endpoint Description
POST /create Create new order
GET /user/:id Get user orders
PUT /update/:id Update order status
DELETE /cancel/:id Cancel order

Projects (/api/projects)
Method Endpoint Description
GET / Get all projects
GET /category/:type Get projects by category
POST /add Add project (admin)
PUT /edit/:id Edit project
DELETE /delete/:id Delete project

Messages (/api/messages)
Method Endpoint Description
GET /chat/:userId Get user messages
POST /send Send message
WS socket.io Real-time updates

Admin (/api/admin)
Method Endpoint Description
GET /dashboard Stats overview
GET /projects Manage projects
GET /clients View all clients
GET /payments View all payments

Payment (/api/payments)
Method Endpoint Description
POST /manual-link Admin posts payment link to order
GET /order/:id Get payment info for an order

⚙️ Environment Variables (.env)
PORT=5000
MONGO_URI=your_mongodb_atlas_link
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:5173
STRIPE_SECRET_KEY=your_stripe_key

🚀 Run Locally
Frontend
cd frontend
npm install
npm run dev

Backend
cd backend
npm install
npm run server

🚢 Deployment
Platform Usage
Vercel Frontend
Render Backend
MongoDB Atlas Database
Stripe / Payoneer Payments (Manual link)
🧠 Future Enhancements

✅ AI Chat Assistant (Gemini / OpenAI)

✅ Auto Project Quotation Generator

✅ Admin Analytics Dashboard

✅ CMS for dynamic services

✅ Real-time notifications

✅ Multi-currency payment support

👨‍💻 Author

MD Farhan Sadik
Frontend & Full-Stack Web Developer
🌍 Portfolio
📧 farhansadik@example.com

✅ Notes:

Payment integration is manual: client requests → admin generates → client pays → order updated.

Only one payment per order is allowed. No alternative gateways/options.
