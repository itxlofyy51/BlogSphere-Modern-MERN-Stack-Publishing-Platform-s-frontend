import React from 'react'
import { useAuth } from '../../hooks/useAuth';

const ProfilePic = () => {
const {user,changeAvatar}=useAuth();
const onFileChange=(e)=>{
  if(e.target.files[0]){
    changeAvatar(e.target.files[0]);
  }
}
  return (
    <div className=' bg-[#F5EFE6] p-5  pt-8 h-50 sm:h-55 sm:pb-4 lg:h-65 flex justify-between items-center flex-col'>
        <div className='flex flex-col justify-center items-center gap-2'> 
          <div className='relative group'>
        <img src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}`} alt="profile" onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=User"; }} className='rounded-full sm:h-30 sm:w-30 h-25 w-25 lg:h-40 lg:w-40' />
      <label className='absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors'>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <input type="file" className="hidden" onChange={onFileChange} accept="image/*" />
        </label>
        </div>
        <h1 className='itim-regular text-2xl pt-2 font-bold'>{user?.name || "User"}</h1></div>
    </div>
  )
}

export default ProfilePic