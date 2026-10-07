import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform float uPixelRatio;
  attribute float aRandom;
  varying float vElev;
  varying float vRandom;

  void main() {
    vec3 p = position;
    float t = uTime;
    float wave =
      sin(p.x * 0.28 + t * 0.55) * cos(p.y * 0.24 - t * 0.35) * 0.9 +
      sin((p.x + p.y) * 0.12 + t * 0.25) * 0.7;
    float d = distance(p.xy, uMouse);
    float ripple = exp(-d * d * 0.012) * sin(d * 0.8 - t * 3.2) * 2.4 * uMouseStrength;
    p.z = wave + ripple;

    vElev = p.z;
    vRandom = aRandom;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.4 + max(p.z, 0.0) * 1.1 + aRandom * 0.9) * uPixelRatio * (46.0 / -mv.z);
  }
`

const FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;
  varying float vElev;
  varying float vRandom;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.15, r);
    float e = smoothstep(0.1, 2.4, vElev);
    float accentMix = e * (step(0.8, vRandom) * 0.9 + 0.15);
    vec3 col = mix(uColor, uAccent, clamp(accentMix, 0.0, 1.0));
    float alpha = (0.14 + e * 0.55) * soft;
    gl_FragColor = vec4(col, alpha);
  }
`

function cssRgb(name: string, fallback: string): THREE.Color {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
  const [r, g, b] = raw.split(/\s+/).map((n) => Number(n) / 255)
  return new THREE.Color(r, g, b)
}

interface HeroFieldProps {
  className?: string
}

/** Three.js dot field: a wave terrain that ripples around the cursor and tilts with scroll. */
export default function HeroField({ className = '' }: HeroFieldProps) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' })
    } catch {
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 200)
    const baseCam = new THREE.Vector3(0, -34, 26)
    camera.position.copy(baseCam)
    camera.lookAt(0, 6, 0)

    const isSmall = window.innerWidth < 768
    const cols = isSmall ? 56 : 96
    const rows = isSmall ? 40 : 60
    const spacing = isSmall ? 1.5 : 1.15
    const count = cols * rows
    const positions = new Float32Array(count * 3)
    const randoms = new Float32Array(count)
    let i = 0
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        positions[i * 3] = (x - cols / 2) * spacing
        positions[i * 3 + 1] = (y - rows / 2) * spacing
        positions[i * 3 + 2] = 0
        randoms[i] = Math.random()
        i++
      }
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(999, 999) },
      uMouseStrength: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uColor: { value: cssRgb('--c-fg', '245 243 238') },
      uAccent: { value: cssRgb('--c-accent', '249 115 22') },
    }
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Theme changes → recolor
    const themeObserver = new MutationObserver(() => {
      uniforms.uColor.value = cssRgb('--c-fg', '245 243 238')
      uniforms.uAccent.value = cssRgb('--c-accent', '249 115 22')
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    // Pointer → plane coordinates
    const raycaster = new THREE.Raycaster()
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const ndc = new THREE.Vector2()
    const hit = new THREE.Vector3()
    const target = new THREE.Vector2(999, 999)
    let targetStrength = 0
    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      if (e.clientY < rect.top || e.clientY > rect.bottom) {
        targetStrength = 0
        return
      }
      ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1)
      raycaster.setFromCamera(ndc, camera)
      if (raycaster.ray.intersectPlane(plane, hit)) {
        target.set(hit.x, hit.y)
        targetStrength = 1
      }
    }
    const onLeave = () => {
      targetStrength = 0
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    const resize = () => {
      const w = host.clientWidth
      const h = host.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)

    // Render loop, paused when off-screen or tab hidden
    let frame = 0
    let visible = true
    const t0 = performance.now()
    const render = () => {
      frame = 0
      if (!visible || document.hidden) return
      const t = (performance.now() - t0) / 1000
      uniforms.uTime.value = t
      uniforms.uMouse.value.lerp(target, 0.08)
      uniforms.uMouseStrength.value += (targetStrength - uniforms.uMouseStrength.value) * 0.06

      const scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1)
      camera.position.set(baseCam.x, baseCam.y + scroll * 10, baseCam.z - scroll * 6)
      camera.lookAt(0, 6 + scroll * 4, 0)

      renderer.render(scene, camera)
      frame = requestAnimationFrame(render)
    }
    const start = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    io.observe(host)
    const onVisibility = () => {
      if (!document.hidden) start()
    }
    document.addEventListener('visibilitychange', onVisibility)
    start()

    return () => {
      if (frame) cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={hostRef} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`} />
}
