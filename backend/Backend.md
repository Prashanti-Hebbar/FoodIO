# Backend API Documentation

## Overview
This is a Node.js/Express backend for a recipe management application that allows users to register, login, manage recipes, save favorites, and generate AI-powered recipe suggestions.

## Tech Stack
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing
- **AI Integration**: OpenRouter API for recipe generation
- **CORS**: Enabled for cross-origin requests

## Environment Variables Required
```
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
OPENROUTER_API_KEY=<your_openrouter_api_key>
```

## Database Models

### Recipe Model (`models/Recipe.js`)
Defines the structure for recipe documents in MongoDB.

**Schema Fields:**
- `title` (String, required): Recipe name
- `photo` (String, required): Image URL for recipe
- `description` (String, required): Recipe description
- `ingredients` (Array of Strings, required): List of ingredients
- `instructions` (String, required): Cooking instructions
- `prepTime` (Number, required): Preparation time in minutes
- `cookTime` (Number, required): Cooking time in minutes

### User Model (`models/Users.js`)
Defines the structure for user documents with authentication and saved recipes.

**Schema Fields:**
- `username` (String, required, unique): User's unique username
- `email` (String, required, unique): User's email address
- `password` (String, required): Hashed password
- `savedRecipes` (Array of ObjectIds): References to saved recipe documents

---

## API Endpoints

## Authentication Routes (`/auth`)

### 1. User Registration
**Endpoint**: `POST /auth/register`

**Purpose**: Creates a new user account with encrypted password

**Expected Input:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "mypassword123"
}
```

**Process:**
1. Checks if username already exists
2. Hashes password using bcrypt (salt rounds: 10)
3. Creates new user document
4. Saves to database

**Expected Output:**
```json
// Success
{
  "message": "User Registered Successfully!"
}

// User already exists
{
  "message": "User already exists"
}
```

**How it helps**: Enables new users to create accounts securely with password encryption.

---

### 2. User Login
**Endpoint**: `POST /auth/login`

**Purpose**: Authenticates user and provides JWT token for protected routes

**Expected Input:**
```json
{
  "username": "johndoe",
  "password": "mypassword123"
}
```

**Process:**
1. Finds user by username
2. Compares provided password with hashed password using bcrypt
3. Generates JWT token with user ID
4. Returns token and user ID

**Expected Output:**
```json
// Success
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userID": "60f7b3b3b3b3b3b3b3b3b3b3"
}

// User doesn't exist
{
  "message": "User doesn't exist"
}

// Invalid password
{
  "message": "Username or password is incorrect"
}
```

**How it helps**: Provides secure authentication and session management for protected features.

---

## Recipe Routes (`/recipes`)

### 1. Get All Recipes
**Endpoint**: `GET /recipes/`

**Purpose**: Retrieves all recipes from the database

**Expected Input**: None (GET request)

**Process:**
1. Queries all recipe documents from MongoDB
2. Returns complete recipe array

**Expected Output:**
```json
[
  {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "title": "Chocolate Chip Cookies",
    "photo": "https://example.com/cookie.jpg",
    "description": "Delicious homemade cookies",
    "ingredients": ["flour", "sugar", "chocolate chips"],
    "instructions": "Mix ingredients and bake...",
    "prepTime": 15,
    "cookTime": 25
  }
]
```

**How it helps**: Displays all available recipes to users for browsing and selection.

---

### 2. Create New Recipe
**Endpoint**: `POST /recipes/`

**Purpose**: Adds a new recipe to the database

**Expected Input:**
```json
{
  "title": "Banana Bread",
  "photo": "https://example.com/banana-bread.jpg",
  "description": "Moist and delicious banana bread",
  "ingredients": ["bananas", "flour", "sugar", "eggs"],
  "instructions": "Mash bananas, mix with dry ingredients...",
  "prepTime": 20,
  "cookTime": 60
}
```

**Process:**
1. Creates new Recipe document with provided data
2. Saves to MongoDB
3. Returns saved recipe document

**Expected Output:**
```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b4",
  "title": "Banana Bread",
  "photo": "https://example.com/banana-bread.jpg",
  "description": "Moist and delicious banana bread",
  "ingredients": ["bananas", "flour", "sugar", "eggs"],
  "instructions": "Mash bananas, mix with dry ingredients...",
  "prepTime": 20,
  "cookTime": 60
}
```

**How it helps**: Allows users to contribute new recipes to the platform.

---

### 3. Save Recipe to User Favorites
**Endpoint**: `PUT /recipes/`

**Purpose**: Adds a recipe to user's saved recipes list

**Expected Input:**
```json
{
  "recipeID": "60f7b3b3b3b3b3b3b3b3b3b3",
  "userID": "60f7b3b3b3b3b3b3b3b3b3b5"
}
```

**Process:**
1. Finds recipe by ID
2. Finds user by ID  
3. Adds recipe to user's savedRecipes array
4. Saves updated user document

**Expected Output:**
```json
{
  "savedRecipes": [
    "60f7b3b3b3b3b3b3b3b3b3b3",
    "60f7b3b3b3b3b3b3b3b3b3b4"
  ]
}
```

**How it helps**: Enables users to bookmark recipes for easy access later.

---

### 4. Get User's Saved Recipe IDs
**Endpoint**: `GET /recipes/savedRecipes/ids/:userId`

**Purpose**: Retrieves array of saved recipe IDs for a specific user

**Expected Input**: User ID as URL parameter
- Example: `/recipes/savedRecipes/ids/60f7b3b3b3b3b3b3b3b3b3b5`

**Process:**
1. Finds user by ID from URL parameters
2. Returns user's savedRecipes array

**Expected Output:**
```json
{
  "savedRecipes": [
    "60f7b3b3b3b3b3b3b3b3b3b3",
    "60f7b3b3b3b3b3b3b3b3b3b4"
  ]
}
```

**How it helps**: Quick way to check which recipes a user has saved (useful for UI state management).

---

### 5. Get User's Saved Recipes Details
**Endpoint**: `GET /recipes/savedRecipes`

**Purpose**: Retrieves complete recipe details for all user's saved recipes

**Expected Input**: User ID should be passed as parameter 
**Process:**
1. Finds user by ID
2. Queries all recipes where ID is in user's savedRecipes array
3. Returns complete recipe details

**Expected Output:**
```json
{
  "savedRecipes": [
    {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "title": "Chocolate Chip Cookies",
      "photo": "https://example.com/cookie.jpg",
      "description": "Delicious homemade cookies",
      "ingredients": ["flour", "sugar", "chocolate chips"],
      "instructions": "Mix ingredients and bake...",
      "prepTime": 15,
      "cookTime": 25
    }
  ]
}
```

**How it helps**: Displays user's favorite recipes with full details for easy viewing.

---

### 6. AI Recipe Generation
**Endpoint**: `POST /recipes/api/get-recipe`

**Purpose**: Generates custom recipes using AI based on user preferences

**Expected Input:**
```json
{
  "diet": "vegetarian",
  "cuisine": "Italian",
  "time": "30",
  "ingredients": "tomatoes, basil, mozzarella"
}
```

**Process:**
1. Creates AI prompt with user preferences
2. Sends request to OpenRouter API using Kimi-K2 model
3. Processes AI response
4. Returns generated recipe text

**Expected Output:**
```json
{
  "recipe": "# Caprese Salad\n\n## Ingredients:\n- 2 large tomatoes\n- 8 oz fresh mozzarella\n- 1/4 cup fresh basil leaves\n\n## Instructions:\n1. Slice tomatoes and mozzarella...\n\nPrep time: 15 minutes\nTotal time: 15 minutes"
}

// Error case
{
  "error": "Failed to generate recipe. Please try again later."
}
```

**How it helps**: Provides personalized recipe suggestions based on available ingredients and dietary preferences.

---

## Server Configuration (`server.js`)

**Port**: 3001
**Middleware**:
- CORS enabled for cross-origin requests
- Express JSON parser for request body parsing
- Routes mounted at `/auth` and `/recipes`

**Database**: MongoDB connection using Mongoose with connection string from environment variables

## Dependencies (`package.json`)

### Core Dependencies:
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

### Authentication:
- **jsonwebtoken**: JWT token generation/verification
- **bcrypt**: Password hashing
- **bcryptjs**: Alternative bcrypt implementation

### External APIs:
- **axios**: HTTP client for API requests

### Development:
- **nodemon**: Auto-restart server during development

### Additional:
- **react-cookie**: Cookie management
- **socket.io**: Real-time communication
- **socket.io-client**: Socket.io client

---

## Security Features

1. **Password Hashing**: Uses bcrypt with salt rounds for secure password storage
2. **JWT Authentication**: Stateless authentication using JSON Web Tokens
3. **Environment Variables**: Sensitive data stored in environment variables
4. **CORS**: Configured for cross-origin request handling

## Usage Flow

1. **User Registration/Login**: User creates account → receives JWT token
2. **Browse Recipes**: User views all available recipes
3. **Save Favorites**: User bookmarks interesting recipes
4. **View Saved**: User accesses their saved recipe collection  
5. **AI Generation**: User generates custom recipes based on preferences
6. **Add New**: User contributes new recipes to the platform


