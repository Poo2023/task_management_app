# **Task Management Application**

A **Task Management App** built with **React + TypeScript (Frontend), Node.js (Backend), and PostgreSQL (Database)**.  

Users can **register, log in, and manage tasks** with features like **adding, editing, completing, and deleting tasks**.

---

## **Features**
**User Authentication:** Secure **JWT-based login and registration**.  
**Task Management:** Create, update, mark as completed, and delete tasks.  
**Persistent Storage:** Tasks are stored in a **PostgreSQL database**.  
**Task Organization: Tasks are separated into "To-Do" and "Completed" sections.** 
**Protected Routes:** Only **authenticated users** can manage tasks.**

---

## **Technologies Used**
### **Frontend (React + TypeScript)**
- **React** + **TypeScript** for component-based UI.
- **Axios** for API calls.
- **React Router** for navigation.
- **CSS** for styling.

### **Backend (Node.js + Express)**
- **Node.js + Express.js** for API handling.
- **PostgreSQL** as a database.
- **bcryptjs** for password hashing.
- **jsonwebtoken (JWT)** for authentication.
- **dotenv** for environment variables.

---

## **Setup Instructions**
### **Prerequisites**
Install **Node.js** & **npm**  
Install **PostgreSQL**  

---

## **Backend Setup**
### **1. Clone the Repository**
```bash
git clone https://github.com/Poo2023/task-management-app.git
cd task-management-app
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**
Create a **`.env`** file and add the following:
```env
PORT=5000
DATABASE_URL=postgresql://admin:password@localhost:5432/taskdb
JWT_SECRET=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0dXNlciIsImlhdCI6MTczOTkyMzE5MiwiZXhwIjoxNzM5OTI2NzkyfQ.ARAFf3nu7MsJvaRHmGkTX6eOew7-F2_OAyoSZhiI378
```
**Modify `DATABASE_URL` based on your PostgreSQL setup.**

### **4. Start the Backend Server**
```bash
npm run dev
```
The backend will run at **`http://localhost:5000`**.

---

## **Frontend Setup**
### **1. Navigate to the Frontend Directory**
```bash
cd ../frontend
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**
Create a **`.env`** file inside the `frontend/` folder and add:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### **4. Start the Frontend Server**
```bash
npm run dev
```
The frontend will be available at **`http://localhost:3000`**.

---

## **Testing Instructions**
1. **Register a new user** via the **Signup** page.
2. **Log in** and store the **JWT token**.
3. **Add new tasks** via the task input form.
4. **Mark tasks as completed** → They should be moved to the Completed tasks section.
5. **Edit a task** → Title and description should update without resetting completion status.
6. **Delete a task** → Task should be removed from UI and database.
7. **Check API Requests** using **Postman** or **Browser DevTools**.

---

## **Salary Expectations**
  **Expected Monthly Salary:** **$4000 - Negotiable**  

---


