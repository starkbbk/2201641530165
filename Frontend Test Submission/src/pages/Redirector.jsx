
import React from 'react'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import { getByCode, addClick } from '../lib/storage'
import { Log } from '../lib/logger'

export default function Redirector(){
  const { code } = useParams()
  const [status, setStatus] = React.useState('checking')
  React.useEffect(()=>{
    async function go(){
      try{
        const item = getByCode(code)
        if(!item){ setStatus('missing'); await Log('frontend','error','route',`code ${code} not found`); return }
        if(Date.now() > item.expiry){ setStatus('expired'); await Log('frontend','warn','route',`code ${code} expired`); return }
        // capture coarse location if permitted
        const info = { time: Date.now(), referrer: document.referrer, agent: navigator.userAgent, location: 'unknown' }
        try{
          await new Promise(resolve=>{
            const ok = pos => { info.location = `${pos.coords.latitude.toFixed(3)},${pos.coords.longitude.toFixed(3)}`; resolve() }
            const fail = () => resolve()
            navigator.geolocation ? navigator.geolocation.getCurrentPosition(ok, fail, { timeout: 1500 }) : resolve()
          })
        }catch{}
        addClick(code, info)
        await Log('frontend','info','route',`redirect ${code} -> ${item.url}`)
        window.location.replace(item.url)
      }catch(e){
        setStatus('error')
      }
    }
    go()
  }, [code])
  return (
    <Box sx={{ display:'grid', placeItems:'center', minHeight:'100vh' }}>
      {status==='checking' && <CircularProgress />}
      {status==='missing' && <Alert severity="error">Shortcode not found.</Alert>}
      {status==='expired' && <Alert severity="warning">This link has expired.</Alert>}
      {status==='error' && <Alert severity="error">Something went wrong.</Alert>}
    </Box>
  )
}
