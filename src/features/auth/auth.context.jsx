import { createContext, useRef, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider =({children})=>{
    
    const [user, setuser] = useState(()=>{
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser):null;
    });
    const [token, settoken] = useState(null);
    const [loading, setloading] = useState(false);
    const tokenRef = useRef(null);
    const updateToken = (newToken) => {
  tokenRef.current = newToken;
  settoken(newToken);
};

    return (
        <AuthContext.Provider value={{user,setuser,loading,setloading,token,settoken,updateToken}}>
            {children}
        </AuthContext.Provider>
)}