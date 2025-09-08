import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
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

// Custom dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#0b0f14', paper: '#121821' },
    text: { primary: '#e6f1ff', secondary: '#aab7cf' },
    primary: { main: '#4cc9f0' },
  },
})

const root = createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>
)