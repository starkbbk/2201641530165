import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import App from './App'
import Shortener from './pages/Shortener'
import Stats from './pages/Stats'
import Redirector from './pages/Redirector'
import { glassTheme } from './glassTheme'   // <-- make sure this file exists at src/glassTheme.js
import './styles.css'

// Routes
const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <Shortener /> },
    { path: 'stats', element: <Stats /> },
  ]},
  { path: '/:code', element: <Redirector /> },
])

const root = createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={glassTheme}>
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>
)