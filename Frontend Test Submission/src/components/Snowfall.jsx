import React, { useEffect, useRef } from 'react'

export default function Snowfall({ count = 120 }) {
  const ref = useRef(null)
  const animRef = useRef(0)
  const flakesRef = useRef([])

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d', { alpha: true })
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Create flakes
    const rand = (min, max) => Math.random() * (max - min) + min
    flakesRef.current = Array.from({ length: count }).map(() => ({
      x: rand(0, width),
      y: rand(-height, height),
      r: rand(1, 3.2),               // radius
      spdY: rand(0.4, 1.4),          // fall speed
      spdX: rand(-0.4, 0.4),         // drift
      alpha: rand(0.35, 0.9),
    }))

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    const update = () => {
      ctx.clearRect(0, 0, width, height)
      // soft vignette gradient for depth
      const g = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width,height)/1.1)
      g.addColorStop(0, 'rgba(255,255,255,0.02)')
      g.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = g
      ctx.fillRect(0,0,width,height)

      for (const f of flakesRef.current) {
        f.y += f.spdY
        f.x += f.spdX + Math.sin(f.y * 0.012) * 0.25
        if (f.y > height + 10) { f.y = -10; f.x = Math.random() * width }
        if (f.x > width + 10) f.x = -10
        if (f.x < -10) f.x = width + 10

        ctx.beginPath()
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${f.alpha})`
        ctx.fill()
      }
      animRef.current = requestAnimationFrame(update)
    }
    update()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [count])

  return (
    <canvas
      ref={ref}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0, // UI sits above
      }}
    />
  )
}