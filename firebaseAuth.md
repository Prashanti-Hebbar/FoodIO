# Firebase Authentication Integration 🔐


## I haven't touched your code , where i had made the changes i just have commented out your code
## all the logics have comments for  understanding 


## 🔧 What Was Implemented
- Added **Firebase Google Sign-In** to the frontend.
- Created backend route `POST /auth/firebaseAuth` to handle Firebase user authentication.
- If user is new, they are added to MongoDB. If user exists, they are logged in.
- Backend issues a **JWT token stored in HTTP-only cookies**.(`validity 7 days`)
- Added support for **multiple auth providers** (`firebase`, `local`, or `both`).
- added logout funtionality (`removes the cookie or jwt token`)
- dynamic loading of pfp and username based on the user data in the database (`also added fallback if data not present`);
---

## 🔧 What could be improved or not working(edge cases)


- log out not showing on the home page and profile after loggin in or registering due to anchar tag ,causing reloading
 
-  /register and /login route could be improved 

- you are using anchor tag in the navbar please dont do that that is causing reloading of the page when route changes


- in login please instead of username ask for the email as , firebase username and their entered username could be differnt whihc will result in data duplicacy  
----
- 
### 🗂️ Folder Changes

### 📁 Backend
- `/config/db.js` – centralized MongoDB connection. (NEWLY ADDED)

- `/config/firebaseAdmin.js` – Firebase Admin SDK setup. (NEWLY ADDED)

- `/secret/serviceAccountKey.json `– Firebase admin credentials.   (NEWLY ADDED)

- `/models/user` added uid(from firebase), password (required -false),profilePicture-url from firebase (NEWLY ADDED AND CHANGES)

### 📁 Frontend
- `/services/firebase.js` – Firebase client setup (auth + config). (NEWLY ADDED)

- `/src/pages/register.jsx` - added google sign in button + handle google auth function (CHANGES)

- `/src/pages/login.jsx` - added google sign in button + handle google auth function (CHANGES)

- `/src/pages/profile.jsx` - added dynamic profile picture and username set using data stored in database (CHANGES)

- also in fronted validate the email , any random thing is getting accepted
---


### 🌍 ENV Variables
## Backend .env

FRONTEND_URL=http://localhost:3000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret

## Frontend .env

REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_FIREBASE_API=your_firebase_api_key

---

### Mongo db changes

1. created a seperate mongo connect folder 
- `/config/db.js` → centralized MongoDB connection

2. userModal changes -
{

  uid: String, // Firebase UID
  authProvider: String, // 'firebase', 'local', or 'both'
  profilePicture: String, // Firebase photoURL

}

### 🍪 Cookie Setup --
1. HTTP-only cookie set after successful login

2. Valid for 7 days (set in JWT expiration)

3. Works with frontend requests due to credentials: 'include' in fetch


### 🧠 Notes
1. Users signing in via Firebase are automatically created in the DB

2. Users with previous email+password will still work

3. Supports future extensions like logout, JWT refresh, and role-based access


### ✅ SETUP REQUIRED FOR PROPER FUNTIONING --  (IMPORTANT )

### 🚀 Setup Instructions
1. ## frontend setup
 Change the REACT_APP_BACKEND_URL in the .env file to your render backend url
2. ## MongoDB Setup

Add MONGO_URI in your backend .env (from MongoDB Atlas or local).

-----
3. ## Firebase Setup

 - In Firebase Console, create a new project.
 
 - Enable Google Sign-In from the Authentication section.
 
 - Get your Firebase API Key ➜ add to frontend .env as REACT_APP_FIREBASE_API=...
 
 - Generate and download your Firebase Admin SDK key ➜ save as /secret/serviceAccountKey.json in backend.
 
 - Start the App
 
 - Run the backend and frontend servers.
 
 - Try logging in using Google Sign-In.
 
 - You should be redirected and a secure cookie should be set.

----- 