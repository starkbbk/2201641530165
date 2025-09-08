
import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Shortener from './pages/Shortener'
import Stats from './pages/Stats'
import Redirector from './pages/Redirector'
import './styles.css'

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <Shortener /> },
    { path: 'stats', element: <Stats /> },
  ]},
  { path: '/:code', element: <Redirector /> },
])

const root = createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router} />)
