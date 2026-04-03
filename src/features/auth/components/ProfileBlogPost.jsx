import React from 'react'
import {Link} from "react-router"

const ProfileBlogPost = ({blog,image,title}) => {
   return (
    <Link to={`/blog/${blog._id}`} >
     <div className='bg-white shadow-sm p-2 flex flex-col'>
      {/* 'aspect-video' or 'aspect-square' on the IMAGE, not the container */}
      <img src={image} alt="blog" className='w-full aspect-video object-cover rounded-sm' />
      <h1 className='itim-regular mt-2 text-[0.7rem] sm:text-[1.2rem] pl-1 font-bold line-clamp-2'>
      {title}
      </h1>
      <div className='flex gap-2'>
      <h1 className='font-semibold text-[0.7rem] sm:text-[1.1rem] pl-1 '>By:</h1>
      <p className='text-[0.6rem] sm:text-[1rem] pt-px '>{blog?.user?.name}</p>
      </div>
      </div>
    </Link>
  )
}

export default ProfileBlogPost