import React from 'react'
import Login from '../components/Login'
import Footer from '../components/Footer'
import Work from "../../../assests/work.jpg";

const SlashRoute = () => {
  return (
    <>
    <Login/>
    <div className='h-[91vh] sm:h-[84vh] bg-[#F5EFE6] flex items-center justify-center'>
    <div className='bg-white h-80 w-[90vw] flex items-center justify-center sm:h-100 sm:w-[50vw]'>
        <img src={Work} className="w-[90%] h-[90%] object-cover "  alt="" />
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default SlashRoute