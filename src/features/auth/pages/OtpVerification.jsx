import React, { useEffect, useState } from 'react'
import Login from '../components/Login'
import Footer from '../components/Footer'
import { useAuth } from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';

const OtpVerification = () => {
  const {handleVerifyEmail,loading}=useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [otp, setotp] = useState("");
  const submitHandler =async (e)=>{
  e.preventDefault();
  const success = await handleVerifyEmail({email,otp});
  if (success) {
    // 💡 Strategy: Go to Home only if we now have a user session
    navigate("/home"); 
  } else {
    alert("Invalid OTP, please try again.");
  }
  }
 useEffect(() => {
  if (!email) {
    navigate("/register"); // Send them back if there's no email to verify
  }
}, [email, navigate]);
  return (
    <>
    <Login/>
    <div className='h-[84vh] bg-[#F5EFE6] flex items-center justify-center'>
    <form onSubmit={submitHandler}
  className="rounded-3xl bg-[#EADBC8] w-[90vw] sm:w-[26vw] flex flex-col items-center p-6 py-9 shadow-[0_15px_40px_-10px_rgba(212,163,115,0.45)] 
      transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-[0_25px_50px_-8px_rgba(212,163,115,0.55)]" action="">
     <h1 className='text-center w-full font-bold itim-regular text-[1.4rem] pb-3'>OTP Verification Form</h1>
     <p className='text-sm text-gray-500 mb-4'>OTP sent to: {email}</p>
     <div className='w-full'>
      <label className='pl-1 itim-regular text-[1.1rem] pt-6 ' htmlFor="email">OTP CODE:</label>
      <input onChange={(e)=>{setotp(e.target.value)}} className='text-[#454545] bg-white pl-4 pr-4 w-75 sm:w-77 py-2 outline-none rounded-xl ' type="text"  id="otp" name="otp" placeholder='OTP' required />
      <button className='px-31 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg active:brightness-90 mt-4 py-1 rounded-md sm:px-31 bg-[#D4A373]'>{loading?"Verifyingg...":"Verify Email"}</button>
      </div>
    </form>
    </div>
    <Footer/>
    </>
  )
}

export default OtpVerification