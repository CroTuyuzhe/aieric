import { useEffect, useRef } from 'react'
import Particles from './Particles'

function easeOut(t) { return 1 - (1 - t) * (1 - t) * (1 - t) }
function easeIn(t) { return t * t * t }
function lerp(a, b, t) { return a + (b - a) * t }

const DURATION = 6

function drawEarth(ctx, w, h, t, img) {
  const p = easeOut(Math.min(t / 0.8, 1))
  const fade = t > 0.78 ? easeIn((t - 0.78) / 0.22) : 0
  const a = Math.min(p, 1 - fade)
  if (a <= 0.01) return

  const cx = w / 2
  const r = lerp(Math.min(w, h) * 0.1, w / 2, p)
  const cy = lerp(h * 1.08, h * 0.5 + r * 0.92, p)

  ctx.save()
  ctx.globalAlpha = a

  // Layer 1: wide ambient glow (sun behind Earth)
  const amb = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, r * 2.2)
  amb.addColorStop(0, 'rgba(15, 60, 140, 0.03)')
  amb.addColorStop(0.4, 'rgba(25, 100, 220, 0.06)')
  amb.addColorStop(0.6, 'rgba(35, 130, 255, 0.08)')
  amb.addColorStop(0.8, 'rgba(20, 80, 200, 0.03)')
  amb.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = amb
  ctx.fillRect(0, 0, w, h)

  // Layer 2: tight rim glow
  const rim = ctx.createRadialGradient(cx, cy, r * 0.96, cx, cy, r * 1.25)
  rim.addColorStop(0, 'rgba(70, 160, 255, 0.55)')
  rim.addColorStop(0.08, 'rgba(55, 150, 255, 0.4)')
  rim.addColorStop(0.25, 'rgba(40, 130, 255, 0.18)')
  rim.addColorStop(0.5, 'rgba(25, 100, 230, 0.06)')
  rim.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = rim
  ctx.fillRect(0, 0, w, h)

  // Layer 2.5: bright highlight along top edge of globe
  const topY = cy - r
  const hlW = r * 0.7
  const hlH = r * 0.18
  const topHl = ctx.createRadialGradient(cx, topY, 0, cx, topY, hlW)
  topHl.addColorStop(0, `rgba(160, 210, 255, ${0.8 * a})`)
  topHl.addColorStop(0.3, `rgba(80, 170, 255, ${0.35 * a})`)
  topHl.addColorStop(0.6, `rgba(40, 130, 255, ${0.1 * a})`)
  topHl.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.save()
  ctx.scale(1, hlH / hlW)
  ctx.fillStyle = topHl
  ctx.fillRect(cx - hlW, (topY - hlH) * (hlW / hlH), hlW * 2, hlH * 2 * (hlW / hlH))
  ctx.restore()

  // Layer 3: Earth disk
  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.clip()

  // Dark base fill
  ctx.fillStyle = '#050508'
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2)

  // Texture (faint continents)
  if (img.complete && img.naturalWidth > 0) {
    const dh = r * 2
    const dw = dh * (img.naturalWidth / img.naturalHeight)
    const ox = ((t * 1.2) % 1) * dw
    const dx = cx - dw / 2 - ox
    const dy = cy - r

    ctx.globalAlpha = a * 0.5
    ctx.drawImage(img, dx, dy, dw, dh)
    ctx.drawImage(img, dx + dw, dy, dw, dh)
    ctx.globalAlpha = a

    // Limb darkening: edges of sphere go dark, center stays slightly visible
    const limb = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
    limb.addColorStop(0, 'rgba(0, 0, 0, 0)')
    limb.addColorStop(0.5, 'rgba(0, 0, 0, 0)')
    limb.addColorStop(0.75, 'rgba(0, 0, 0, 0.35)')
    limb.addColorStop(0.92, 'rgba(0, 2, 8, 0.75)')
    limb.addColorStop(1, 'rgba(0, 3, 10, 0.92)')
    ctx.fillStyle = limb
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2)
  }

  ctx.restore()
  ctx.restore()
}

export default function DarkVeilBackground({ heroMode, onComplete }) {
  const canvasRef = useRef(null)
  const imgRef = useRef(null)
  const stateRef = useRef({ time: 0, mode: 'idle', start: 0 })

  useEffect(() => {
    const img = new Image()
    img.src = '/earth-dark.jpg'
    imgRef.current = img
  }, [])

  useEffect(() => {
    const s = stateRef.current
    if (heroMode === 'animating' && s.mode !== 'animating') {
      s.mode = 'animating'
      s.start = s.time
    } else if (heroMode === 'idle' && s.mode !== 'idle') {
      s.mode = 'idle'
    }
  }, [heroMode])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    const s = stateRef.current

    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight }
    resize()
    addEventListener('resize', resize)

    const loop = () => {
      s.time++
      if (s.mode === 'animating') {
        const { width: w, height: h } = canvas
        const t = Math.min((s.time - s.start) / 60 / DURATION, 1)
        ctx.clearRect(0, 0, w, h)
        drawEarth(ctx, w, h, t, imgRef.current)
        if (t >= 1) {
          s.mode = 'idle'
          ctx.clearRect(0, 0, w, h)
          onComplete?.()
        }
      }
      raf = requestAnimationFrame(loop)
    }

    loop()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize) }
  }, [onComplete])

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Particles
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleColors={['#ffffff', '#ffffff', '#ffffff']}
        moveParticlesOnHover={false}
        alphaParticles
        particleBaseSize={100}
        sizeRandomness={1}
        cameraDistance={20}
        className="absolute inset-0"
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
