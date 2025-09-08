
export function isValidUrl(u){
  try{ const x = new URL(u); return x.protocol === 'http:' || x.protocol === 'https:' }catch{ return false }
}

export function isValidMinutes(v){
  if(v === '' || v === null || v === undefined) return true
  if(typeof v === 'string' && v.trim() === '') return true
  const n = Number(v)
  return Number.isInteger(n) && n > 0 && n <= 60*24*30 // up to 30 days
}

export function isValidCode(s){
  if(!s) return true
  return /^[a-zA-Z0-9_-]{3,24}$/.test(s)
}
