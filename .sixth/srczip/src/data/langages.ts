import type { Planete } from "@/types/langage"

export const PLANETES: Planete[] = [
    {
        id: "web",
        nom: "Web & Front-end",
        couleur: "#29B6F6",
        taille: 26,
        vitesse: 0.32,
        orbitePct: 0.22,
        description: "Interface, sites, navigateurs",
        langages: [
            {
                nom: "JavaScript",
                sym: "JS",
                couleur: "#F7DC6F",
                annee: 1995,
                createur: "Brendan Eich",
                usage: "Front-end, Node.js, apps web",
                description: "Le langage universel du navigateur...",
                popularite: 99,
                difficulte: 40,
                liens: ["MDN Docs", "Node.js"],
                _posX: 0,
                _posY: 0,
            },
        ],
    },
]

export const TOUS_LES_LANGAGES = PLANETES.flatMap(p => p.langages.map(l => ({ ...l, planete: p }))
)



