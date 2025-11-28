# NCCP Backend

The NCCP backend is built using **Node.js, Express.js, and MongoDB**.  
It provides secure admin-only access to manage events, members, awards, form data, and customer details.

There is **no user signup** in this system.  
Only **Admin Login** is available, and the admin account is created through **seeder.js**.

---

## 🚀 Tech Stack

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Multer (File Uploads)  
- dotenv  

---

## 🔐 Authentication

- Only **Admin Login** is allowed  
- Signup is disabled  
- Admin credentials are inserted using:

```
node seeder.js
```

---

## 📂 Main Features

### 🏆 Admin Capabilities
The admin can perform the following actions:

#### **1. Create Events**
- Admin can create new events
- Add event details like title, description, year, etc.
- Upload photos for each event

#### **2. Manage Members**
Admin can create different types of members:

- **Honorary Members**
- **Ordinary Members**
- **Other Members**

Each member includes basic details such as name, role, position, and other related information.

#### **3. Upload Awards**
- Admin can upload award details  
- Can attach award images  
- Awards can be linked to members or events  

#### **4. Form & Customer Management**
- Save multi-step form data  
- Add and view customer information  

---

## 📁 Project Structure

```
nccp-backend/
│── controllers/
│── models/
│── routes/
│── middleware/
│── uploads/
│── config/
│── seeder.js
│── index.js
│── package.json
```

---

## 🔧 Environment Variables

Create a `.env` file:

```
PORT=
MONGO_URL=
JWT_SECRET=
```

⚠ Do NOT upload `.env` to GitHub.

---

## ▶️ Running the Backend

Install dependencies:

```
npm install
```

Start in development mode:

```
npm run dev
```

Start in production mode:

```
npm start
```

---

## ⭐ Summary

- Admin-only backend  
- No public/user signup  
- Admin login only  
- Admin can create events  
- Admin can create Honorary, Ordinary, and Other members  
- Admin can upload awards  
- Includes multi-step form and customer data APIs  
- Seeder used for admin account setup  

