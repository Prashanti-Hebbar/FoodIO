import { createContext, useContext, useState } from "react";

const UserContext = createContext({
  userData: null,
  setUserData: () => {},
  avatarUrl: "login_User_Icon.jpg",
  setAvatarUrl: () => {},
});

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("login_User_Icon.jpg");

  return (
    <UserContext.Provider value={{ userData, setUserData, avatarUrl, setAvatarUrl }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUserContext };
