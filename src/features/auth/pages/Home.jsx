import React, { useState } from 'react'
import CreateBlogNav from '../components/CreateBlogNav'
import Footer from '../components/Footer'
import Pagination from '../services/Pagination'
import BlogPost from '../components/BlogPost'
import { useBlog } from '../../hooks/blogAuth'
import { useEffect } from 'react'
import NavPic from '../components/NavPic'

const Home = () => {
  const {blogs,loading}=useBlog();
  const [currentPage, setcurrentPage] = useState(1)
  const postsPerPage = 12;
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex-postsPerPage;
  const currentPosts = (blogs||[]).slice(firstPostIndex,lastPostIndex);
  useEffect(()=>{
  setcurrentPage(1);
  },[blogs])
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


  return (
    <div className='overflow-x-hidden'>
    <NavPic/>
    <div className='bg-[#F5EFE6] pb-10 p-4 min-h-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-8 content-start'>
    {currentPosts.map((blog,index)=>{
      return (
        <BlogPost key={index} blog={blog} image={blog.image} author={blog?.user?.name} title={blog.title} />
      )
    })}
   </div>
   <Pagination 
totalPosts={blogs.length} 
postsPerPage={postsPerPage} 
setcurrentPage={setcurrentPage}
currentPage={currentPage}
/>
   <Footer/>
    </div>
  )
}

export default Home