# Foodio - Recipe Sharing Platform

# 🍽️ Overview

Foodio is a full-stack MERN (MongoDB, Express.js, React, Node.js) application that allows users to create, edit, delete, and share their favorite recipes. Users can also mark recipes as favorites, save them for later, and explore new dishes shared by others.

# 🚀 Features

📝 Add New Recipes - Users can create and share their own recipes.

🔄 Edit Recipes - Modify existing recipes anytime.

❌ Delete Recipes - Remove recipes if they are no longer needed.

👀 View Recipes - Browse and discover new recipes shared by others.

❤️ Favorite Recipes - Mark recipes as favorites for easy access.

📌 Save Recipes - Save recipes to check later.

🔗 Share Recipes - Share recipes via social media or direct links.

🔍 Search Recipes - Find recipes quickly using keywords.

# 🛠️ Tech Stack

Frontend: React, React Router, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Authentication: JSON Web Tokens (JWT), bcrypt.js

API Requests: Axios

🎯 Installation & Setup

# Clone the repository:

git clone https://github.com/your-username/foodio.git
cd foodio

Install dependencies:

# Backend dependencies
cd server

npm install

# Frontend dependencies
cd ../client

npm install

Set up environment variables:
Create a .env file in the server directory and add:

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

PORT=5000

Run the development servers:
# Start backend server
cd server

npm run dev

# Start frontend server
cd ../client

npm start

# 📂 Project Structure

foodio/

│-- client/      # React frontend

│-- server/      # Express backend

│-- models/      # Mongoose models

│-- routes/      # API routes

│-- controllers/ # Business logic

│-- config/      # Configuration files

│-- public/      # Static assets

│-- .env         # Environment variables

│-- README.md    # Project documentation

