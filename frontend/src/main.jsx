import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // for JS components like modal, dropdowns, etc.
import "bootstrap-icons/font/bootstrap-icons.css"; // for icons
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./App.jsx";
import { UserProvider } from "./context/userContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import RecipeContextProvider from "./context/RecipeContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <ThemeProvider>
      <UserProvider>
        <RecipeContextProvider>
          <App />
        </RecipeContextProvider>
      </UserProvider>
    </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
