
import React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { listLinks, listClicks } from '../lib/storage'

export default function Stats(){
  const links = listLinks()
  return (
    <Paper sx={{ p:2, background:'#121821', border:'1px solid rgba(255,255,255,.08)'}}>
      <Typography variant="h6" gutterBottom>All Shortened URLs</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Short</TableCell>
            <TableCell>Original</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell align="right">Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {links.map(l => (
            <TableRow key={l.code}>
              <TableCell className="mono">/{l.code}</TableCell>
              <TableCell sx={{ maxWidth:320, overflow:'hidden', textOverflow:'ellipsis' }}>{l.url}</TableCell>
              <TableCell>{new Date(l.created).toLocaleString()}</TableCell>
              <TableCell>{new Date(l.expiry).toLocaleString()}</TableCell>
              <TableCell align="right">{listClicks(l.code).length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {links.map(l => (
        <Accordion key={l.code} sx={{ mt:1 }}>
          <AccordionSummary expandIcon={<ExpandMore/>}>
            <Typography>Click details for /{l.code}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {(listClicks(l.code)).length===0 ? <div>No clicks yet.</div> : 
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell>Referrer</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Agent</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listClicks(l.code).map((c,idx)=>(
                  <TableRow key={idx}>
                    <TableCell>{new Date(c.time).toLocaleString()}</TableCell>
                    <TableCell>{c.referrer || 'direct'}</TableCell>
                    <TableCell>{c.location || 'unknown'}</TableCell>
                    <TableCell sx={{ maxWidth:260, overflow:'hidden', textOverflow:'ellipsis' }}>{c.agent}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>}
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  )
}
