# **Jindungo — Community‑Based Tourism App (React + Node + MongoDB)**  
### *A digital platform connecting tourists with Angolan communities through sustainable, community‑based tourism.*

---

## **📌 Overview**
The **Community‑Based Tourism App** is a full‑stack MERN platform that enables:

- Tourists to browse and book authentic community tours  
- Communities to receive bookings and payouts  
- Admins to manage tours, bookings, communities, and payouts  
- Guides & drivers to view assigned tours  

The system is built with:

- **Frontend:** React (Vite)  
- **Backend:** Node.js + Express  
- **Database:** MongoDB Atlas  
- **Hosting:** Render (backend) + Netlify (frontend)

---

## **📁 Project Structure**

```
community-tourism-app/
│── backend/
│   ├── server.js
│   ├── config/db.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

---

## **⚙️ Backend Setup (Node.js + Express)**

### **1. Install dependencies**
```bash
cd backend
npm install
```

### **2. Create `.env` file**
```
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
PORT=5000
```

### **3. Start backend**
```bash
npm start
```

Backend runs at:  
`http://localhost:5000`

---

## **🖥️ Frontend Setup (React + Vite)**

### **1. Install dependencies**
```bash
cd frontend
npm install
```

### **2. Create `.env` file**
```
VITE_API_URL=http://localhost:5000/api
```

### **3. Start frontend**
```bash
npm run dev
```

Frontend runs at:  
`http://localhost:5173`

---

## **🌍 MongoDB Setup (Atlas)**

1. Create a free cluster at **MongoDB Atlas**  
2. Create a database user  
3. Whitelist all IPs (`0.0.0.0/0`)  
4. Copy your connection string:

```
mongodb+srv://USER:PASSWORD@cluster.mongodb.net/tourism
```

5. Paste it into your backend `.env` as `MONGO_URI`

---

## **🚀 Deployment Guide**

### **Backend → Render**

1. Push your repo to GitHub  
2. Go to Render → **New Web Service**  
3. Select the repo  
4. Set root directory to: `backend`  
5. Build command:
```
npm install
```
6. Start command:
```
npm start
```
7. Add environment variables:

```

## **📡 API Structure**

### **Auth**
- POST `/auth/register`
- POST `/auth/login`
- GET `/auth/me`

### **Tours**
- GET `/tours`
- GET `/tours/:id`
- POST `/tours`
- PATCH `/tours/:id`
- DELETE `/tours/:id`

### **Bookings**
- POST `/bookings`
- GET `/bookings`
- GET `/bookings/:id`
- PATCH `/bookings/:id`

### **Communities**
- GET `/communities`
- POST `/communities`
- PATCH `/communities/:id`

### **Payments & Payouts**
- POST `/payments`
- POST `/payouts`

---

## **🧩 Tech Stack**

| Layer | Technology |
|------|------------|
| Frontend | React (Vite), Axios, Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth | JWT |
| Deployment | Render + Netlify |

---

## **🧪 Development Workflow**

### **Start backend**
```bash
cd backend
npm start
```

### **Start frontend**
```bash
cd frontend
npm run dev
```

### **Run both with two terminals**

---

## **📜 License**
MIT License (or your preferred license)

---

## **🤝 Contributing**
Pull requests are welcome.  
For major changes, open an issue first to discuss what you’d like to change.

---

## **📞 Contact**
Project Owner: **Laurindo Muginga**  
Purpose: **Community‑Based Tourism Platform for Angola**
