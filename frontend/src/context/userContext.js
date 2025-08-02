import { createContext,useContext,useState } from "react";

const UserContext = createContext(
    {
        userData: null,
        setUserData: () => {}
    });


const UserProvider = ({children})=>
    {
        const [userData, setUserData] = useState(null);

        return (
            <UserContext.Provider value={{ userData, setUserData }}>
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
}
export { UserProvider, useUserContext };