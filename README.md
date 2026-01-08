# 📇 Contact Management System (MERN)

A full-stack contact management application built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. This project has been migrated from a local Docker environment to MongoDB Atlas for cloud data storage.

## 🚀 Features

* **Full CRUD**: Create, Read, Update, and Delete contacts.
* **Cloud Database**: Hosted on MongoDB Atlas.
* **Responsive UI**: Built with React and Tailwind CSS.
* **Environment Security**: Secure handling of API keys and database credentials.

## 🛠️ Tech Stack

* **Frontend**: React (Create React App), Axios, Tailwind CSS.
* **Backend**: Node.js, Express.js.
* **Database**: MongoDB Atlas (Cloud).
* **Deployment**: Render (Backend), Vercel (Frontend).

## 📁 Project Structure

```
/
├── backend/
│   ├── models/        # Mongoose Schemas
│   ├── .env           # DB URI & Port (Ignored by Git)
│   └── server.js      # Entry point
├── frontend/
│   ├── src/           # React components & Logic
│   ├── .env           # API URL (Ignored by Git)
│   ├── tailwind.config.js
│   └── public/
└── README.md
```

## ⚙️ Local Setup

### 1. Prerequisites

* Node.js installed.
* A MongoDB Atlas account and cluster.

### 2. Backend Setup

1. Navigate to the `/backend` folder.
2. Create a `.env` file and add:

```
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
```

3. Install dependencies and start:

```bash
npm install
npm start
```

### 3. Frontend Setup

1. Navigate to the `/frontend` folder.
2. Create a `.env` file and add:

```
REACT_APP_API_URL=http://localhost:5000/api/contacts
```

3. Install dependencies and start:

```bash
npm install
npm start
```

## 🌐 Deployment Instructions

### Database (Atlas)

* Whitelist IP `0.0.0.0/0` in Network Access to allow cloud hosting providers to connect.

### Backend (Render)

* Set Root Directory to `backend`.
* Add `MONGODB_URI` to Environment Variables.

### Frontend (Vercel)

* Set Root Directory to `frontend`.
* Add `REACT_APP_API_URL` (pointing to your Render URL) to Environment Variables.