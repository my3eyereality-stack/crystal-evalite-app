import { useEffect, useRef } from 'react'
import { MC } from '../theme.js'

const COLORS = [MC.genetic, MC.emotional, MC.language, MC.motivation]

export default function Crystal3D({ activeKey }) {
  const canvasRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width = 200
    const H = canvas.height = 200
    const cx = W / 2
    const cy = H / 2
    let t = 0

    const activeColors = activeKey
      ? [MC[activeKey]]
      : COLORS

    function draw() {
      ctx.clearRect(0, 0, W, H)
      t += 0.008

      const layers = [
        {r:28, speed:1,   sides:4, alpha:0.9},
        {r:42, speed:0.7, sides:6, alpha:0.6},
        {r:56, speed:0.5, sides:8, alpha:0.4},
        {r:70, speed:0.3, sides:12,alpha:0.2},
      ]

      layers.forEach((layer, li) => {
        const col = activeColors[li % activeColors.length]
        const angle = t * layer.speed
        ctx.beginPath()
        for (let i = 0; i <= layer.sides; i++) {
          const a = (i / layer.sides) * Math.PI * 2 + angle
          const px = cx + Math.cos(a) * layer.r
          const py = cy + Math.sin(a) * layer.r
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
        }
        ctx.closePath()
        ctx.strokeStyle = col
        ctx.globalAlpha = layer.alpha
        ctx.lineWidth = 1.5
        ctx.stroke()

        // glow
        ctx.shadowColor = col
        ctx.shadowBlur = 12
        ctx.stroke()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1
      })

      frameRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(frameRef.current)
  }, [activeKey])

  return (
    <canvas
      ref={canvasRef}
      style={{display:'block',margin:'0 auto',opacity:0.95}}
    />
  )
}
