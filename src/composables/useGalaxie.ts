import { ref, onMounted, onUnmounted } from "vue"
import type { Ref } from "vue"
import { LANGAGES } from "@/data/langages"
import type { Framework, Langage, SceneGalaxie } from "@/types/langage"

const REL_POSITIONS: [number, number][] = [
  [0.18, 0.32],
  [0.50, 0.29],
  [0.82, 0.32],
  [0.22, 0.72],
  [0.50, 0.68],
  [0.78, 0.72],
  [0.36, 0.47],
  [0.63, 0.38],
  [0.64, 0.67],
]

export function useGalaxie(canvasRef: Ref<HTMLCanvasElement | null>) {
  const scene = ref<SceneGalaxie>("galaxie")
  const langageActif = ref<Langage | null>(null)
  const frameworkActif = ref<Framework | null>(null)
  const opacite = ref(1)

  let ctx: CanvasRenderingContext2D | null = null
  let animId = 0
  let temps = 0
  let W = 0, H = 0
  let fonduSortie = false
  let prochScene: SceneGalaxie = "galaxie"
  let prochLangage: Langage | null = null

  function init() {
    const canvas = canvasRef.value
    if (!canvas) return
    ctx = canvas.getContext("2d")
    redimensionner()
    initialiserEtoiles()
    initialiserGalaxie()
    initialiserPositionsSystemes()
    attacherEvenements()
    boucle()
  }

  function redimensionner() {
    const canvas = canvasRef.value
    if (!canvas || !ctx) return
    W = canvas.width = canvas.offsetWidth
    H = canvas.height = canvas.offsetHeight
    initialiserPositionsSystemes()
  }

  function boucle() {
    animId = requestAnimationFrame(boucle)
    temps += 0.016
    if (!ctx) return

    if (fonduSortie) {
      opacite.value = Math.max(0, opacite.value - 0.065)
      if (opacite.value === 0) {
        fonduSortie = false
        scene.value = prochScene
        langageActif.value = prochLangage
        frameworkActif.value = null
      }
    } else {
      opacite.value = Math.min(1, opacite.value + 0.065)
    }

    ctx.globalAlpha = 1
    ctx.fillStyle = "#02020e"
    ctx.fillRect(0, 0, W, H)
    ctx.globalAlpha = opacite.value

    dessinerEtoiles()
    if (scene.value === "galaxie")  dessinerGalaxie()
    if (scene.value === "solaire")  dessinerSolaire()
  }

  function allerA(sc: SceneGalaxie, lang?: Langage) {
    prochScene = sc
    prochLangage = lang ?? null
    fonduSortie = true
  }

  function retour() {
    if (scene.value === "solaire")  allerA("systemes")
    else if (scene.value === "systemes") allerA("galaxie")
  }

  onMounted(() => {
    window.addEventListener("resize", redimensionner)
    init()
  })

  onUnmounted(() => {
    window.removeEventListener("resize", redimensionner)
    cancelAnimationFrame(animId)
  })

  interface Etoile {
    x: number; y: number; r: number
    alpha: number; phase: number; vitesse: number
  }
  let etoiles: Etoile[] = []
  let nebuleuses: { x: number; y: number; r: number; c: string }[] = []

  function initialiserEtoiles() {
    etoiles = []
    for (let i = 0; i < 500; i++) {
      etoiles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.1,
        alpha: Math.random() * 0.5 + 0.1,
        phase: Math.random() * Math.PI * 2,
        vitesse: 0.004 + Math.random() * 0.018,
      })
    }
    nebuleuses = [
      { x: W * 0.1,  y: H * 0.3,  r: H * 0.2,  c: "rgba(38,22,85,0.07)"  },
      { x: W * 0.84, y: H * 0.62, r: H * 0.17, c: "rgba(12,38,88,0.05)"  },
      { x: W * 0.55, y: H * 0.07, r: H * 0.14, c: "rgba(70,14,52,0.05)"  },
    ]
  }

  function dessinerEtoiles() {
    nebuleuses.forEach(n => {
      ctx!.fillStyle = n.c
      ctx!.beginPath()
      ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2)
      ctx!.fill()
    })
    etoiles.forEach(e => {
      e.phase += e.vitesse
      const alphaFinal = e.alpha * (0.6 + 0.4 * Math.sin(e.phase))
      ctx!.globalAlpha = alphaFinal * opacite.value
      ctx!.fillStyle = "#ffffff"
      ctx!.beginPath()
      ctx!.arc(e.x, e.y, e.r, 0, Math.PI * 2)
      ctx!.fill()
    })
    ctx!.globalAlpha = opacite.value
  }

  interface PointGalaxie {
    angle: number; rayon: number; ratioY: number
    taille: number; alpha: number; couleur: string
  }
  let pointsGalaxie: PointGalaxie[] = []
  let rotationGalaxie = 0
  let hovGalaxie = false

  function initialiserGalaxie() {
    pointsGalaxie = []
    const palettes = [
      ["#b3e5fc", "#81d4fa", "#e1f5fe"],
      ["#ede7f6", "#c5cae9", "#9575cd"],
      ["#fce4ec", "#f48fb1", "#f06292"],
    ]
    for (let bras = 0; bras < 3; bras++) {
      const angleBase = (bras / 3) * Math.PI * 2
      for (let i = 0; i < 250; i++) {
        const f = i / 250
        const a = angleBase + f * Math.PI * 3
        const r = 10 + f * 130
        const dispersion = (Math.random() - 0.5) * 22 / r
        pointsGalaxie.push({
          angle: a + dispersion,
          rayon: r + (Math.random() - 0.5) * 12,
          ratioY: 0.38 + Math.random() * 0.08,
          taille: Math.random() * 2 + 0.25,
          alpha: Math.random() * 0.7 + 0.3,
          couleur: palettes[bras][Math.floor(Math.random() * 3)],
        })
      }
    }
    for (let i = 0; i < 120; i++) {
      const a = Math.random() * Math.PI * 2
      const r = Math.random() * 24
      pointsGalaxie.push({
        angle: a, rayon: r, ratioY: 0.45,
        taille: Math.random() * 2.4 + 0.4,
        alpha: Math.random() * 0.9 + 0.1,
        couleur: "#fffde7",
      })
    }
  }

  function dessinerGalaxie() {
    rotationGalaxie += 0.0006
    const cx = W / 2, cy = H / 2
    const echelle = Math.min(W, H) / 320

    const lueur = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 180 * echelle)
    lueur.addColorStop(0, "rgba(50,70,200,0.08)")
    lueur.addColorStop(0.5, "rgba(30,45,130,0.04)")
    lueur.addColorStop(1, "transparent")
    ctx!.fillStyle = lueur
    ctx!.beginPath()
    ctx!.arc(cx, cy, 180 * echelle, 0, Math.PI * 2)
    ctx!.fill()

    pointsGalaxie.forEach(p => {
      const angleFinal = p.angle + rotationGalaxie
      const px = cx + Math.cos(angleFinal) * p.rayon * echelle
      const py = cy + Math.sin(angleFinal) * p.rayon * p.ratioY * echelle
      ctx!.globalAlpha = p.alpha * opacite.value
      ctx!.fillStyle = p.couleur
      ctx!.beginPath()
      ctx!.arc(px, py, p.taille * echelle, 0, Math.PI * 2)
      ctx!.fill()
    })

    ctx!.globalAlpha = opacite.value

    const noyau = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 16 * echelle)
    noyau.addColorStop(0, "rgba(255,255,220,0.97)")
    noyau.addColorStop(0.5, "rgba(210,185,255,0.55)")
    noyau.addColorStop(1, "transparent")
    ctx!.fillStyle = noyau
    ctx!.beginPath()
    ctx!.arc(cx, cy, 16 * echelle, 0, Math.PI * 2)
    ctx!.fill()

    if (hovGalaxie) {
      const pulsation = 0.18 + 0.18 * Math.sin(temps * 3)
      ctx!.globalAlpha = pulsation * opacite.value
      ctx!.strokeStyle = "#7090ff"
      ctx!.lineWidth = 1.5
      ctx!.beginPath()
      ctx!.arc(cx, cy, 80 * echelle, 0, Math.PI * 2)
      ctx!.stroke()
      ctx!.globalAlpha = opacite.value
    }

    ctx!.globalAlpha = (0.35 + 0.15 * Math.sin(temps * 1.4)) * opacite.value
    ctx!.fillStyle = "#ffffff"
    ctx!.textAlign = "center"
    ctx!.font = "11px system-ui"
    ctx!.fillText("Cliquez pour explorer", cx, cy + 90 * echelle)
    ctx!.globalAlpha = opacite.value
  }

  function initialiserPositionsSystemes() {
    LANGAGES.forEach((lang, i) => {
      const pos = REL_POSITIONS[i % REL_POSITIONS.length]
      lang._posX = pos[0] * W
      lang._posY = pos[1] * H
      if (!lang._anglesFrameworks) {
        lang._anglesFrameworks = lang.frameworks.map((_, fi) =>
          (fi / lang.frameworks.length) * Math.PI * 2
        )
      }
    })
  }

  function dessinerSolaire() {
    const lang = langageActif.value
    if (!lang) return

    const CX = W * 0.37
    const CY = H / 2

    if (!lang._anglesFrameworks) {
      lang._anglesFrameworks = lang.frameworks.map((_, i) =>
        (i / lang.frameworks.length) * Math.PI * 2
      )
    }
    lang._anglesFrameworks = lang._anglesFrameworks.map((a, i) =>
      a + (lang.frameworks[i].vitesse ?? (0.007 - i * 0.0008))
    )

    const sunR = 54
    const rgb = hexVersRgb(lang.couleur)

    const halo = ctx!.createRadialGradient(CX, CY, 0, CX, CY, sunR * 5.5)
    halo.addColorStop(0,   `rgba(${rgb},0.28)`)
    halo.addColorStop(0.4, `rgba(${rgb},0.08)`)
    halo.addColorStop(1,   "transparent")
    ctx!.fillStyle = halo
    ctx!.beginPath()
    ctx!.arc(CX, CY, sunR * 5.5, 0, Math.PI * 2)
    ctx!.fill()

    const pulsAtmos = 0.12 + 0.08 * Math.sin(temps * 1.8)
    ctx!.globalAlpha = pulsAtmos * opacite.value
    ctx!.strokeStyle = lang.couleur
    ctx!.lineWidth = 3
    ctx!.beginPath()
    ctx!.arc(CX, CY, sunR + 10, 0, Math.PI * 2)
    ctx!.stroke()
    ctx!.globalAlpha = pulsAtmos * 0.4 * opacite.value
    ctx!.lineWidth = 1.5
    ctx!.beginPath()
    ctx!.arc(CX, CY, sunR + 22, 0, Math.PI * 2)
    ctx!.stroke()
    ctx!.globalAlpha = opacite.value

    dessinerCercleDegrade(CX, CY, sunR, lang.couleur)

    ctx!.globalAlpha = 0.92 * opacite.value
    ctx!.fillStyle = "#ffffff"
    ctx!.textAlign = "center"
    ctx!.textBaseline = "middle"
    ctx!.shadowColor = "rgba(0,0,0,0.9)"
    ctx!.shadowBlur = 6
    ctx!.font = `700 ${lang.sym.length > 2 ? 14 : 20}px system-ui`
    ctx!.fillText(lang.sym, CX, CY)
    ctx!.shadowBlur = 0
    ctx!.textBaseline = "alphabetic"
    ctx!.globalAlpha = opacite.value

    ctx!.shadowColor = `rgba(${rgb},0.6)`
    ctx!.shadowBlur = 10
    ctx!.globalAlpha = 0.9 * opacite.value
    ctx!.fillStyle = lang.couleur
    ctx!.textAlign = "center"
    ctx!.font = "700 15px system-ui"
    ctx!.fillText(lang.nom, CX, CY + sunR + 26)
    ctx!.shadowBlur = 0
    ctx!.globalAlpha = 0.5 * opacite.value
    ctx!.fillStyle = "#ffffff"
    ctx!.font = "11px system-ui"
    ctx!.fillText(`${lang.annee} · ${lang.createur.split(" ")[0]}`, CX, CY + sunR + 42)
    ctx!.globalAlpha = opacite.value

    const espaceMini = Math.min(CX, CY) * 0.88
    const rayonBase = Math.min(espaceMini * 0.44, 130)
    const pas = Math.min(espaceMini * 0.15, 42)

    lang.frameworks.forEach((fw, i) => {
      const rayonOrbite = rayonBase + i * pas
      const angle = lang._anglesFrameworks![i]
      const fx = CX + Math.cos(angle) * rayonOrbite
      const fy = CY + Math.sin(angle) * rayonOrbite
      const fr = 16
      const estSurvol = hovElement === fw
      const estActif = frameworkActif.value === fw

      fw._posX = fx
      fw._posY = fy
      fw._rayon = fr

      ctx!.globalAlpha = (estActif ? 0.22 : 0.09) * opacite.value
      ctx!.strokeStyle = fw.couleur
      ctx!.lineWidth = estActif ? 0.8 : 0.5
      ctx!.setLineDash([4, 9])
      ctx!.beginPath()
      ctx!.arc(CX, CY, rayonOrbite, 0, Math.PI * 2)
      ctx!.stroke()
      ctx!.setLineDash([])
      ctx!.globalAlpha = opacite.value

      const rgb2 = hexVersRgb(fw.couleur)
      const auraR = fr * (estActif ? 4 : 3)
      const aura = ctx!.createRadialGradient(fx, fy, 0, fx, fy, auraR)
      aura.addColorStop(0, `rgba(${rgb2},${estActif ? 0.45 : 0.25})`)
      aura.addColorStop(1, "transparent")
      ctx!.fillStyle = aura
      ctx!.beginPath()
      ctx!.arc(fx, fy, auraR, 0, Math.PI * 2)
      ctx!.fill()

      dessinerCercleDegrade(fx, fy, fr, fw.couleur)

      if (estSurvol || estActif) {
        const intensite = estActif
          ? 0.65 + 0.28 * Math.sin(temps * 4)
          : 0.25 + 0.22 * Math.sin(temps * 4)
        ctx!.globalAlpha = intensite * opacite.value
        ctx!.strokeStyle = fw.couleur
        ctx!.lineWidth = estActif ? 2.5 : 1.8
        ctx!.beginPath()
        ctx!.arc(fx, fy, fr + 10, 0, Math.PI * 2)
        ctx!.stroke()
        if (estActif) {
          ctx!.globalAlpha = intensite * 0.35 * opacite.value
          ctx!.lineWidth = 1
          ctx!.beginPath()
          ctx!.arc(fx, fy, fr + 20, 0, Math.PI * 2)
          ctx!.stroke()
        }
        ctx!.globalAlpha = opacite.value
      }

      ctx!.globalAlpha = 0.95 * opacite.value
      ctx!.fillStyle = "#ffffff"
      ctx!.textAlign = "center"
      ctx!.textBaseline = "middle"
      ctx!.shadowColor = "rgba(0,0,0,0.8)"
      ctx!.shadowBlur = 4
      ctx!.font = `700 ${fw.sym.length > 2 ? 8 : 10}px system-ui`
      ctx!.fillText(fw.sym, fx, fy)
      ctx!.shadowBlur = 0
      ctx!.textBaseline = "alphabetic"
      ctx!.globalAlpha = opacite.value

      const labelAlpha = (estSurvol || estActif ? 1 : 0.72) * opacite.value
      ctx!.globalAlpha = labelAlpha
      ctx!.fillStyle = estActif ? fw.couleur : "#ffffff"
      ctx!.textAlign = "center"
      ctx!.shadowColor = estActif ? `rgba(${rgb2},0.7)` : "rgba(0,0,0,0.85)"
      ctx!.shadowBlur = estActif ? 10 : 5
      ctx!.font = `${estSurvol || estActif ? "600" : "400"} ${estSurvol || estActif ? 13 : 11}px system-ui`
      ctx!.fillText(fw.nom, fx, fy + fr + 18)
      ctx!.shadowBlur = 0
      ctx!.globalAlpha = opacite.value
    })
  }

  function hexVersRgb(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `${r},${g},${b}`
  }

  function assombrir(hex: string, delta: number): string {
    const n = parseInt(hex.slice(1), 16)
    const clamp = (v: number) => Math.max(0, Math.min(255, v))
    const r = clamp(((n >> 16) & 255) + delta)
    const g = clamp(((n >> 8) & 255) + delta)
    const b = clamp((n & 255) + delta)
    return `rgb(${r},${g},${b})`
  }

  function dessinerCercleDegrade(x: number, y: number, rayon: number, couleur: string) {
    const rgb = hexVersRgb(couleur)

    const glowR = rayon * 3.8
    const glow = ctx!.createRadialGradient(x, y, rayon * 0.85, x, y, glowR)
    glow.addColorStop(0,    `rgba(${rgb}, 0.45)`)
    glow.addColorStop(0.25, `rgba(${rgb}, 0.12)`)
    glow.addColorStop(1,    "transparent")
    ctx!.fillStyle = glow
    ctx!.beginPath()
    ctx!.arc(x, y, glowR, 0, Math.PI * 2)
    ctx!.fill()

    ctx!.save()
    ctx!.beginPath()
    ctx!.arc(x, y, rayon, 0, Math.PI * 2)
    ctx!.clip()

    const bx = x - rayon * 0.2
    const by = y - rayon * 0.3
    const body = ctx!.createRadialGradient(bx, by, 0, x, y, rayon)
    body.addColorStop(0,    couleur)
    body.addColorStop(0.72, assombrir(couleur, -50))
    body.addColorStop(1,    "#070b18")
    ctx!.fillStyle = body
    ctx!.fillRect(x - rayon, y - rayon, rayon * 2, rayon * 2)

    const sx = x - rayon * 0.4
    const sy = y - rayon * 0.48
    const spec = ctx!.createRadialGradient(sx, sy, 0, sx, sy, rayon * 0.45)
    spec.addColorStop(0,    "rgba(255,255,255,0.85)")
    spec.addColorStop(0.22, "rgba(255,255,255,0.25)")
    spec.addColorStop(1,    "transparent")
    ctx!.fillStyle = spec
    ctx!.fillRect(x - rayon, y - rayon, rayon * 2, rayon * 2)

    const tx = x + rayon * 0.36
    const ty = y + rayon * 0.44
    const term = ctx!.createRadialGradient(tx, ty, rayon * 0.4, tx, ty, rayon * 1.3)
    term.addColorStop(0, "transparent")
    term.addColorStop(1, "rgba(5,8,20,0.55)")
    ctx!.fillStyle = term
    ctx!.fillRect(x - rayon, y - rayon, rayon * 2, rayon * 2)

    ctx!.restore()
  }

  let hovElement: Langage | Framework | null = null

  function getHit(mx: number, my: number): Langage | Framework | "galaxie" | null {
    if (scene.value === "galaxie") {
      const cx = W / 2, cy = H / 2
      const dist = Math.hypot(mx - cx, my - cy)
      const seuil = 84 * Math.min(W, H) / 400
      return dist < seuil ? "galaxie" : null
    }

    if (scene.value === "systemes") {
      for (const lang of LANGAGES) {
        if (lang._posX == null || lang._posY == null) continue
        const dist = Math.hypot(mx - lang._posX, my - lang._posY)
        if (dist < 30) return lang
      }
      return null
    }

    if (scene.value === "solaire" && langageActif.value) {
      for (const fw of langageActif.value.frameworks) {
        if (fw._posX == null || fw._posY == null) continue
        const dist = Math.hypot(mx - fw._posX, my - fw._posY)
        if (dist < (fw._rayon ?? 13) + 14) return fw
      }
      return null
    }

    return null
  }

  function attacherEvenements() {
    const canvas = canvasRef.value!

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const hit = getHit(mx, my)
      hovElement = (hit !== "galaxie") ? hit : null
      hovGalaxie = hit === "galaxie"
      canvas.style.cursor = hit ? "pointer" : "default"
    })

    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const hit = getHit(mx, my)
      if (!hit) return

      if (hit === "galaxie") {
        allerA("systemes")
      } else if (scene.value === "systemes") {
        allerA("solaire", hit as Langage)
      } else if (scene.value === "solaire") {
        const fw = hit as Framework
        frameworkActif.value = frameworkActif.value === fw ? null : fw
      }
    })
  }

  return {
    scene,
    langageActif,
    frameworkActif,
    allerA,
    retour,
    LANGAGES,
  }
}
