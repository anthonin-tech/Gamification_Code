import type { CourseModule } from '@/types/cours'

export const CURRICULUM_PHP: CourseModule[] = [
  {
    icon: '🐘',
    title: 'Fondations',
    lessons: [
      {
        title: 'Introduction à PHP',
        subtitle: 'Le langage du web côté serveur',
        type: 'theory',
        time: '8 min',
        xp: 40,
        steps: [
          {
            type: 'theory',
            title: 'PHP et le web',
            content: 'PHP (Hypertext Preprocessor) est un langage de script côté <strong>serveur</strong>. Il génère du HTML dynamiquement. Tout code PHP est entouré des balises <strong>&lt;?php</strong> et <strong>?&gt;</strong>. Les variables commencent toujours par le symbole <strong>$</strong>.',
            callout: {
              kind: 'tip',
              icon: '💡',
              title: 'PHP tourne sur le serveur',
              text: 'Contrairement à JavaScript, PHP est exécuté sur le serveur. L\'utilisateur ne voit jamais le code PHP, seulement le HTML généré.'
            },
            code: {
              filename: 'index.php',
              src: '<?php\n  $prenom = "Alice";\n  $age = 25;\n  echo "Bonjour " . $prenom . " !";\n  echo " Tu as " . $age . " ans.";\n?>'
            }
          },
          {
            type: 'quiz',
            question: 'Comment commencent les noms de variables en PHP ?',
            options: ['@', '#', '$', '&'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! En PHP, toutes les variables commencent par $.',
            errorMsg: 'En PHP, les variables commencent obligatoirement par $.'
          }
        ]
      },
      {
        title: 'Types et opérateurs',
        subtitle: 'Manipuler les données en PHP',
        type: 'theory',
        time: '10 min',
        xp: 50,
        steps: [
          {
            type: 'theory',
            title: 'Types dynamiques',
            content: 'PHP est à typage dynamique : le type d\'une variable est déterminé par sa valeur. Les types principaux sont <strong>string</strong>, <strong>int</strong>, <strong>float</strong>, <strong>bool</strong>, <strong>array</strong> et <strong>null</strong>. On peut vérifier le type avec <code>gettype()</code>.',
            code: {
              filename: 'types.php',
              src: '<?php\n$nom = "Alice";        // string\n$age = 25;             // int\n$prix = 9.99;          // float\n$actif = true;         // bool\n\necho gettype($nom);    // string\necho gettype($age);    // integer\n?>'
            }
          },
          {
            type: 'quiz',
            question: 'Quel opérateur concatène deux strings en PHP ?',
            options: ['+', '&', '.', '||'],
            correct: 2,
            xp: 15,
            successMsg: 'Exact ! Le point . est l\'opérateur de concaténation en PHP.',
            errorMsg: 'En PHP, on utilise le point . pour concaténer des strings (pas + comme en JS).'
          }
        ]
      }
    ]
  },
  {
    icon: '🌐',
    title: 'Web avec PHP',
    lessons: [
      {
        title: 'Formulaires et $_POST',
        subtitle: 'Récupérer les données d\'un formulaire',
        type: 'theory',
        time: '12 min',
        xp: 65,
        steps: [
          {
            type: 'theory',
            title: 'Superglobales',
            content: 'PHP expose des <strong>superglobales</strong> pour accéder aux données HTTP : <strong>$_POST</strong> pour les données de formulaire, <strong>$_GET</strong> pour les paramètres d\'URL, <strong>$_SESSION</strong> pour la session utilisateur. Toujours valider et sanitiser les données avant utilisation.',
            code: {
              filename: 'form.php',
              src: '<?php\nif ($_SERVER["REQUEST_METHOD"] === "POST") {\n    $nom = htmlspecialchars($_POST["nom"]);\n    echo "Bonjour, " . $nom . " !";\n}\n?>\n<form method="POST">\n    <input type="text" name="nom">\n    <button type="submit">Envoyer</button>\n</form>'
            }
          },
          {
            type: 'quiz',
            question: 'Quelle superglobale contient les données d\'un formulaire POST ?',
            options: ['$_FORM', '$_DATA', '$_POST', '$_REQUEST'],
            correct: 2,
            xp: 20,
            successMsg: 'Exact ! $_POST contient les données envoyées via la méthode POST.',
            errorMsg: 'C\'est $_POST qui contient les données d\'un formulaire envoyé en POST.'
          }
        ]
      }
    ]
  }
]
