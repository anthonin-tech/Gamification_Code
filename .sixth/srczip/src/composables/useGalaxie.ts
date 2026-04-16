import { ref, onMounted, onUnmounted } from "vue"
import type { Ref } from "vue"
import { PLANETES, TOUS_LES_LANGAGES } from "@/data/langages"
import type { Planete, Langage, SceneGalaxie } from "@/types/langage"

export function useGalaxie(canvasRef: Ref<HTMLCanvasElement | null>) {
    const scene = ref<SceneGalaxie>("galaxie")
    const planeteActive = ref<Planete | null>(null)
    const langageActif = ref<Langage | null>(null)
    const opacite = ref(1)

    let ctx: CanvasRenderingContext2D | null = null
    let animId = 0
    let temps = 0
    let W = 0, H = 0, cx = 0, CY = 0
    let fonduSortie = false
    let prochScene: SceneGalaxie = "galaxie"
    let prochPlanete: Planete | null = null

    function init() {
        const canvas = canvasRef.value
        if (!canvas) return
        ctx = canvas.getContext("2d")
        redimensionner()
        initialiserEtoiles()
        initialiserGalaxie()
        attacherEvenements()
        boucle()
    }

    function redimensionner() {
        const canvas = canvasRef.value
        if (!canvas || !ctx) return
        W = canvas.width = canvas.offsetWidth
        H = canvas.height = canvas.offsetHeight
        cx = W / 2; CY = H / 2
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
                planeteActive.value = prochPlanete
            }
        } else {
            opacite.value = Math.min(1, opacite.value + 0.065)
        }

        ctx.globalAlpha = 1
        ctx.fillStyle = "#02020e"
        ctx.fillRect(0, 0, W, H)
        ctx.globalAlpha = opacite.value

        dessinerEtoiles()
        if (scene.value === "galaxie") dessinerGalaxie()
        if (scene.value === "solaire") dessinerSolaire()
        if (scene.value === "planete") dessinerPlanete()
    }

    function allerA(sc: SceneGalaxie, planete?: Planete) {
        prochScene = sc
        prochPlanete = planete ?? null
        fonduSortie = true
    }

    function retour() {
        if (scene.value === "planete") allerA("solaire")
        else if (scene.value === "solaire") allerA("galaxie")
    }

    onMounted(() => {
        window.addEventListener("resize", redimensionner)
        init()
    })

    onUnmounted(() => {
        window.removeEventListener("resize", redimensionner)
        cancelAnimationFrame(animId)
    })

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

    function dessinerCercleDegrade(
        x: number, y: number,
        rayon: number,
        couleur: string
    ) {
        const lumX = x - rayon * 0.32
        const lumY = y - rayon * 0.32
        const degrade = ctx!.createRadialGradient(lumX, lumY, 0, x, y, rayon)

        degrade.addColorStop(0, "rgba(255,255,255,0.9)")
        degrade.addColorStop(0.3, couleur)
        degrade.addColorStop(1, assombrir(couleur, -55))

        ctx!.fillStyle = degrade
        ctx!.beginPath()
        ctx!.arc(x, y, rayon, 0, Math.PI * 2)
        ctx!.fill()
    }

    interface Etoile {
        x: number
        y: number
        r: number
        alpha: number
        phase: number
        vitesse: number
    }

    let etoiles: Etoile[] = []
    let nebuleuses: {x:number, y:number, r:number, c:string}[] = []

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
            { x: W * 0.1, y: H * 0.3, r: H * 0.2, c: "rgba(38,22,85,0.07)" },
            { x: W * 0.84, y: H * 0.62, r: H * 0.17, c: "rgba(12,38,88,0.05)" },
            { x: W * 0.55, y: H * 0.07, r: H * 0.14, c: "rgba(70,14,52,0.05)" },
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
        angle: number
        rayon: number
        ratioY: number
        taille: number
        alpha: number
        couleur: string
    }

    let pointsGalaxie: PointGalaxie[] = []
    let rotationGalaxie = 0

    function initialiserGalaxie() {
        pointsGalaxie = []
        const palettes = [
            ["#b3e5fc","#81d4fa","#e1f5fe"],
            ["#ede7f6","#c5cae9","#9575cd"],
            ["#fce4ec","#f48fb1","#f06292"],
        ]

        for (let bras = 0; bras < 3; bras++) {
            const angleBase = (bras/3) * Math.PI * 2
            for (let i = 0; i < 250; i++) {
                const f = i / 250
                const a = angleBase + f * Math.PI * 3
                const r = 10 + f * 95
                const dispersion = (Math.random() - 0.5) * 18 / r
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
                couleur: "#fffde7"
            })
        }
    }

    function dessinerGalaxie() {
        rotationGalaxie += 0.0006

        const echelle = Math.min(W, H) / 480
        const lueur = ctx!.createRadialGradient(cx, CY, 0, cx, CY, 180 * echelle)
        lueur.addColorStop(0, "rgba(50,70,200,0.08)")
        lueur.addColorStop(0.5, "rgba(30,45,130,0.04)")
        lueur.addColorStop(1, "transparent")
        ctx!.fillStyle = lueur
        ctx!.beginPath()
        ctx!.arc(cx, CY, 180 * echelle, 0, Math.PI * 2)
        ctx!.fill()

        pointsGalaxie.forEach(p => {
            const angleFinal = p.angle + rotationGalaxie
            const px = cx + Math.cos(angleFinal) * p.rayon * echelle
            const py = CY + Math.sin(angleFinal) * p.rayon * p.ratioY * echelle

            ctx!.globalAlpha = p.alpha * opacite.value
            ctx!.fillStyle = p.couleur
            ctx!.beginPath()
            ctx!.arc(px, py, p.taille * echelle, 0, Math.PI * 2)
            ctx!.fill()
        })

        ctx!.globalAlpha = opacite.value

        const noyau = ctx!.createRadialGradient(cx, CY, 0, cx, CY, 16 * echelle)
        noyau.addColorStop(0, "rgba(255,255,220,0.97)")
        noyau.addColorStop(0.5, "rgba(210,185,255,0.55)")
        noyau.addColorStop(1, "transparent")
        ctx!.fillStyle = noyau
        ctx!.beginPath()
        ctx!.arc(cx, CY, 16 * echelle, 0, Math.PI * 2)
        ctx!.fill()

        if (hovGalaxie) {
            const pulsation = 0.18 + 0.18 * Math.sin(temps * 3)
            ctx!.globalAlpha = pulsation * opacite.value
            ctx!.strokeStyle = "#7090ff"
            ctx!.lineWidth = 1.5
            ctx!.beginPath()
            ctx!.arc(cx, CY, 80 * echelle, 0, Math.PI * 2)
            ctx!.stroke()
            ctx!.globalAlpha = opacite.value
        }
    }

    function dessinerSolaire() {
        PLANETES.forEach(p => {
            if (!p._angle) p._angle = Math.random() * Math.PI * 2
            p._angle += p.vitesse * 0.007
        })

        PLANETES.forEach(p => {
            const rayonOrbite = Math.min(W, H) * p.orbitePct
            ctx!.globalAlpha = 0.08 * opacite.value
            ctx!.strokeStyle = "#ffffff"
            ctx!.lineWidth = 0.5
            ctx!.setLineDash([3, 9])
            ctx!.beginPath()
            ctx!.arc(cx, CY, rayonOrbite, 0, Math.PI * 2)
            ctx!.stroke()
            ctx!.setLineDash([])
        })

        ctx!.globalAlpha = opacite.value

        const lueurSoleil = ctx!.createRadialGradient(cx, CY, 0, cx, CY, 100)
        lueurSoleil.addColorStop(0, "rgba(255,220,80,0.15)")
        lueurSoleil.addColorStop(1, "transparent")
        ctx!.fillStyle = lueurSoleil
        ctx!.beginPath()
        ctx!.arc(cx, CY, 100, 0, Math.PI * 2)
        ctx!.fill()

        const soleil = ctx!.createRadialGradient(cx, CY, 0, cx, CY, 46)
        soleil.addColorStop(0, "#fffde7")
        soleil.addColorStop(0.4, "#fff176")
        soleil.addColorStop(0.8, "#ffca28")
        soleil.addColorStop(1, "transparent")
        ctx!.fillStyle = soleil
        ctx!.beginPath()
        ctx!.arc(cx, CY, 100, 0, Math.PI * 2)
        ctx!.fill()

        PLANETES.forEach(p => {
            const rayonOrbite = Math.min(W, H) * p.orbitePct
            const px = cx + Math.cos(p._angle!) * rayonOrbite
            const py = CY + Math.sin(p._angle!) * rayonOrbite
            const estSurvol = hovElement === p

            p._posX = px
            p._posY = py

            const rgb = hexVersRgb(p.couleur)
            const aura = ctx!.createRadialGradient(px, py, 0, px, py, p.taille * 2.8)
            aura.addColorStop(0, `rgba(${rgb},0.35)`)
            aura.addColorStop(1, "transparent")
            ctx!.fillStyle = aura
            ctx!.beginPath()
            ctx!.arc(px, py, p.taille * 2.8, 0, Math.PI * 2)
            ctx!.fill()

            if (p.id === "systems" || p.id === "data") {
                ctx!.save()
                ctx!.translate(px, py)
                ctx!.scale(1, 0.28)
                ctx!.globalAlpha = 0.32 * opacite.value
                ctx!.strokeStyle = p.couleur
                ctx!.lineWidth = 2
                ctx!.beginPath()
                ctx!.arc(0, 0, p.taille + 12, 0, Math.PI * 2)
                ctx!.stroke()
                ctx!.restore()
                ctx!.globalAlpha = opacite.value
            }

            dessinerCercleDegrade(px, py, p.taille, p.couleur)

            if (estSurvol) {
                const pulse = 0.22 + 0.22 * Math.sin(temps * 4)
                ctx!.globalAlpha = pulse * opacite.value
                ctx!.strokeStyle = p.couleur
                ctx!.lineWidth = 2
                ctx!.beginPath()
                ctx!.arc(px, py, p.taille + 10, 0, Math.PI * 2)
                ctx!.stroke()
                ctx!.globalAlpha = opacite.value
            }

            ctx!.globalAlpha = (estSurvol ? 1 : 0.72) * opacite.value
            ctx!.fillStyle = "#ffffff"
            ctx!.textAlign = "center"
            ctx!.font = `${estSurvol ? 13 : 11}px system-ui`
            ctx!.fillText(p.nom.split(" ")[0], px, py + p.taille + 15)
            ctx!.globalAlpha = 0.4 * opacite.value
            ctx!.font = "9px system-ui"
            ctx!.fillText(`${p.langages.length} langages`, px, py + p.taille + 27)
            ctx!.globalAlpha = opacite.value
        })
    }

    function initialiserAnglesPlanete(p: Planete) {
        if (!p._anglesLangages) {
            p._anglesLangages = p.langages.map((_, i) =>
                (i / p.langages.length) * Math.PI * 2
            )
        }
    }

    function dessinerPlanete() {
        const p = planeteActive.value
        if (!p) return

        initialiserAnglesPlanete(p)

        p._anglesLangages = p._anglesLangages!.map((a, i) => {
            return a + 0.003 + i * 0.00018
        })

        const bigR = Math.min(58, p.taille * 3.6)
        const rayonOrbite = Math.min(W, H) * 0.29
        const rgb = hexVersRgb(p.couleur)

        const lueur = ctx!.createRadialGradient(cx, CY, 0, cx, CY, bigR * 3.2)
        lueur.addColorStop(0, `rgba(${rgb}, 0.2)`)
        lueur.addColorStop(1, "transparent")
        ctx!.fillStyle = lueur
        ctx!.beginPath()
        ctx!.arc(cx, CY, bigR * 3.2, 0, Math.PI * 2)
        ctx!.fill()

        dessinerCercleDegrade(cx, CY, bigR, p.couleur)

        if (p.id === "systems" || p.id === "data") {
            ctx!.save()
            ctx!.translate(cx, CY)
            ctx!.scale(1, 0.26)
            ctx!.globalAlpha = 0.36 * opacite.value
            ctx!.strokeStyle = p.couleur
            ctx!.lineWidth = 3
            ctx!.beginPath()
            ctx!.arc(0, 0, bigR + 16, 0, Math.PI * 2)
            ctx!.stroke()
            ctx!.restore()
            ctx!.globalAlpha = opacite.value
        }

        ctx!.globalAlpha = 0.9 * opacite.value
        ctx!.fillStyle = "#ffffff"
        ctx!.textAlign = "center"
        ctx!.font = "600 16px system-ui"
        ctx!.fillText(p.nom, cx, CY - bigR - 20)
        ctx!.globalAlpha = 0.4 * opacite.value
        ctx!.font = "10px system-ui"
        ctx!.fillText(p.description, cx, CY - bigR - 6)
        ctx!.globalAlpha = opacite.value

        ctx!.globalAlpha = 0.06 * opacite.value
        ctx!.strokeStyle = "#ffffff"
        ctx!.lineWidth = 0.5
        ctx!.setLineDash([4, 10])
        ctx!.beginPath()
        ctx!.arc(cx, CY, rayonOrbite, 0, Math.PI * 2)
        ctx!.stroke()
        ctx!.setLineDash([])
        ctx!.globalAlpha = opacite.value

        p.langages.forEach((lang, i) => {
            const angle = p._anglesLangages![i]
            const lx = cx + Math.cos(angle) * rayonOrbite
            const ly = CY + Math.sin(angle) * rayonOrbite
            const lr = 22
            const estSurvol = hovElement === lang

            lang._posX = lx
            lang._posY = ly
            lang._rayon = lr

            ctx!.globalAlpha = 0.06 * opacite.value
            ctx!.strokeStyle = lang.couleur
            ctx!.lineWidth = 0.5
            ctx!.beginPath()
            ctx!.moveTo(cx, CY)
            ctx!.lineTo(lx, ly)
            ctx!.stroke()
            ctx!.globalAlpha = opacite.value

            const rgb2 = hexVersRgb(lang.couleur)
            const auraLune = ctx!.createRadialGradient(lx, ly, 0, lx, ly, lr * 2.8)
            auraLune.addColorStop(0, `rgba(${rgb2},0.28)`)
            auraLune.addColorStop(1, "transparent")
            ctx!.fillStyle = auraLune
            ctx!.beginPath()
            ctx!.arc(lx, ly, lr * 2.8, 0, Math.PI * 2)
            ctx!.fill()

            dessinerCercleDegrade(lx, ly, lr, lang.couleur)

            if (estSurvol) {
                const pulse = 0.28 + 0.28 * Math.sin(temps * 4)
                ctx!.globalAlpha = pulse * opacite.value
                ctx!.strokeStyle = lang.couleur
                ctx!.lineWidth = 1.5
                ctx!.beginPath()
                ctx!.arc(lx, ly, lr + 9, 0, Math.PI * 2)
                ctx!.stroke()
                ctx!.globalAlpha = opacite.value
            }

            ctx!.globalAlpha = 0.95 * opacite.value
            ctx!.fillStyle = "#ffffff"
            ctx!.textAlign = "center"
            ctx!.textBaseline = "middle"
            ctx!.font = `700 ${lang.sym.length > 2 ? 8 : 10}px system-ui`
            ctx!.fillText(lang.sym, lx, ly)
            ctx!.textBaseline = "alphabetic"

            ctx!.globalAlpha = (estSurvol ? 1 : 0.68) * opacite.value
            ctx!.font = `${estSurvol ? 12 : 10}px system-ui`
            ctx!.fillText(lang.nom, lx, ly + lr + 14)
            ctx!.globalAlpha = opacite.value
        })
    }

    let hovElement: Planete | Langage | "galaxie" | null = null
    let hovGalaxie = false

    function getHit(mx: number, my: number) {
        if (scene.value === "galaxie") {
            const dist = Math.hypot(mx - cx, my - CY)
            const seuilGalaxie = 84 * Math.min(W, H) / 400
            return dist < seuilGalaxie ? "galaxie" : null
        }

        if (scene.value === "solaire") {
            for (const p of PLANETES) {
                if (!p._posX || !p._posY) continue
                const dist = Math.hypot(mx - p._posX, my - p._posY)
                if (dist < p.taille + 16) return p
            }
            return null
        }

        if (scene.value === "planete" && planeteActive.value) {
            for (const lang of planeteActive.value.langages) {
                if (!lang._posX) continue
                const dist = Math.hypot(mx - lang._posX, my - lang._posY)
                if (dist < (lang._rayon ?? 22) + 12) return lang
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
            hovElement = hit !== "galaxie" ? hit : null
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
                allerA("solaire")
            } else if (scene.value === "solaire") {
                allerA("planete", hit as Planete)
            } else if (scene.value === "planete") {
                langageActif.value = hit as Langage
            }
        })
    }

    return {
        scene, planeteActive, langageActif, allerA, retour, TOUS_LES_LANGAGES
    }
}



