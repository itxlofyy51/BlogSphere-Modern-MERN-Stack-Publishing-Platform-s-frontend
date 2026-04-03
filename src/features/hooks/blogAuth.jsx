import { useContext } from "react";
import { createBlog, updateBlog,deleteBlog, getBlog } from "../auth/services/blog.api";
import { BlogContext } from "../auth/blog.context";
import { useAuth } from "./useAuth";


export const useBlog = () =>{
const context = useContext(BlogContext);
const {loading,blogs,setloading,setblogs}=context;
const {getValidToken} = useAuth();

const handleCreateBlog = async ({ title, description, imageFile }) => {
    setloading(true);
    try {
      const token = await getValidToken(); // ← get token
      if (!token) return;

      const formData = new FormData(); // ← build FormData here
      formData.append("title", title);
      formData.append("description", description);
      if (imageFile) formData.append("image", imageFile);

      const { blog } = await createBlog(formData, token); // ← pass both
      setblogs((prev) => [blog, ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setloading(false);
    }
  };

  const handleUpdateBlog = async (id, { title, description, imageFile }) => {
    setloading(true);
    try {
      const token = await getValidToken();
      if (!token) return;

      const formData = new FormData();
      if (title) formData.append("title", title);
      if (description) formData.append("description", description);
      if (imageFile) formData.append("image", imageFile);

      const data = await updateBlog(id, formData, token);
      setblogs((prev) => prev.map((b) => b._id === id ? data.blog : b));
    } catch (err) {
      console.error(err);
    } finally {
      setloading(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    setloading(true);
    try {
      const token = await getValidToken();
      if (!token) return;

      await deleteBlog(id, token);
      setblogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setloading(false);
    }
  };

  const fetchSingleBlog = async (id) => {
    setloading(true);
    try {
      const token = await getValidToken();
      if (!token) {
      console.warn("No valid token — user needs to log in");
      return null;
    }
      const blog = await getBlog(id,token);
      if (blog && blog.blog) {
       return blog.blog; // Return ONLY the blog object to the component
    }
    return null;
    } catch (err) {
      console.error(err);
      return null
    } finally {
      setloading(false);
    }
  };

return {loading,blogs,handleCreateBlog,handleDeleteBlog,handleUpdateBlog,fetchSingleBlog};
}