import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import GradientBackdrop from './components/GradientBackdrop'
import Snowfall from './components/Snowfall'
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
  <Box sx={{ minHeight:'100%', bgcolor:'#0b0f14', position:'relative' }}>
     {/* colorful gradient behind everything */}+     <GradientBackdrop />
    {/* snowfall above gradient */}
    <Snowfall count={140} />

      <AppBar position="static">
        <Toolbar>
          <Typography component={Link} to="/" variant="h6"
            sx={{ flexGrow:1, color:'#e6f1ff', textDecoration:'none', cursor:'pointer' }}>
            URL Shortener
          </Typography>
          <Button color="inherit" component={Link} to="/">Shorten</Button>
          <Button color="inherit" component={Link} to="/stats">Stats</Button>
          <Button color="inherit" startIcon={<SettingsSuggestIcon />} onClick={()=>setOpen(true)}>
            Settings
          </Button>
        </Toolbar>
      </AppBar>

     <Container maxWidth="md" sx={{ py:3, position:'relative', zIndex:2 }}>
        <Outlet />
      </Container>

      <SettingsPanel open={open} onClose={()=>setOpen(false)} />
    </Box>
  )
}