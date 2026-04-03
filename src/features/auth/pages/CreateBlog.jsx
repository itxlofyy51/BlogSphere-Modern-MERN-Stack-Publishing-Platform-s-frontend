import React, { useState } from 'react'
import Login from '../components/Login'
import Footer from '../components/Footer'
import CreateBlogNav from '../components/CreateBlogNav';
import { useBlog } from "../../hooks/blogAuth"
import { useNavigate } from 'react-router';

const CreateTask = () => {
  const {handleCreateBlog,loading}=useBlog();
  const navigate = useNavigate();

  const [title, settitle] = useState(null);
  const [description, setdescription] = useState(null);
  const [imageFile, setimageFile] = useState(null);

  const submitHandler = async (e)=>{
    e.preventDefault();
    await handleCreateBlog({title,description,imageFile});
    settitle("");
    setdescription("");
    setimageFile("");
    navigate("/home");
  }
  return (
    <>
    <CreateBlogNav/>
    <div className='h-[90vh] pb-10 bg-[#F5EFE6] flex items-center justify-center'>
    <form onSubmit={submitHandler}
  className="rounded-3xl bg-[#EADBC8] w-[92vw] sm:w-[30vw] flex flex-col items-center
             p-12 py-8 shadow-[0_15px_40px_-10px_rgba(212,163,115,0.45)] 
             transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-[0_25px_50px_-8px_rgba(212,163,115,0.55)]" action="">
     <h1 className='text-center w-full font-bold itim-regular text-[1.4rem] pb-3'>Create A New Blog</h1>
     <div className='flex w-full flex-col gap-0'>
      <label className='pl-1 itim-regular text-[1.1rem] ' htmlFor="title">Title:</label>
      <input onChange={(e)=>settitle(e.target.value)} className='text-[#454545] bg-white pl-4 pr-4 w-full py-2 outline-none rounded-xl ' type="text" id="title" name="title" placeholder='Enter title' required />
      <label className='pl-1 itim-regular text-[1.1rem] pt-6 ' htmlFor="description">Description:</label>
      <textarea onChange={(e)=>setdescription(e.target.value)} className='text-[#454545] bg-white pl-4 pr-4 w-full py-2 outline-none rounded-xl ' type="text" id="description" name="description" placeholder='Enter description' required />
      <label className='pl-1 itim-regular text-[1.1rem] pt-6' htmlFor="image">Upload Image:</label>
      <input onChange={(e)=>setimageFile(e.target.files[0])} className='text-[#454545] bg-[#FAF7F2] outline-orange-600 text-sm pl-4 pr-4 w-full py-2 rounded-xl ' type="file" id="image" name="image" placeholder='Upload image' required />
      </div>
      <button className='w-full transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 hover:shadow-lg active:brightness-90 mt-4 py-1 rounded-md  bg-[#D4A373] whitespace-nowrap'>{loading ?"Creating":"Create Blog"}</button>
    </form>
    </div>
    <Footer/>
    </>

  )
}

export default CreateTask