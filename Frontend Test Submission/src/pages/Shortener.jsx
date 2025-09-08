
import React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import UrlRow from '../components/UrlRow'
import { isValidUrl, isValidMinutes, isValidCode } from '../lib/validation'
import { saveLink, codeExists } from '../lib/storage'
import { Log } from '../lib/logger'

function genCode(){
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let s=''
  for(let i=0;i<6;i++) s += chars[Math.floor(Math.random()*chars.length)]
  return s
}

export default function Shortener(){
  const [rows, setRows] = React.useState(Array.from({length:5}, ()=>({url:'', minutes:'', code:''})))
  const [errors, setErrors] = React.useState([])
  const [results, setResults] = React.useState([])

  const setRow = (i, v) => setRows(r => r.map((x,idx)=> idx===i ? v : x))

  function validateRow(r){
    const msgs = []
    if(!isValidUrl(r.url)) msgs.push('Enter a valid http(s) URL')
    if(!isValidMinutes(r.minutes)) msgs.push('Validity must be a positive integer (minutes)')
    if(!isValidCode(r.code)) msgs.push('Shortcode must be 3-24 chars [a-z A-Z 0-9 _ -]')
    return msgs
  }

  async function onShorten(){
    const es = rows.map(validateRow)
    const anyErr = es.some(x=>x.length>0)
    setErrors(es)
    if(anyErr){ await Log('frontend','warn','page','validation failed'); return }
    const out = []
    for(const r of rows){
      if(!r.url) continue
      let code = r.code || genCode()
      let guard = 0
      while(codeExists(code)){ // ensure uniqueness
        code = genCode()
        guard++; if(guard>5) break
      }
      const mins = r.minutes && String(r.minutes).trim()!=='' ? parseInt(r.minutes,10) : 30
      const now = Date.now()
      const expiry = now + mins*60*1000
      const link = { code, url:r.url, created: now, expiry, clicks:0 }
      saveLink(link)
      out.push(link)
      await Log('frontend','info','page',`shortened ${r.url} -> ${code} (${mins}m)`)
    }
    setResults(out)
  }

  return (
    <Paper sx={{ p:2, background:'#121821', border:'1px solid rgba(255,255,255,.08)'}}>
      <Typography variant="h6" gutterBottom>Shorten up to 5 URLs</Typography>
      <Stack divider={<Divider flexItem />} spacing={2}>
        {rows.map((r,i)=>(
          <div key={i}>
            <UrlRow i={i} value={r} onChange={setRow} />
            {errors[i] && errors[i].length>0 && <Alert severity="error">{errors[i].join(' • ')}</Alert>}
          </div>
        ))}
        <Button variant="contained" onClick={onShorten}>Create Short Links</Button>
        {results.length>0 && (
          <Paper sx={{ p:2, mt:1 }}>
            <Typography variant="subtitle1">Your links:</Typography>
            {results.map(l => (
              <div key={l.code} className="mono">
                <a href={`/${l.code}`} target="_blank">/{l.code}</a> → {l.url} (expires {new Date(l.expiry).toLocaleString()})
              </div>
            ))}
          </Paper>
        )}
      </Stack>
    </Paper>
  )
}
