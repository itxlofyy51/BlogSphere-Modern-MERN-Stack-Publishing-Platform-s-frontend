import React from 'react'
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const CreateBlogNav = () => {
const navigate = useNavigate();
const {handleLogout,setuser}=useAuth();
const LogoutUser=async()=>{
await handleLogout();
setuser(null);
localStorage.removeItem("user");
localStorage.clear();
navigate("/login");
}
  return (
    <div  className='bg-[#FAF7F2] overflow-hidden flex justify-between items-center p-6 pl-4 w-screen h-16'>
        <Link to="/home"><FaHome className='h-12 w-7 sm:w-8 sm:ml-5' /></Link>
         <div>
         <Link to="/create-blog"  className='font-semibold pr-2 itim-regular outline-none text-[0.9rem] sm:text-[1.1rem] '>Create Blog </Link>
         <a className='font-semibold pr-2 itim-regular outline-none text-[0.9rem] sm:text-[1rem]'>|</a>
         <button onClick={LogoutUser} className='font-semibold  itim-regular outline-none text-[0.9rem] sm:text-[1.1rem] sm:mr-5 bg-red-500 text-white px-4 py-1 rounded-md'> Log-out </button></div>
        </div>
  )
}

export default CreateBlogNav