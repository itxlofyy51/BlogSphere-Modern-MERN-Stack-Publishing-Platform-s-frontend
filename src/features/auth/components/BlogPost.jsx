import React from 'react'
import { Link } from 'react-router'

const BlogPost = ({image,author,title,blog}) => {
  
  return (
    <Link to={`/blog/${blog._id}`}>
     <div className='bg-white shadow-sm p-2 pb-0 flex flex-col h-auto min-h-50 sm:min-h-75'>
      {/* 'aspect-video' or 'aspect-square' on the IMAGE, not the container */}
      <img src={image} alt="blog" className='w-full aspect-video object-cover rounded-sm' />
      <h1 className='itim-regular mt-2 text-[0.7rem] sm:text-[1.2rem] pl-1 font-bold line-clamp-2'>
        {title}
      </h1>
      <div className='flex gap-2 mt-2'>
      <h1 className='font-semibold text-[0.7rem] sm:text-[1.1rem] pl-1 mt-2 '>By:</h1>
      <img 
    src={blog?.user?.avatar } 
    alt="user" 
    className="w-10 h-10 mb-2 rounded-full object-cover border-2 border-white shadow-sm opacity-80 group-hover:opacity-100 transition-opacity"
  />
      <p className='text-[0.6rem] sm:text-[1rem] pt-px mt-2 '>{author}</p>
      </div>
      </div>
      </Link>
  )
}

export default BlogPost
