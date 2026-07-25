import {
    Group, Mesh, MeshStandardMaterial,
    TorusGeometry, ConeGeometry, SphereGeometry, CircleGeometry, CylinderGeometry,
    Points, PointsMaterial, BufferGeometry, Float32BufferAttribute,
    CanvasTexture, RepeatWrapping, SRGBColorSpace
} from 'three'

export function makePatternTexture(base: string, accent: string, kind: string): CanvasTexture {
    const s = 256, cv = document.createElement('canvas')
    cv.width = cv.height = s
    const x = cv.getContext('2d')!
    x.fillStyle = base; x.fillRect(0, 0, s, s)
    x.fillStyle = accent; x.strokeStyle = accent
    if (kind === 'Rayures') {
        x.lineWidth = 22
        for (let i = -s; i < s * 2; i += 64) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i + s, s); x.stroke() }
    } else if (kind === 'Points') {
        for (let a = 32; a < s; a += 64)
            for (let b = 32; b < s; b += 64) { x.beginPath(); x.arc(a, b, 13, 0, 7); x.fill() }
    } else if (kind === 'Chevrons') {
        x.lineWidth = 16
        for (let y = -s; y < s * 2; y += 56) { x.beginPath(); x.moveTo(0, y); x.lineTo(s / 2, y + 40); x.lineTo(s, y); x.stroke() }
    } else if (kind === 'Circuit') {
        x.lineWidth = 6; x.globalAlpha = 0.9
        for (let i = 0; i < 14; i++) {
            const ry = Math.random() * s; x.beginPath(); x.moveTo(0, ry); let cx = 0, cy = ry
            while (cx < s) {
                const nx = cx + 30 + Math.random() * 40; x.lineTo(nx, cy)
                const ny = cy + (Math.random() < 0.5 ? -1 : 1) * (20 + Math.random() * 30)
                x.lineTo(nx, ny); cx = nx; cy = ny
            }
            x.stroke(); x.beginPath(); x.arc(Math.random() * s, ry, 7, 0, 7); x.fill()
        }
        x.globalAlpha = 1
    }
    const t = new CanvasTexture(cv)
    t.wrapS = t.wrapT = RepeatWrapping; t.repeat.set(2, 2); t.colorSpace = SRGBColorSpace
    return t
}

export function buildAccessories(scene: any, accGroups: Record<string, Group>): void {
    const gold = new MeshStandardMaterial({ color: '#facc15', metalness: 0.4, roughness: 0.3, emissive: '#7a5a00' as any, emissiveIntensity: 0.25 })
    const couronne = new Group()
    const band = new Mesh(new TorusGeometry(0.62, 0.09, 16, 40), gold)
    band.rotation.x = Math.PI / 2; couronne.add(band)
    for (let i = 0; i < 7; i++) {
        const a = i / 7 * Math.PI * 2
        const spike = new Mesh(new ConeGeometry(0.11, 0.32, 12), gold)
        spike.position.set(Math.cos(a) * 0.62, 0.2, Math.sin(a) * 0.62); couronne.add(spike)
        const gem = new Mesh(new SphereGeometry(0.07, 16, 16), new MeshStandardMaterial({ color: '#ff5d8f', emissive: '#ff5d8f' as any, emissiveIntensity: 0.4 }))
        gem.position.set(Math.cos(a) * 0.62, 0.38, Math.sin(a) * 0.62); couronne.add(gem)
    }
    couronne.position.set(0, 4.9, 0); couronne.visible = false
    accGroups.couronne = couronne; scene.add(couronne)

    const lunettes = new Group()
    const frameMat = new MeshStandardMaterial({ color: '#1e2636', metalness: 0.3, roughness: 0.4 })
    const lensMat  = new MeshStandardMaterial({ color: '#14a7cc', emissive: '#14a7cc' as any, emissiveIntensity: 0.3 })
    for (const dx of [-0.28, 0.28]) {
        const ring = new Mesh(new TorusGeometry(0.22, 0.045, 14, 28), frameMat)
        ring.position.set(dx, 0, 0); lunettes.add(ring)
        const gl = new Mesh(new CircleGeometry(0.2, 28), lensMat)
        gl.position.set(dx, 0, 0.01); lunettes.add(gl)
    }
    const bridge = new Mesh(new CylinderGeometry(0.03, 0.03, 0.16, 10), frameMat)
    bridge.rotation.z = Math.PI / 2; lunettes.add(bridge)
    lunettes.position.set(0, 4.12, 1.06); lunettes.visible = false
    accGroups.lunettes = lunettes; scene.add(lunettes)

    const systeme = new Group()
    systeme.userData.planets = []
    const orbitDefs = [
        { r: 2.0, tilt:  0.4, ry: 0.2, ringC: '#7c4dff', pC: '#14a7cc', ps: 0.18, spd: 0.8  },
        { r: 2.6, tilt: -0.5, ry: 1.1, ringC: '#14a7cc', pC: '#ff5d8f', ps: 0.14, spd: 0.55 },
        { r: 3.2, tilt:  0.7, ry: 2.4, ringC: '#facc15', pC: '#facc15', ps: 0.22, spd: 0.35 },
    ]
    for (let i = 0; i < orbitDefs.length; i++) {
        const o = orbitDefs[i]
        const orbit = new Group(); orbit.rotation.set(o.tilt, o.ry, 0)
        const rm = new Mesh(new TorusGeometry(o.r, 0.02, 10, 80), new MeshStandardMaterial({ color: o.ringC, emissive: o.ringC as any, emissiveIntensity: 0.5, roughness: 0.5, transparent: true, opacity: 0.55 }))
        rm.rotation.x = Math.PI / 2; orbit.add(rm)
        const planet = new Mesh(new SphereGeometry(o.ps, 20, 20), new MeshStandardMaterial({ color: o.pC, emissive: o.pC as any, emissiveIntensity: 0.35, roughness: 0.4 }))
        planet.userData = { r: o.r, spd: o.spd, phase: i * 2.1 }
        orbit.add(planet); systeme.userData.planets.push(planet); systeme.add(orbit)
    }
    systeme.position.set(0, 3.7, 0); systeme.visible = false
    accGroups.systeme = systeme; scene.add(systeme)
}

export function setupCasque(
    avatar: any,
    helmetScene: any,
    accGroups: Record<string, any>,
    accBaseY: Record<string, number>
): void {
    if (!avatar || !helmetScene || accGroups.casque) return
    let node: any = null
    helmetScene.traverse((obj: any) => { if (obj.name === 'CasqueCodeQuest') node = obj })
    if (!node) return
    node.visible = false
    avatar.add(node)
    accGroups.casque = node
    accBaseY.casque = node.position.y
}

export interface AnimContext {
    getPose:      () => 'debout' | 'volant'
    getPersoBaseY: () => number | null
    sceneNodes:   Record<string, any>
    accGroups:    Record<string, any>
    accBaseY:     Record<string, number>
    startTime:    number
}

export function createAnimLoop(ctx: AnimContext) {
    let frameId = 0

    function tick() {
        const t = (Date.now() - ctx.startTime) / 1000
        const flying = ctx.getPose() === 'volant'
        let dy = 0
        const perso = ctx.sceneNodes['PersonnageVolant']
        const baseY = ctx.getPersoBaseY()
        if (perso && baseY !== null) {
            const amp = flying ? 0.18 : 0.06
            const spd = flying ? 2.2 : 1.4
            dy = Math.sin(t * spd) * amp
            perso.position.y = baseY + dy
            perso.rotation.z = Math.sin(t * 1.1) * (flying ? 0.05 : 0.02)
        }
        Object.entries(ctx.accGroups).forEach(([k, g]) => {
            if (ctx.accBaseY[k] !== undefined) (g as any).position.y = ctx.accBaseY[k] + dy
        })
        const rings = ctx.sceneNodes['AnneauxEnergie']
        if (rings?.visible && rings.children.length > 0) {
            const yBot = -0.5, yTop = 0.85, n = rings.children.length
            rings.children.forEach((r: any, i: number) => {
                const p = ((t * 0.9) + i / n) % 1
                r.position.y = yBot + (yTop - yBot) * p
                const s = 0.12 + p * 0.62; r.scale.set(s, s, s)
                r.traverse((m: any) => {
                    if (m.material) {
                        const mats = Array.isArray(m.material) ? m.material : [m.material]
                        mats.forEach((mm: any) => { mm.opacity = Math.min(1, (1 - p) * 1.6) })
                    }
                })
            })
        }
        const sys = ctx.accGroups.systeme
        if (sys?.visible) {
            sys.rotation.y = t * 0.25
            sys.userData.planets?.forEach((p: any) => {
                const a = t * p.userData.spd * 2 + p.userData.phase
                p.position.set(Math.cos(a) * p.userData.r, 0, Math.sin(a) * p.userData.r)
            })
        }
        frameId = requestAnimationFrame(tick)
    }

    return {
        start() { frameId = requestAnimationFrame(tick) },
        stop()  { cancelAnimationFrame(frameId) },
    }
}

export function buildStarfield(): Points {
    const count = 2400
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi   = Math.acos(2 * Math.random() - 1)
        const r     = 30 + Math.random() * 40
        pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        pos[i * 3 + 2] = r * Math.cos(phi)
    }
    const geo = new BufferGeometry()
    geo.setAttribute('position', new Float32BufferAttribute(pos, 3))
    return new Points(geo, new PointsMaterial({ color: '#c8d8ff', size: 0.18, sizeAttenuation: true }))
}

export function buildSocle(): Group {
    const g = new Group()
    const disc = new Mesh(new CylinderGeometry(1.9, 2.2, 0.28, 64),
        new MeshStandardMaterial({ color: '#12132a', metalness: 0.85, roughness: 0.18 }))
    disc.position.y = -0.14
    g.add(disc)
    const ringTop = new Mesh(new TorusGeometry(1.9, 0.06, 16, 64),
        new MeshStandardMaterial({ color: '#7c4dff', emissive: '#7c4dff' as any, emissiveIntensity: 1.2 }))
    ringTop.rotation.x = Math.PI / 2
    g.add(ringTop)
    const ringOuter = new Mesh(new TorusGeometry(2.2, 0.035, 12, 64),
        new MeshStandardMaterial({ color: '#14a7cc', emissive: '#14a7cc' as any, emissiveIntensity: 0.6 }))
    ringOuter.rotation.x = Math.PI / 2
    ringOuter.position.y = -0.14
    g.add(ringOuter)
    g.position.y = 0.1
    return g
}
