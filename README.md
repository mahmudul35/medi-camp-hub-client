# 🏥 MediCamp Hub - Revolutionizing Community Healthcare

**MediCamp Hub** is a **comprehensive medical camp management platform** that enables organizers to efficiently handle participant registrations, payments, and feedback while gaining valuable insights through analytics.

---

## 🌐 Live Site  

🔗 **Visit here**: [MediCamp Hub Live](https://medicamphub-c53a6.firebaseapp.com/)

---

## 👤 Organizer Login Credentials  

- **Username:** `admin@gmail.com`  
- **Password:** `abcdef35@`

---

## 📌 Features of MediCamp Hub  

### 🏥 Dynamic Camp Management  
- Organizers can **create, edit, and delete** camps effortlessly.  

### 📝 Participant Registration  
- Secure and **simple registration process** for participants.  

### 💳 Stripe Payment Integration  
- **Secure payments** for camp fees with **transaction history**.  

### ⭐ Feedback & Ratings Section  
- Collect **participant feedback** and display it professionally.  

### 📸 Success Stories & Banner Slider  
- Showcasing **impactful moments** from past medical camps.  

### 📊 Analytics Dashboard  
- **Visualize participant data** and camp statistics using **interactive charts**.  

### 🔍 Sorting & Search Functionality  
- Find camps easily based on **keywords, dates, or popularity**.  

### 🔒 Role-Based Access Control  
- **Separate dashboards** for organizers and participants with specific functionalities.  

### 📱 Responsive & Modern Design  
- **Optimized for all devices** using **Tailwind CSS** for a professional look.  

### 📁 Pagination for Tables  
- **Paginated views** for better clarity when managing large datasets.  

### ❌ Cancellation & Refund Management  
- Participants can **cancel registrations before payments**.  

### 🔔 Real-Time Notifications  
- **Toast notifications** for actions like registration, payment, and feedback.  

---

## 🛠 Tech Stack  

### 🌐 Frontend  
- **React.js**  
- **Tailwind CSS**  
- **React Router**  
- **Firebase Authentication**  

### 🛠 Backend  
- **Node.js**  
- **Express.js**  
- **MongoDB**  
- **Mongoose**  
- **Stripe Payment API**  
- **JWT Authentication**  

---

## 🛋️ Dependencies  

```json
"dependencies": {
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "firebase": "^9.6.1",
  "jsonwebtoken": "^9.0.0",
  "bcryptjs": "^2.4.3",
  "stripe": "^12.3.0"
}
```

---

## 🚀 Installation & Setup  

### 🏢 1️⃣ Clone the Repository  
```sh
git clone https://github.com/yourusername/medicamp-hub.git
cd medicamp-hub
```

---

### 🖥️ 2️⃣ Frontend Setup (React.js)  

```sh
cd client
npm install
npm start
```

👉 This will start the frontend at `http://localhost:3000/`  

---

### 🛠 3️⃣ Backend Setup (Node.js & Express.js)  

```sh
cd server
npm install
```

👉 **Create a `.env` file** in the **server** folder and add:  

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
FIREBASE_API_KEY=your_firebase_api_key
```

Now, start the backend:  

```sh
npm run dev
```

👉 This will start the **backend server** at `http://localhost:5000/`  

---






