import { createBrowserRouter, Navigate } from 'react-router-dom';

// Import your components from their specific folders
import LoginPage from './features/auth/pages/LoginPage';
import Register from './features/auth/pages/Register';
import OtpVerification from './features/auth/pages/OtpVerification';
import SinglePost from "./features/auth/pages/SinglePost";
import ProtectedRoute from "./features/auth/components/Protected";
import Home from './features/auth/pages/Home';
import Profile from './features/auth/pages/Profile';
import CreateBlog from './features/auth/pages/CreateBlog';
import EditBlog from './features/auth/pages/EditBlog';
import SlashRoute from './features/auth/pages/SlashRoute';

// We export a constant named 'router' so App.jsx can find it
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify-email",
    element: <OtpVerification />,
  },{
    path:"/",
    element:<SlashRoute/>
  },
  {
    path: "/blog/:id",
    element: <SinglePost />,
  },
  /* --- PRIVATE / PROTECTED ROUTES --- */
  {
    element: <ProtectedRoute />, // This wraps the children below
    children: [
      {
        path: "/home",
        element: <Home/>,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/create-blog",
        element: <CreateBlog />,
      },
      {
        path: "/edit-blog/:id",
        element: <EditBlog />,
      },
    ],
  },
  /* --- FALLBACK (404) --- */
  {
    path: "*",
    element: (
      <div className="h-screen flex items-center justify-center">
        <h1 className="itim-regular text-2xl">404 - Page Not Found</h1>
      </div>
    ),
  },
]);