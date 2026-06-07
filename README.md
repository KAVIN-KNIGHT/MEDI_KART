# 🏥 MediKart

### Full-Stack Medical E-Commerce Platform (MERN Stack)

MediKart is a full-stack medical e-commerce marketplace built using the MERN stack. It provides a complete solution for buying medical products and accessing healthcare services online.

The project consists of:

- **Backend:** Node.js + Express REST API
- **Frontend:** Vite + React Single Page Application
- **Database:** MongoDB with Mongoose
- **Admin Panel:** Product, user, and order management

---

## 🚀 Features

### 🔹 Backend API
- User authentication and authorization
- Product management
- Order processing
- Admin operations
- Secure JWT-based authentication

### 🔹 Frontend Application
- Medical product marketplace
- Shopping cart functionality
- Checkout process
- User profile management
- Responsive UI
- Admin dashboard

### 🔹 Database
MongoDB collections/models for:

- Users
- Products
- Orders

### 🔹 Utilities
- Product seeding script
- Admin role update script

---

## 🛠 Tech Stack

| Category | Technology |
|-----------|------------|
| Frontend | React, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT |
| Package Manager | npm |

---

## 📂 Repository Structure

```text
MediKart/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   │   ├── seedProducts.js
│   │   └── updateAdminRole.js
│   └── server.js
│
├── diabol/
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   └── package.json
│
├── package.json
└── README.md
```

---

# ⚙️ Backend Setup

## 1️⃣ Create Environment Variables

Create a `.env` file inside the `backend` folder.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
CLIENT_URL=http://localhost:5173
```

---

## 2️⃣ Install Dependencies

```bash
cd backend
npm install
```

---

## 3️⃣ Start Development Server

```bash
npm run dev
```

or

```bash
node server.js
```

---

## 4️⃣ Seed Demo Products (Optional)

```bash
node scripts/seedProducts.js
```

---

## 5️⃣ Update Admin Role (Optional)

```bash
node scripts/updateAdminRole.js --email=admin@example.com
```

---

# 🎨 Frontend Setup

## 1️⃣ Navigate to Frontend

```bash
cd diabol
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Start Development Server

```bash
npm run dev
```

Open the URL shown in the terminal.

---

## 4️⃣ Production Build

Build the application:

```bash
npm run build
```

Preview locally:

```bash
npm run preview
```

---

# 🔐 Environment Variables

## Backend

```env
MONGO_URI=
JWT_SECRET=
PORT=
CLIENT_URL=
```

## Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 📜 Available Commands

## Backend

```bash
npm install
npm run dev
node server.js
node scripts/seedProducts.js
node scripts/updateAdminRole.js
```

## Frontend

```bash
npm install
npm run dev
npm run build
npm run preview
```

---

# 🚀 Deployment

### Frontend

```bash
cd diabol
npm run build
```

Deploy the generated `dist` folder using:

- Vercel
- Netlify
- AWS S3
- Any static hosting provider

---

### Backend

Deploy the Express API using:

- Render
- Railway
- VPS
- Docker
- PM2

Ensure production environment variables are configured:

```env
MONGO_URI=
JWT_SECRET=
CLIENT_URL=
```

---

# 🧪 Testing & Linting

Run available tests and linting tools if configured:

```bash
npm test
npm run lint
```

---

# 🤝 Contributing

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to GitHub

```bash
git push origin feature-name
```

5. Open a Pull Request

---


## 👨‍💻 Author

**R. Kavin**

Final-Year Student | Full-Stack Developer | AI Enthusiast

⭐ If you found this project useful, consider giving it a star on GitHub!
