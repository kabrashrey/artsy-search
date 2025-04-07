# 🎨 Artist Search Web App

## 📌 Project Overview
This web application allows users to search for artists, explore their artwork, discover similar artists, and browse artwork categories. Users can register, log in, and mark their favorite artists for quick access. Authentication is managed using JWT tokens, and encrypted user data is stored in a MongoDB database. The database consists of three collections: one for storing Artsy API tokens and expiry data, one for user information (name, email, password, ID), and one for user favorites.

## 🔍 Features
- Search for artists by name.
- View artist details and their artworks.
- Discover similar artists.
- Browse artwork categories.
- User authentication (Login/Register) with JWT tokens.
- Add/Remove artists from favorites.
- Timer for each favorited artist showing how long ago they were added.
- Global notifications for login, logout, and favorite actions.
- Uses Access Token to initiate auto logout after 1 hour.

## 🔧 Tech Stack
- **Frontend:** React.js (TypeScript)
- **Backend:** Node.js (Express.js, TypeScript)
- **Database:** MongoDB
- **API Data Source:** [Artsy API](https://www.artsy.net/)
- **State Management:** Redux
- **Styling:** SCSS, Bootstrap

## 🔗 API Integration
The project fetches artist data from **Artsy.com**, processes the responses, and renders them in the UI.

## 🚀 Setup & Installation
### 1️⃣ Clone the Repository:
```bash
git clone https://github.com/kabrashrey/artsy-shrey-3.git
cd artsy-shrey-3
```
### 2️⃣ Install Dependencies:
```bash
# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install
```
### 3️⃣ Configure Environment Variables:
Create a `.env` file in both the backend and frontend directories with the necessary API keys and configuration settings.

### 4️⃣ Run the Application:
```bash
# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm run dev
```

## 📜 Usage
1. Use the search bar to find an artist.
2. Click on an artist to view their details, artworks, similar artists, and categories.
3. Log in to mark an artist as a favorite.
4. Access your list of favorite artists anytime!

## 🛠 Deployment
The application can be deployed on **Google Cloud** using `gcloud app deploy` for production.

## 📝 License
This project is licensed under the MIT License.

🎨 Happy Searching!



Lighthouse Results for Desktop Navigation:
<img width="1512" alt="Artsy-Lighthouse-Desktop-Navigation" src="https://github.com/user-attachments/assets/a95185e0-6f71-4a84-9b3d-e6232dbdce53" />

Lighthouse Results for Mobile Navigation:
<img width="1508" alt="Artsy-Lighthouse-Mobile-Navigation" src="https://github.com/user-attachments/assets/464e25b1-2df0-41d2-a45b-0f1d72976d64" />



