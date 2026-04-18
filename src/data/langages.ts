import type { Langage } from "@/types/langage"

export const LANGAGES: Langage[] = [
  {
    nom: "JavaScript",
    sym: "JS",
    couleur: "#F7DC6F",
    annee: 1995,
    createur: "Brendan Eich",
    usage: "Front-end, back-end (Node.js), applications web, mobile hybride",
    description:
      "Le langage universel du navigateur. JavaScript s'est imposé comme l'un des langages les plus utilisés au monde. De la validation de formulaires aux applications temps réel, il est présent partout sur le web moderne.",
    popularite: 99,
    difficulte: 40,
    frameworks: [
      {
        nom: "React",
        sym: "Re",
        couleur: "#61DAFB",
        description:
          "Bibliothèque UI développée par Meta (Facebook). Basée sur des composants réutilisables et un DOM virtuel, React révolutionne la création d'interfaces réactives et maintenables.",
        site: "https://react.dev",
        vitesse: 0.009,
      },
      {
        nom: "Vue.js",
        sym: "V",
        couleur: "#42B883",
        description:
          "Framework progressif créé par Evan You. Connu pour sa douceur d'apprentissage, Vue combine le meilleur de React et Angular tout en restant léger et flexible.",
        site: "https://vuejs.org",
        vitesse: 0.007,
      },
      {
        nom: "Angular",
        sym: "Ng",
        couleur: "#DD0031",
        description:
          "Framework complet de Google, idéal pour les applications enterprise. Il intègre TypeScript nativement, une injection de dépendances robuste et un outillage complet.",
        site: "https://angular.dev",
        vitesse: 0.0055,
      },
      {
        nom: "Node.js",
        sym: "No",
        couleur: "#339933",
        description:
          "Environnement d'exécution JavaScript côté serveur basé sur le moteur V8 de Chrome. Permet de construire des serveurs performants et des API scalables.",
        site: "https://nodejs.org",
        vitesse: 0.004,
      },
      {
        nom: "Express",
        sym: "Ex",
        couleur: "#999999",
        description:
          "Framework web minimaliste pour Node.js. Rapide, sans opinion, il facilite la création d'API REST et d'applications web avec un maximum de liberté.",
        site: "https://expressjs.com",
        vitesse: 0.0032,
      },
    ],
  },
  {
    nom: "Python",
    sym: "Py",
    couleur: "#3776AB",
    annee: 1991,
    createur: "Guido van Rossum",
    usage: "Data science, IA/ML, back-end web, automatisation, scripting",
    description:
      "Python est célèbre pour sa syntaxe lisible et expressive. Du script d'automatisation aux modèles d'intelligence artificielle, c'est le langage de prédilection des data scientists et l'un des plus populaires au monde.",
    cours: "/cours",
    popularite: 97,
    difficulte: 25,
    frameworks: [
      {
        nom: "Django",
        sym: "Dj",
        couleur: "#2BA977",
        description:
          "Framework web full-stack Python suivant le principe « batteries incluses ». Il propose ORM, admin, authentification et bien plus out of the box.",
        site: "https://djangoproject.com",
        vitesse: 0.0085,
      },
      {
        nom: "FastAPI",
        sym: "FA",
        couleur: "#009688",
        description:
          "Framework moderne et rapide pour créer des API avec Python 3.7+. Basé sur les annotations de types, il génère automatiquement une documentation OpenAPI.",
        site: "https://fastapi.tiangolo.com",
        vitesse: 0.0065,
      },
      {
        nom: "Flask",
        sym: "Fl",
        couleur: "#A8B2D8",
        description:
          "Microframework web léger et flexible. Minimaliste par nature, Flask vous laisse choisir vos outils et convient parfaitement aux petites API et aux prototypes.",
        site: "https://flask.palletsprojects.com",
        vitesse: 0.005,
      },
      {
        nom: "TensorFlow",
        sym: "TF",
        couleur: "#FF6F00",
        description:
          "Plateforme open-source de machine learning développée par Google. Utilisée pour entraîner et déployer des modèles de deep learning à grande échelle.",
        site: "https://tensorflow.org",
        vitesse: 0.0038,
      },
    ],
  },
  {
    nom: "TypeScript",
    sym: "TS",
    couleur: "#3178C6",
    annee: 2012,
    createur: "Anders Hejlsberg (Microsoft)",
    usage: "Front-end, back-end, applications scalables, grandes équipes",
    description:
      "Sur-ensemble typé de JavaScript développé par Microsoft. TypeScript ajoute un système de types statiques optionnel qui améliore la maintenabilité, réduit les bugs et offre une meilleure expérience de développement.",
    popularite: 80,
    difficulte: 50,
    frameworks: [
      {
        nom: "NestJS",
        sym: "Ns",
        couleur: "#E0234E",
        description:
          "Framework back-end TypeScript progressif, inspiré d'Angular. Il utilise des décorateurs pour créer des API modulaires, testables et scalables.",
        site: "https://nestjs.com",
        vitesse: 0.009,
      },
      {
        nom: "Next.js",
        sym: "Nx",
        couleur: "#AAAAAA",
        description:
          "Framework React full-stack créé par Vercel. Il propose le rendu côté serveur (SSR), la génération statique (SSG) et les routes API dans un seul projet.",
        site: "https://nextjs.org",
        vitesse: 0.007,
      },
      {
        nom: "Nuxt.js",
        sym: "Nu",
        couleur: "#00DC82",
        description:
          "Framework Vue.js full-stack avec rendu serveur, routage automatique et modules intégrés. L'équivalent de Next.js pour l'écosystème Vue.",
        site: "https://nuxt.com",
        vitesse: 0.0055,
      },
      {
        nom: "Prisma",
        sym: "Pr",
        couleur: "#5A67D8",
        description:
          "ORM moderne pour TypeScript et Node.js. Il simplifie les requêtes SQL avec une API type-safe intuitive et génère automatiquement les types depuis votre schéma.",
        site: "https://prisma.io",
        vitesse: 0.004,
      },
    ],
  },
  {
    nom: "Java",
    sym: "Jv",
    couleur: "#b07219",
    annee: 1995,
    createur: "James Gosling (Sun Microsystems)",
    usage: "Applications enterprise, back-end, Android, systèmes distribués",
    description:
      "Langage orienté objet robuste et portable. Java suit le principe « Write Once, Run Anywhere » grâce à la JVM. Il domine les architectures microservices enterprise et l'écosystème Android.",
    popularite: 88,
    difficulte: 55,
    frameworks: [
      {
        nom: "Spring",
        sym: "Sp",
        couleur: "#6DB33F",
        description:
          "Le framework Java enterprise le plus populaire. Spring Boot simplifie la création d'applications autonomes avec une configuration minimale et un écosystème riche.",
        site: "https://spring.io",
        vitesse: 0.0085,
      },
      {
        nom: "Hibernate",
        sym: "Hi",
        couleur: "#A9813E",
        description:
          "Framework ORM (Object-Relational Mapping) pour Java. Il gère la persistance des données en mappant les objets Java aux tables de base de données relationnelle.",
        site: "https://hibernate.org",
        vitesse: 0.0065,
      },
      {
        nom: "Quarkus",
        sym: "Qk",
        couleur: "#4695EB",
        description:
          "Framework Java conçu pour les conteneurs et les architectures cloud-native. Il offre des démarrages ultra-rapides et une empreinte mémoire réduite.",
        site: "https://quarkus.io",
        vitesse: 0.0048,
      },
      {
        nom: "Maven",
        sym: "Mv",
        couleur: "#C71A36",
        description:
          "Outil de build et gestionnaire de dépendances Java. Maven automatise la compilation, les tests et le déploiement via un système de conventions et de plugins.",
        site: "https://maven.apache.org",
        vitesse: 0.0035,
      },
    ],
  },
  {
    nom: "PHP",
    sym: "PHP",
    couleur: "#787CB5",
    annee: 1994,
    createur: "Rasmus Lerdorf",
    usage: "Développement web côté serveur, CMS, APIs, e-commerce",
    description:
      "PHP propulse plus de 75% du web mondial. Facile à déployer et très répandu, il reste le langage de référence pour le développement web serveur, notamment grâce à des frameworks modernes comme Laravel.",
    popularite: 78,
    difficulte: 35,
    frameworks: [
      {
        nom: "Laravel",
        sym: "La",
        couleur: "#FF2D20",
        description:
          "Le framework PHP le plus populaire. Laravel offre une syntaxe élégante, un ORM puissant (Eloquent), un système de templates (Blade) et une foule d'outils intégrés.",
        site: "https://laravel.com",
        vitesse: 0.009,
      },
      {
        nom: "Symfony",
        sym: "Sy",
        couleur: "#8892BF",
        description:
          "Framework PHP enterprise modulaire et robuste. Symfony est la base de nombreux projets majeurs et fournit des composants réutilisables adoptés par d'autres frameworks.",
        site: "https://symfony.com",
        vitesse: 0.007,
      },
      {
        nom: "WordPress",
        sym: "WP",
        couleur: "#21759B",
        description:
          "Le CMS le plus utilisé au monde, construit sur PHP. WordPress propulse plus de 40% des sites web et dispose d'un immense écosystème de plugins et thèmes.",
        site: "https://wordpress.org",
        vitesse: 0.0052,
      },
    ],
  },
  {
    nom: "Go",
    sym: "Go",
    couleur: "#00ADD8",
    annee: 2009,
    createur: "Rob Pike & Ken Thompson (Google)",
    usage: "Microservices, systèmes distribués, CLI, DevOps, cloud",
    description:
      "Langage compilé conçu par Google pour la performance et la simplicité. Go excelle dans les systèmes distribués et les microservices grâce à ses goroutines légères et sa compilation ultra-rapide.",
    popularite: 65,
    difficulte: 45,
    frameworks: [
      {
        nom: "Gin",
        sym: "Gi",
        couleur: "#00BCD4",
        description:
          "Le framework web Go le plus rapide et le plus adopté. Gin offre une API claire, un routing performant et un middleware system extensible.",
        site: "https://gin-gonic.com",
        vitesse: 0.009,
      },
      {
        nom: "Echo",
        sym: "Ec",
        couleur: "#00ACC1",
        description:
          "Framework HTTP Go haute performance avec un focus sur la simplicité. Echo propose un routing rapide, un middleware intégré et une documentation claire.",
        site: "https://echo.labstack.com",
        vitesse: 0.007,
      },
      {
        nom: "Fiber",
        sym: "Fb",
        couleur: "#00E5FF",
        description:
          "Framework web Go inspiré d'Express.js, connu pour ses performances exceptionnelles. Idéal pour les développeurs venant de Node.js qui veulent la vitesse de Go.",
        site: "https://gofiber.io",
        vitesse: 0.0052,
      },
      {
        nom: "GORM",
        sym: "Gm",
        couleur: "#26C6DA",
        description:
          "ORM complet pour Go, inspiré d'Active Record. GORM gère les associations, les migrations, les transactions et supporte MySQL, PostgreSQL, SQLite et SQL Server.",
        site: "https://gorm.io",
        vitesse: 0.004,
      },
    ],
  },
  {
    nom: "C++",
    sym: "C++",
    couleur: "#093eef",
    annee: 1983,
    createur: "Bjarne Stroustrup",
    usage: "Système, jeux vidéos, embarqué, performance",
    description:
      "C++ est un langage puissant orienté objet offrant un contrôle bas niveau sur la mémoire. Il est incontournable dans les moteurs de jeux vidéo, les systèmes embarqués et les applications nécessitant des performances maximales.",
    popularite: 48,
    difficulte: 80,
    frameworks: [
      {
        nom: "Qt",
        sym: "Qt",
        couleur: "#41CD52",
        description:
          "Framework multiplateforme majeur pour les interfaces graphiques et les applications desktop. Qt est très utilisé dans l'embarqué, l'automobile et les outils professionnels.",
        site: "https://www.qt.io",
        vitesse: 0.0085,
      },
      {
        nom: "Unreal Engine",
        sym: "UE",
        couleur: "#0E1128",
        description:
          "Moteur de jeu AAA écrit en grande partie en C++. Il permet de développer des jeux haute fidélité, des simulations temps réel et des expériences 3D avancées.",
        site: "https://www.unrealengine.com",
        vitesse: 0.0068,
      },
      {
        nom: "Boost",
        sym: "Bs",
        couleur: "#F7901E",
        description:
          "Collection de bibliothèques C++ très influente, couvrant les conteneurs, la programmation générique, le multithreading et bien plus. Elle a inspiré plusieurs standards du langage.",
        site: "https://www.boost.org",
        vitesse: 0.0052,
      },
      {
        nom: "SFML",
        sym: "SF",
        couleur: "#8CC445",
        description:
          "Bibliothèque simple et moderne pour les jeux 2D, le multimédia et le rendu graphique. Elle est souvent choisie pour apprendre la programmation graphique en C++.",
        site: "https://www.sfml-dev.org",
        vitesse: 0.0038,
      },
    ]
  },
  {
    nom: "Rust",
    sym: "Rs",
    couleur: "#fbd491",
    annee: 2015,
    createur: "Graydon Hoare",
    usage: "Système, WebAssembly, sécurité mémoire",
    description:
      "Rust est un langage de programmation système moderne qui garantit la sécurité mémoire sans ramasse-miettes. Il offre les performances du C/C++ avec des garanties de sûreté at compile-time, idéal pour les systèmes critiques.",
    popularite: 18,
    difficulte: 75,
    frameworks: [
      {
        nom: "Actix Web",
        sym: "Aw",
        couleur: "#5C2D91",
        description:
          "Framework web Rust ultra-performant, réputé pour son throughput élevé et son modèle d'acteurs. Très apprécié pour les API backend exigeantes.",
        site: "https://actix.rs",
        vitesse: 0.0088,
      },
      {
        nom: "Rocket",
        sym: "Ro",
        couleur: "#D33847",
        description:
          "Framework web ergonomique centré sur la sécurité et l'expérience développeur. Rocket mise sur une API expressive et des garanties fortes à la compilation.",
        site: "https://rocket.rs",
        vitesse: 0.0064,
      },
      {
        nom: "Axum",
        sym: "Ax",
        couleur: "#7C3AED",
        description:
          "Framework web moderne basé sur l'écosystème Tokio. Axum est devenu un choix solide pour les services async Rust et les architectures API contemporaines.",
        site: "https://github.com/tokio-rs/axum",
        vitesse: 0.0051,
      },
      {
        nom: "Bevy",
        sym: "Bv",
        couleur: "#232326",
        description:
          "Moteur de jeu data-driven construit en Rust. Bevy combine un ECS moderne, un rendu temps réel et une architecture modulaire très attractive pour les projets nouvelle génération.",
        site: "https://bevyengine.org",
        vitesse: 0.0037,
      },
    ]
  },
  {
    nom: "C#",
    sym: "C#",
    couleur: "#15eb0e",
    annee: 2000,
    createur: "Anders Hejlsberg",
    usage: "Back-end, jeux (Unity), apps Windows",
    description:
      "C# est un langage orienté objet moderne développé par Microsoft pour la plateforme .NET. Il est incontournable pour le développement d'applications Windows, de jeux Unity et d'applications web avec ASP.NET.",
    popularite: 42,
    difficulte: 50,
    frameworks: [
      {
        nom: "ASP.NET Core",
        sym: "AS",
        couleur: "#512BD4",
        description:
          "Framework web moderne et cross-platform pour construire des API, applications MVC et services temps réel. C'est la référence pour le backend en C#.",
        site: "https://dotnet.microsoft.com/apps/aspnet",
        vitesse: 0.0089,
      },
      {
        nom: "Blazor",
        sym: "Bl",
        couleur: "#7C4DFF",
        description:
          "Framework UI permettant de créer des interfaces web interactives en C# au lieu de JavaScript. Il peut fonctionner côté serveur ou dans le navigateur via WebAssembly.",
        site: "https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor",
        vitesse: 0.0066,
      },
      {
        nom: "Unity",
        sym: "Un",
        couleur: "#111111",
        description:
          "Moteur de jeu extrêmement populaire utilisant C# comme langage principal de scripting. Il est utilisé pour les jeux 2D, 3D, mobiles, VR et AR.",
        site: "https://unity.com",
        vitesse: 0.0054,
      },
      {
        nom: "Entity Framework",
        sym: "EF",
        couleur: "#68217A",
        description:
          "ORM officiel de l'écosystème .NET. Il simplifie l'accès aux données avec LINQ, migrations et génération de modèles, très utile pour les applications métier.",
        site: "https://learn.microsoft.com/ef/",
        vitesse: 0.0039,
      },
    ]
  }
]
