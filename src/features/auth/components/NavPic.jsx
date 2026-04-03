import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const NavPic = () => {
  const navigate = useNavigate();
  const {handleLogout,setuser,user}=useAuth();
  const LogoutUser=async()=>{
  await handleLogout();
  setuser(null);
  localStorage.removeItem("user");
  localStorage.clear();
  navigate("/login");
  }
    return (
      <div  className='bg-[#FAF7F2] overflow-hidden flex justify-between items-center p-6 pl-4 w-screen h-16'>
          <Link to="/profile"><img className='h-12 w-12 rounded-full' src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}`} /></Link>
           <div>
           <Link to="/create-blog"  className='font-semibold pr-2 itim-regular outline-none text-[0.9rem] sm:text-[1.1rem] '>Create Blog </Link>
           <a className='font-semibold pr-2 itim-regular outline-none text-[0.9rem] sm:text-[1rem]'>|</a>
           <button onClick={LogoutUser} className='font-semibold  itim-regular outline-none text-[0.9rem] sm:text-[1.1rem] sm:mr-5 bg-red-500 text-white px-4 py-1 rounded-md'> Log-out </button></div>
          </div>
    )
  }


export default NavPic