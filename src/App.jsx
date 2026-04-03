import React from 'react'
import Home from './features/auth/pages/Home'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.routes'
import { AuthProvider } from './features/auth/auth.context'
import { BlogProvider } from './features/auth/blog.context'

function App() {
  return (
    // 2. AuthProvider MUST be the parent of everything
    <AuthProvider>
      <BlogProvider><RouterProvider router={router} /></BlogProvider>
    </AuthProvider>
  );
}

export default App