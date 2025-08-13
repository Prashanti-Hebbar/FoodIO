import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext({
  userData: null,
  setUserData: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (token && username && email) {
      setUserData({ username, email, token });
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, isLoggedIn, setIsLoggedIn }}
    >
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

// import { createContext,useContext,useState } from "react";

// const UserContext = createContext(
//     {
//         userData: null,
//         setUserData: () => {}
//     });

// const UserProvider = ({children})=>
//     {
//         const [userData, setUserData] = useState(null);

//         return (
//             <UserContext.Provider value={{ userData, setUserData }}>
//                 {children}
//             </UserContext.Provider>
//         );
//     };

// const useUserContext = () => {
//     const context = useContext(UserContext);
//     if (!context) {
//         throw new Error("useUserContext must be used within a UserProvider");
//     }
//     return context;
// }
// export { UserProvider, useUserContext };
