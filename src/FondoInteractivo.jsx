import { useEffect, useRef } from 'react'

export default function FondoInteractivo() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const mouse = { x: -1000, y: -1000 }
    const target = { x: -1000, y: -1000 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    const mobile = window.innerWidth < 768
    const GRID = mobile ? 65 : 45
    const WARP_R = mobile ? 140 : 220
    const WARP_F = 40
    const N_PART = mobile ? 30 : 75
    const CONN = 140
    const M_CONN = 200

    // Estrellas
    const stars = Array.from({ length: mobile ? 80 : 200 }, () => ({
      x: Math.random(), y: Math.random(),
      s: Math.random() * 1.5 + 0.3,
      sp: Math.random() * 0.02 + 0.005,
      off: Math.random() * Math.PI * 2,
    }))

    // Partículas
    const parts = Array.from({ length: N_PART }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      sz: Math.random() * 2 + 1,
      hue: [0, 25, 45, 190][Math.floor(Math.random() * 4)],
    }))

    const onMM = (e) => { target.x = e.clientX; target.y = e.clientY }
    const onML = () => { target.x = -1000; target.y = -1000 }
    const onTM = (e) => { target.x = e.touches[0].clientX; target.y = e.touches[0].clientY }
    const onTE = () => { target.x = -1000; target.y = -1000 }

    window.addEventListener('mousemove', onMM)
    document.addEventListener('mouseleave', onML)
    window.addEventListener('touchmove', onTM, { passive: true })
    window.addEventListener('touchend', onTE)

    function warp(x, y) {
      const dx = x - mouse.x, dy = y - mouse.y
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < WARP_R && d > 1) {
        const f = Math.pow((WARP_R - d) / WARP_R, 2) * WARP_F
        return { x: x + (dx / d) * f, y: y + (dy / d) * f }
      }
      return { x, y }
    }

    let t = 0

    function frame() {
      t += 0.016
      const W = canvas.width, H = canvas.height
      mouse.x += (target.x - mouse.x) * 0.08
      mouse.y += (target.y - mouse.y) * 0.08
      ctx.clearRect(0, 0, W, H)

      // Estrellas titilantes
      for (const s of stars) {
        const a = 0.15 + 0.5 * Math.sin(t * s.sp * 60 + s.off)
        ctx.beginPath()
        ctx.arc(s.x * W, s.y * H, s.s, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, a)})`
        ctx.fill()
      }

      // Grilla con deformación gravitacional
      const hs = GRID / 2
      for (let gx = 0; gx <= W + GRID; gx += GRID) {
        ctx.beginPath()
        for (let gy = 0; gy <= H; gy += hs) {
          const w = warp(gx, gy)
          gy === 0 ? ctx.moveTo(w.x, w.y) : ctx.lineTo(w.x, w.y)
        }
        const dx = Math.abs(gx - mouse.x)
        const b = dx < WARP_R ? 0.12 + (1 - dx / WARP_R) * 0.4 : 0.035
        ctx.strokeStyle = `rgba(0,240,255,${b})`
        ctx.lineWidth = dx < WARP_R ? 1 : 0.4
        ctx.stroke()
      }
      for (let gy = 0; gy <= H + GRID; gy += GRID) {
        ctx.beginPath()
        for (let gx = 0; gx <= W; gx += hs) {
          const w = warp(gx, gy)
          gx === 0 ? ctx.moveTo(w.x, w.y) : ctx.lineTo(w.x, w.y)
        }
        const dy = Math.abs(gy - mouse.y)
        const b = dy < WARP_R ? 0.12 + (1 - dy / WARP_R) * 0.4 : 0.035
        ctx.strokeStyle = `rgba(0,240,255,${b})`
        ctx.lineWidth = dy < WARP_R ? 1 : 0.4
        ctx.stroke()
      }

      // Intersecciones brillantes cerca del cursor
      if (mouse.x > -500) {
        for (let gx = 0; gx <= W + GRID; gx += GRID) {
          for (let gy = 0; gy <= H + GRID; gy += GRID) {
            const w = warp(gx, gy)
            const d = Math.sqrt((w.x - mouse.x) ** 2 + (w.y - mouse.y) ** 2)
            if (d < WARP_R * 1.2) {
              const a = (1 - d / (WARP_R * 1.2)) * 0.7
              ctx.beginPath()
              ctx.arc(w.x, w.y, 1.5 + a * 2, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(0,240,255,${a})`
              ctx.fill()
            }
          }
        }
      }

      // Scan line
      const sy = (t * 35) % (H + 200) - 100
      const sg = ctx.createLinearGradient(0, sy - 40, 0, sy + 40)
      sg.addColorStop(0, 'transparent')
      sg.addColorStop(0.5, 'rgba(0,240,255,0.025)')
      sg.addColorStop(1, 'transparent')
      ctx.fillStyle = sg
      ctx.fillRect(0, sy - 40, W, 80)

      // Resplandor del cursor
      if (mouse.x > -500) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, WARP_R * 1.8)
        g.addColorStop(0, 'rgba(0,240,255,0.12)')
        g.addColorStop(0.3, 'rgba(255,68,68,0.06)')
        g.addColorStop(0.6, 'rgba(255,140,0,0.03)')
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, W, H)
      }

      // Partículas
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy
        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10
        if (p.y < -10) p.y = H + 10
        if (p.y > H + 10) p.y = -10

        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < WARP_R && d > 1) {
          const f = (WARP_R - d) / WARP_R * 0.2
          p.vx += (dx / d) * f; p.vy += (dy / d) * f
        }
        p.vx *= 0.99; p.vy *= 0.99
        const sp = Math.sqrt(p.vx ** 2 + p.vy ** 2)
        if (sp > 2.5) { p.vx = (p.vx / sp) * 2.5; p.vy = (p.vy / sp) * 2.5 }

        const glow = d < WARP_R * 2 ? 1 + (1 - d / (WARP_R * 2)) * 2.5 : 1
        ctx.save()
        ctx.shadowColor = `hsla(${p.hue},100%,55%,0.9)`
        ctx.shadowBlur = 18 * glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.sz * glow, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},100%,60%,${Math.min(0.85 * glow, 1)})`
        ctx.fill()
        ctx.restore()
      }

      // Conexiones entre partículas
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i], b = parts[j]
          const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
          if (d < CONN) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(255,120,50,${(1 - d / CONN) * 0.25})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Conexiones cursor ↔ partículas
      if (mouse.x > -500) {
        for (const p of parts) {
          const d = Math.sqrt((p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2)
          if (d < M_CONN) {
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y); ctx.lineTo(p.x, p.y)
            ctx.strokeStyle = `rgba(0,240,255,${(1 - d / M_CONN) * 0.55})`
            ctx.lineWidth = 0.9
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(frame)
    }

    frame()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMM)
      document.removeEventListener('mouseleave', onML)
      window.removeEventListener('touchmove', onTM)
      window.removeEventListener('touchend', onTE)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
