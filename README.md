# 🧑‍🤝‍🧑 Teams ToDo - Collaborative Task Management App

A full-stack project management and team collaboration tool, inspired by Jira.

Manage your team's tasks, assign members, view deadlines, and track project progress — all from an intuitive Kanban-style dashboard.

## 🔗 Live Demo

https://web-x-chi.vercel.app/

## ✨ Features

- Authentication
  - Signup & Login using email and password
- Team Management
  - Create teams, invite members via email
- Task Management
  - Create, update, and assign tasks within a team
  - Fields: Title, Description, Priority, Due Date, Assignee, Reporter, Labels
- Kanban Board
  - Visual board with drag-and-drop task status updates
- Filters
  - Filter tasks by status, deadline, assignee, reporter
- Responsive UI
  - Optimized for both desktop and mobile

## ⚙️ Tech Stack

### Frontend

- React.js
- Redux Toolkit
- React Router
- Tailwind CSS
- Zod (Form validation)
- React Hook Form
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- CORS, dotenv

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- MongoDB URI (local or Atlas)

### Setup Instructions

1. Clone the repo

   git clone https://github.com/ChandrashuKumar/webX.git
   cd teams-todo

2. Setup backend

   cd server
   npm install
   cp .env.example .env  # Fill in your MONGO_URI and JWT_SECRET
   npm start

3. Setup frontend

   cd client
   npm install
   cp .env.example .env  # Add VITE_API_BASE_URL
   npm run dev

### Example .env for Backend

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/teams-todo  
JWT_SECRET=your_jwt_secret_key  
PORT=5000  

### Example .env for Frontend

VITE_API_BASE_URL=http://localhost:5000/api

## 📁 Folder Structure

client/
  └── src/
      ├── features/
      │   ├── auth/
      │   ├── teams/
      │   ├── tasks/
      ├── pages/
      ├── components/
server/
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/

## 🧠 Inspired By

- Jira (Atlassian)

## 📜 License

MIT
