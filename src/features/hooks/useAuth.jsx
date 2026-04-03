import { useContext } from "react";
import { AuthContext } from "../auth/auth.context";
import { logIn,register,verifyEmail,logOut,googleAuth,updateAvatar, refreshAccessToken} from "../auth/services/auth.api";

export const useAuth = () => {
const context = useContext(AuthContext);
const {user,setuser,loading,setloading,token,settoken}=context;

const handleLogin=async({email,password})=>{
setloading(true);
try{
const data = await logIn({email,password});
if (data?.user) {
    //   setuser(data.user);
    setuser(data.user);
      settoken(data?.accessToken); // Sets Valerie/User in React memory
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log(data.user); // Sets it in Browser memory
    }
return data;
}finally{
setloading(false);
}
}

const handleRegister = async ({name, email, password}) => {
  setloading(true);
  try {
    const data = await register({name, email, password});
    // Don't setuser here — they're unverified until OTP is confirmed
    return data;
  } catch(err) {
    console.log(err);
    throw err; // re-throw so Register.jsx catch block can show the alert
  } finally {
    setloading(false);
  }
}

const handleLogout=async ()=>{
setloading(true);
try{
await logOut();
setuser(null);
}finally{
setloading(false);
}}

const handleVerifyEmail = async ({ email, otp }) => {
  setloading(true);
  try {
    const data = await verifyEmail({ email, otp });

    if (data?.user) {
      setuser(data.user);
      
      // ✅ Critical for ProtectedRoutes:
      if (data.accessToken) {
        settoken(data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      
      return data; // 👈 This makes 'success' true in OtpVerification.jsx
    }
  } catch (error) {
    // 🛡️ Catch the 401/404 error from the backend
    console.error("Verification error:", error.response?.data?.message || error.message);
    return null; // 👈 This makes 'success' false so the alert shows up
  } finally {
    setloading(false); // ⏳ Stops the "Verifying..." spinner
  }
};

const handleGoogle=async({token})=>{
setloading(true);
try{
const data = await googleAuth({token});
setuser(data?.user);
settoken(data?.accessToken);
localStorage.setItem("user", JSON.stringify(data?.user));
return data;
}finally{
setloading(false);
}}
const getValidToken = async () => {
  if (token) return token; // already in memory

  // Page was refreshed — token lost, but cookie still exists
  try {
    const newToken = await refreshAccessToken();
    settoken(newToken);
    
    return newToken
  } catch {
    return null;
  }
};

const changeAvatar = async (file) => {
  const validToken = await getValidToken();
  if (!validToken) {
    alert("Session expired, please log in again.");
    setuser(null);
    return;
  }
  const data = await updateAvatar(file, validToken);
  if (data?.user) {
    // ✅ Merge with existing user to preserve verified and other fields
    setuser(prev => ({ ...prev, ...data.user }));
    localStorage.setItem("user", JSON.stringify({ ...user, ...data.user }));
  }
};
// This runs every time 'user' actually updates
// const changeAvatar=async(file)=>{
// const data = await updateAvatar(file,token);
// if(data?.user){
//     setuser(data.user);
//     localStorage.setItem("user",JSON.stringify(data.user));
// }
// }
return {handleGoogle,handleLogin,handleLogout,setuser,user,loading,handleRegister,handleVerifyEmail,changeAvatar,getValidToken}
}