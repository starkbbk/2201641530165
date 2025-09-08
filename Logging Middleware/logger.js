
// Reusable logging function that calls the Test Server
// Log(stack, level, pkg, message)
const LOG_URL = 'http://20.244.56.144/evaluation-service/logs'

function getToken(){
  return localStorage.getItem('aff_token') || ''
}

export async function Log(stack, level, pkg, message){
  try{
    const res = await fetch(LOG_URL, {
      method:'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ stack, level, package: pkg, message })
    })
    return await res.json()
  }catch(e){
    // Silent fail to avoid breaking UX
    return { error: true, message: String(e) }
  }
}
