import React, { useState } from 'react'
import CreateBlogNav from '../components/CreateBlogNav'
import Footer from '../components/Footer'
import Pagination from '../services/Pagination'
import ProfilePic from '../components/ProfilePic'
import ProfileBlogPost from '../components/ProfileBlogPost'
import { useBlog } from '../../hooks/blogAuth'
import { useAuth } from '../../hooks/useAuth'

const Profile = () => {
  const {blogs} = useBlog();
  const {user} = useAuth();
  const [currentPage,setcurrentPage]=useState(1);
  const postsPerPage = 12;
  const myBlogs = user?blogs.filter(blog=>blog?.user?._id === user._id):[];
  const lastPostIndex = currentPage*postsPerPage;
  const firstPostIndex = lastPostIndex-postsPerPage;
  const currentPosts = myBlogs.slice(firstPostIndex,lastPostIndex);

      return (
    <div className='overflow-x-hidden'>
    <CreateBlogNav/>
    <ProfilePic/>
    <div className='bg-[#F5EFE6] p-4 min-h-screen grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-8 content-start'>
      {currentPosts.length===0?<p className='col-span-4 text-center text-gray-400 mt-10 itim-regular'> No Blogs yet</p>:currentPosts.map((blog)=>(
        <ProfileBlogPost
        key={blog._id} blog={blog} image={blog.image} title={blog.title} />
      ))}
   </div>
   <Pagination
        totalPosts={myBlogs.length}
        postsPerPage={postsPerPage}
        setcurrentPage={setcurrentPage}
        currentPage={currentPage}
      />
   <Footer/>
    </div>
  )
}

export default Profile