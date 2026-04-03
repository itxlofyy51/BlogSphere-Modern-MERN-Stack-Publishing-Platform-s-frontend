import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api/auth",
  withCredentials: true,
});

export async function getBlogs() {
  try {
    const res = await api.get("/get-blogs");
    return res.data; // { message, blogs }
  } catch (err) {
    console.error("Error fetching blogs:", err);
    throw err;
  }
}

export async function getBlog(id,token) {
  try {
    const res = await api.get(`/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // 2. Send it here
      },});
    return res.data; // { message, blog }
  } catch (err) {
    console.error("Error fetching single blog:", err);
    throw err;
  }
}

export async function createBlog(formData, token) {
  try {
    const res = await api.post("/create-blog", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // No Content-Type — axios sets multipart/form-data boundary automatically
      },
    });
    return res.data; // { message, blog }
  } catch (err) {
    console.error("Error creating blog:", err.response?.data || err.message);
    throw err;
  }
}

export async function updateBlog(id, formData, token) {
  try {
    const res = await api.put(`/update-blog/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; // { message, blog }
  } catch (err) {
    console.error("Error updating blog:", err.response?.data || err.message);
    throw err;
  }
}

export async function deleteBlog(id, token) {
  try {
    const res = await api.delete(`/delete-blog/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; // { message }
  } catch (err) {
    console.error("Error deleting blog:", err.response?.data || err.message);
    throw err;
  }
}

export async function getMyBlogs(token) {
  try {
    const res = await api.get("/my-blogs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; // { message, blogs }
  } catch (err) {
    console.error("Error fetching my blogs:", err.response?.data || err.message);
    throw err;
  }
}
