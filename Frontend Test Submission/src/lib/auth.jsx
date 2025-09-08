
import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'

const REG_URL = 'http://20.244.56.144/evaluation-service/register'
const AUTH_URL = 'http://20.244.56.144/evaluation-service/auth'

export function SettingsPanel({ open, onClose }){
  const [email, setEmail] = React.useState(localStorage.getItem('aff_email')||'')
  const [name, setName] = React.useState(localStorage.getItem('aff_name')||'')
  const [roll, setRoll] = React.useState(localStorage.getItem('aff_roll')||'')
  const [accessCode, setAC] = React.useState(localStorage.getItem('aff_access')||'')
  const [clientID, setCID] = React.useState(localStorage.getItem('aff_cid')||'')
  const [clientSecret, setCS] = React.useState(localStorage.getItem('aff_cs')||'')
  const [token, setToken] = React.useState(localStorage.getItem('aff_token')||'')
  const [msg, setMsg] = React.useState('')

  const saveLocal = () => {
    localStorage.setItem('aff_email', email)
    localStorage.setItem('aff_name', name)
    localStorage.setItem('aff_roll', roll)
    localStorage.setItem('aff_access', accessCode)
    localStorage.setItem('aff_cid', clientID)
    localStorage.setItem('aff_cs', clientSecret)
    if(token) localStorage.setItem('aff_token', token)
  }

  async function doRegister(){
    setMsg('')
    try{
      const res = await fetch(REG_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, name, mobileNo:'9999999999', githubUsername:'user', rollNo: roll, accessCode }) })
      const data = await res.json()
      setMsg(JSON.stringify(data, null, 2))
    }catch(e){ setMsg(String(e)) }
  }

  async function doAuth(){
    setMsg('')
    try{
      const res = await fetch(AUTH_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, name, rollNo: roll, accessCode, clientID, clientSecret }) })
      const data = await res.json()
      if(data && data.access_token){ setToken(data.access_token); localStorage.setItem('aff_token', data.access_token); setMsg('Token saved.') }
      else setMsg(JSON.stringify(data, null, 2))
    }catch(e){ setMsg(String(e)) }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Settings • Save your credentials / token</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt:1 }}>
          <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <TextField label="Name" value={name} onChange={e=>setName(e.target.value)} />
          <TextField label="Roll No" value={roll} onChange={e=>setRoll(e.target.value)} />
          <TextField label="Access Code" value={accessCode} onChange={e=>setAC(e.target.value)} />
          <TextField label="Client ID" value={clientID} onChange={e=>setCID(e.target.value)} />
          <TextField label="Client Secret" value={clientSecret} onChange={e=>setCS(e.target.value)} />
          <TextField label="Token (optional paste)" value={token} onChange={e=>setToken(e.target.value)} />
          {msg && <Alert severity="info" sx={{ whiteSpace:'pre-wrap' }}>{msg}</Alert>}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={saveLocal}>Save</Button>
        <Button onClick={doRegister}>Register</Button>
        <Button onClick={doAuth} variant="contained">Get Token</Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
