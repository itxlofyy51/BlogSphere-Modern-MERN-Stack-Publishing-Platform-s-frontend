import React, { useEffect, useState } from 'react'
import Login from '../components/Login'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router';
import { useBlog } from '../../hooks/blogAuth';
import CreateBlogNav from '../components/CreateBlogNav';
import { useAuth } from '../../hooks/useAuth';


const SinglePost = () => {
const {user} = useAuth(); 
const {id} = useParams();
const navigate = useNavigate();
const  {loading,fetchSingleBlog,handleDeleteBlog}= useBlog();
const [blog, setblog] = useState(null);
useEffect(() => {
  if (!id || id === "undefined") return;

  const loadData = async () => {
    try {
      const data = await fetchSingleBlog(id);
      if (data) {
        setblog(data); 
      } 
    } catch (err) {
      console.error("Component fetch error:", err);
    }
  };
  
  loadData();
}, [id]);
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
if(!blog){return <h1>No Blog Found....</h1>}
const onEdit = () =>{
  navigate(`/edit-blog/${blog._id}`);
}
const onDelete = async () => {
  if (window.confirm("Are you sure?")) {
    await handleDeleteBlog(blog._id);
    navigate('/home'); // Only navigate if the delete actually worked
  }
};
  return (
    <>
    <CreateBlogNav/>
    <div className='h-auto py-5 pb-20 w-screen min-h-screen bg-[#F5EFE6] flex items-center justify-center'>
    <div className='bg-white h-auto w-[90vw] flex flex-col mx-auto p-4 justify-start sm:w-[50vw]'>
        <img src={blog.image} alt={blog.title} className="w-full h-60 object-cover sm:h-110 md:h-80"  />
        <h1 className='text-[#D4A373] leading-none mt-3 itim-regular font-bold text-[1.7rem] w-full'>{blog.title}</h1>
        <p className='text-sm mt-3'>{blog.description}</p>
        {user && blog.user?._id === user._id && (
        <div className='flex w-full justify-between pt-5'>
        <button onClick={onEdit} className= "font-semibold w-1/2 itim-regular outline-none text-[0.9rem] sm:text-[1.1rem] sm:mr-5 bg-[#D4A373] text-white px-4 py-1 rounded-md">Edit Blog</button>
        <button onClick={onDelete} className="font-semibold w-1/2 itim-regular outline-none text-[0.9rem] sm:text-[1.1rem] sm:mr-5 bg-red-500 text-white px-4 py-1 rounded-md">Delete Blog</button>
        </div>)}
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default SinglePost