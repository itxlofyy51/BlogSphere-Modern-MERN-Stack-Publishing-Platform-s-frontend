import axios from "axios";
import { Form } from "react-router";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/auth",
  withCredentials: true, // send cookies automatically
});

// ----------------- Auth API -----------------

export async function register({ name, email, password }) {
  try {
    const res = await api.post("/register", { name, email, password });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function logIn({ email, password }) {
  try {
    const res = await api.post("/login", { email, password });
    const accessToken = res.data.accessToken;

    // Immediately fetch user info
    const me = await getMe(accessToken);
    return { ...res.data, user: me.user, accessToken };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function logOut() {
  try {
    const res = await api.get("/logout", {});
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getMe(token) {
  if (!token) throw new Error("No access token provided");
  try {
    const res = await api.get("/get-me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function googleAuth({ token }) {
  try {
    const res = await api.post("/google", { token });
    const accessToken = res.data.accessToken;

    // Immediately fetch user info
    const me = await getMe(accessToken);
    return { ...res.data, user: me.user, accessToken };
  } catch (err) {
    console.error(err);
    alert("Google login failed. Check your internet or Client ID!");
    throw err;
  }
}

export async function verifyEmail({ email, otp }) {
  try {
    const res = await api.post("/verify-email", { email, otp });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function refreshAccessToken() {
  try {
    const res = await api.get("/refresh-token", { withCredentials: true });
    return res.data.accessToken;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateAvatar(file,token){
  const formData = new FormData();
  formData.append("avatar",file);
  try{
  const res = await api.put("/update-avatar",formData,{headers:{
    "Authorization":`Bearer ${token}`,
    "Content-Type":"multipart-form-data"}});
  return res.data
  }catch(err){
    console.error("Avatar API Error:", err.response?.data || err.message);
    throw err;
  }
}
