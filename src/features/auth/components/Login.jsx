import React from 'react'
import { FaHome } from "react-icons/fa";
import {Link} from "react-router-dom"

const Login = () => {
  return (
    <div className='bg-[#FAF7F2] flex justify-between overflow-hidden items-center p-2 pl-4 w-screen h-15'>
     <Link to="/"><FaHome className='h-12 w-8 sm:w-9 sm:ml-5' /></Link>
     <div>
     <Link to="/register"  className='font-semibold underline pr-2 itim-regular outline-none text-[1.1rem] sm:text-xl'>Register  </Link>
     <Link to="/" className='font-semibold pr-2 itim-regular outline-none text-[1.1rem] sm:text-xl'>|</Link>
     <Link to="/login" className='font-semibold pr-2 underline itim-regular outline-none text-[1.1rem] sm:text-xl sm:mr-5'>  Login </Link></div>
    </div>
  )
}

export default Login