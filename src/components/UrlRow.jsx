
import React from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'

export default function UrlRow({ i, value, onChange }){
  return (
    <Grid container spacing={2} sx={{ mb:1 }}>
      <Grid item xs={12} md={6}>
        <TextField label={`Long URL #${i+1}`} value={value.url} onChange={e=>onChange(i, { ...value, url:e.target.value })} fullWidth />
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField label="Validity (minutes)" value={value.minutes} onChange={e=>onChange(i, { ...value, minutes:e.target.value })} fullWidth />
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField label="Preferred shortcode" value={value.code} onChange={e=>onChange(i, { ...value, code:e.target.value })} fullWidth />
      </Grid>
    </Grid>
  )
}
