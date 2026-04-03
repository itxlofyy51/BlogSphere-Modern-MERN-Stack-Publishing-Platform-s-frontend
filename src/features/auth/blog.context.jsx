import { createContext, useEffect, useState } from "react";
import { getBlogs } from "./services/blog.api";
export const BlogContext = createContext();

export const BlogProvider = ({children})=>{
    const [loading, setloading] = useState(false);
    const [blogs, setblogs] = useState([]);
    const fetchBlogs = async () =>{
    setloading(true);
    try{
        const data = await getBlogs();
        setblogs(data.blogs);
    }catch(err){
        console.error(err);
    }finally{
        setloading(false);
    }}
    useEffect(()=>{
    fetchBlogs();
},[])
return (
        <BlogContext.Provider value={{loading,blogs,setblogs,setloading,fetchBlogs}}>{children}</BlogContext.Provider>
)}