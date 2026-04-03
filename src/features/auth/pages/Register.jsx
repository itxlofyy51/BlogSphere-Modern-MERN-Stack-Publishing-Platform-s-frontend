import React, { useState } from 'react'
import Login from '../components/Login'
import Footer from '../components/Footer'
import { GoogleLogin } from '@react-oauth/google';
import {Link, useNavigate} from "react-router-dom"
import { useAuth } from '../../hooks/useAuth';

const Register = () => {
const navigate = useNavigate();
const {handleRegister,handleGoogle,loading}= useAuth();

const [email, setemail] = useState(null);
const [password, setpassword] = useState(null);
const [name, setname] = useState(null);
if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5EFE6]">
        <div className="relative flex h-20 w-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-20 w-20 bg-orange-500 items-center justify-center text-white font-bold">
            CRM
          </span>
        </div>
        <p className="mt-4 text-[#4F4A45] font-medium animate-pulse">
          Checking your session...
        </p>
      </div>
    );
}
const submitHandler=async(e)=>{
e.preventDefault();
console.log("Button Clicked!"); // <--- Check for this!
  console.log("Data:", { name, email, password });
try{
const data =await handleRegister({name,email,password});
console.log(data);
navigate("/verify-email",{state:{email}});
}catch(err){
  alert("Check your credentials");
  throw err;
}}
const googleSuccess = async (response)=>{
  try{
 await handleGoogle({token:response.credential});
 navigate("/home");
  }catch(err){
  alert("Google Registration Failed");
  throw err;
}}
  return (
    <>
    <Login/>
    <div className='h-[93vh] min-h-screen pb-20 bg-[#F5EFE6] flex items-center justify-center'>
    <form onSubmit={submitHandler}
  className="rounded-3xl bg-[#EADBC8] w-[65vw] sm:w-[45vw] lg:w-[32vw] flex flex-col items-center
             p-6 py-5 shadow-[0_15px_40px_-10px_rgba(212,163,115,0.45)] 
             transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-[0_25px_50px_-8px_rgba(212,163,115,0.55)]" action="">
     <h1 className='text-center w-full font-bold itim-regular text-[1.4rem] pb-3'>Register Form</h1>
     <div className='flex w-full flex-col gap-0'>
      <label className='pl-1 itim-regular text-[1.1rem] ' htmlFor="name">Name:</label>
      <input onChange={(e)=>setname(e.target.value)} className='text-[#454545] bg-white pl-4 pr-4 w-full py-2 outline-none rounded-xl ' type="text" id="name" name="name" placeholder='Enter name' required />
      <label className='pl-1 itim-regular text-[1.1rem] pt-6 ' htmlFor="email">Email:</label>
      <input onChange={(e)=>setemail(e.target.value)} className='text-[#454545] bg-white pl-4 pr-4 w-full py-2 outline-none rounded-xl ' type="text" id="email" name="email" placeholder='Enter Email' required />
      <label className='pl-1 itim-regular text-[1.1rem] pt-6' htmlFor="password">Password:</label>
      <input onChange={(e)=>setpassword(e.target.value)} className='text-[#454545] bg-white pl-4 pr-4 w-full py-2 outline-none rounded-xl ' type="text" id="password" name="password" placeholder='Enter password' required />
      </div>
      <button className='w-full transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg active:brightness-90 mt-4 py-1 rounded-md  bg-[#D4A373]'>Register</button>
      <p className='pt-2 text-center'>Already have an account? <Link to="/login" className='underline' >Log in</Link><br/>OR</p>
      <div className='mt-1 flex w-1/2 flex-col justify-center '><GoogleLogin className="mt-4 "
    onSuccess={googleSuccess}
    onError={() => {alert('Registration Failed')}}/>
    <p className='pt-2 text-center text-[0.5]'>Verify-email <Link to="/verify-email" className='underline' >verify-email</Link></p></div>
    </form>
    </div>
    <Footer/>
    </>

  )
}

export default Register