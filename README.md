# 🎨 Artist Search Web App

## 📌 Project Overview
This project is a web application that allows users to search for artists, their artwork, and categories. Users can register, log in, and mark their favorite artists for quick access.

## 🔍 Features
- Search for artists by name.
- View artist details and their artworks
- View Similar Artists
- View Categories of artworks
- User authentication (Login/Register).
- Add/Remove artists from favorites.
- Timer for each favorited artist showing the time since it was added to favorites.

## 🔧 Tech Stack
- **Frontend:** React.js (TypeScript)
- **Backend:** Node.js (Express.js, TypeScript)
- **API Data Source:** [Artsy API](https://www.artsy.net/)
- **State Management:** Redux
- **Styling:** SCSS, Bootstrap

## 🔗 API Integration
The project fetches artist data from **Artsy.com** and processes the responses before rendering them in the UI.

## 🚀 Setup & Installation
### 1️⃣ Clone the Repository:
```bash
git clone https://github.com/kabrashrey/artsy-shrey-3.git
cd artsy-shrey-3
```
### 2️⃣ Install Dependencies:
```bash
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
```
### 3️⃣ Configure Environment Variables:
Create a `.env` file in both backend and frontend directories with necessary API keys and configuration.

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
1. Search for an artist using the search bar.
2. Click on an artist to view details, similar artists, artworks and categories of artworks.
3. Login to mark an artist as favorite.
4. View your favorite artists anytime!

## 🛠 Deployment
The app can be deployed using **Google Cloud** with `gcloud app deploy` for production.

## 📝 License
This project is licensed under the MIT License.

🎨 Happy Searching!
