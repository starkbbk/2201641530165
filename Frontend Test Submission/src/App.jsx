import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import { SettingsPanel } from './lib/auth'

export default function App(){
  const [open, setOpen] = React.useState(false)
  return (
    <Box sx={{ minHeight:'100%', bgcolor:'#0b0f14' }}>
      <AppBar position="static" color="default" sx={{ background:'#121821', borderBottom:'1px solid rgba(255,255,255,.08)'}}>
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{ flexGrow:1, color:'#e6f1ff', textDecoration:'none', cursor:'pointer', '&:hover':{ opacity:.85 } }}
          >
            URL Shortener
          </Typography>
          <Button color="inherit" component={Link} to="/">Shorten</Button>
          <Button color="inherit" component={Link} to="/stats">Stats</Button>
          <Button color="inherit" startIcon={<SettingsSuggestIcon />} onClick={()=>setOpen(true)}>Settings</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ py:3 }}>
        <Outlet />
      </Container>
      <SettingsPanel open={open} onClose={()=>setOpen(false)} />
    </Box>
  )
}