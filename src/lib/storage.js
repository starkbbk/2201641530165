
// Local storage helpers for mappings and clicks
const KEY = 'aff_short_links_v1'

export function loadAll(){
  try{
    return JSON.parse(localStorage.getItem(KEY) || '{"links":[],"clicks":{}}')
  }catch{
    return { links:[], clicks:{} }
  }
}

function saveAll(data){
  localStorage.setItem(KEY, JSON.stringify(data))
}

export function saveLink(link){
  const data = loadAll()
  data.links = [link, ...data.links.filter(l => l.code !== link.code)]
  saveAll(data)
}

export function getByCode(code){
  const { links } = loadAll()
  return links.find(l => l.code === code) || null
}

export function listLinks(){
  return loadAll().links
}

export function addClick(code, info){
  const data = loadAll()
  if(!data.clicks[code]) data.clicks[code] = []
  data.clicks[code].unshift(info)
  saveAll(data)
}

export function listClicks(code){
  return loadAll().clicks[code] || []
}

export function codeExists(code){
  const { links } = loadAll()
  return links.some(l => l.code === code)
}
