# Assemblée de Dieu — Portail Vivant & Écosystème Communautaire

Une application web dynamique, chaleureuse et spirituelle conçue pour l'Église des Assemblées de Dieu, enracinée dans son héritage historique et doctrinal authentique (les 4 Vérités Fondamentales pentecôtistes), dotée d'une identité graphique unique et d'outils interactifs modernes pour les fidèles et visiteurs.

### User Review & Critical Decisions

> [!IMPORTANT]
> **Identité de marque & Logo Unique** : Nous avons conçu une identité visuelle vectorielle originale intégrant les trois symboles emblématiques de l'Assemblée de Dieu : la Croix centrale (salut et rédemption), la Bible ouverte (autorité des Écritures), et la Flamme trine de la Pentecôte (baptême du Saint-Esprit), fondus dans une forme géométrique contemporaine en médaillon d'or et de bleu saphir profond.
>
> **Choix de la langue & Réalisme institutionnel** : L'interface est entièrement en français soigné, inspirée de la structure organisationnelle réelle des Assemblées de Dieu (JAD - Jeunesse, ECODIM - École du Dimanche, Action des Femmes Dorcas, Hommes d'Honneur, Évangélisation & Missions).

- **Décision confirmée 1** : Application complète dynamique en français avec identité institutionnelle, programmes hebdomadaires réels, méditation quotidienne, lecteur de prédications et mur d'intercession.
- **Décision confirmée 2** : Logo unique sur-mesure vectoriel haute définition (accessible, téléchargeable et intégré dans la navigation et les bannières).
- **Option par défaut recommandée** : Persistance locale via `localStorage` pour les requêtes de prières, favoris bibliques, cantiques enregistrés et historique de dons pour assurer un fonctionnement immédiat sans friction.

---

### 1. Overview & Core Concept

- **Ce que fait l'application** : Un hub numérique communautaire pour l'église locale des Assemblées de Dieu. Elle permet aux fidèles d'écouter les prédications avec notes synchronisées, de consulter le verset et la méditation du jour (« Pain Vivant »), de participer au mur de prières interactif avec compteur d'intercession, d'explorer les départements et ministères (JAD, ECODIM, Femmes, Hommes, Chorale), de simuler et planifier leurs dons/dîmes avec reçu instantané, et de rechercher des cantiques traditionnels et contemporains.
- **Public cible** : Fidèles de la communauté, nouveaux visiteurs en quête d'un lieu de culte, jeunesse chrétienne, responsables de ministères et pasteurs.
- **Valeur clé** : Rendre la vie d'église accessible 7j/7 avec dignité liturgique, modernité technique et chaleur fraternelle.

---

### 2. User Experience & Visual Design

Conforme aux directives d'excellence du design institutionnel et éditorial (*Museum, Editorial & Institutional Constitution*) :

- **Direction Esthétique** : Élégance éditoriale sacrée contemporaine. Alliance de dignité, de clarté lumineuse et de solennité chaleureuse sans surcharge ni artificialité.
- **Palette de Couleurs & Atmosphère (Règle 60-30-10)** :
  - *60% Toile neutre dominante* : Albâtre chaud et papier parchemin d'archive (`#FBF9F5` / `#F8F6F0` en mode clair, ardoise nocturne profonde `#0F172A` / `#090D16` en mode sombre).
  - *30% Surfaces structurelles* : Blanc pur feutré (`#FFFFFF`), bordures déliées 1px (`#E7E2DA`), cartes en pierre douce.
  - *10% Accents sacrés* : Bleu saphir liturgique profond (`#1E3A8A` / `#1D4ED8`) et Or céleste brossé (`#D97706` / `#B45309`), symbolisant la majesté divine et le feu de l'Esprit.
- **Typographie & Hiérarchie (Règle 2+1)** :
  - *Display / Titres* : `Cinzel` ou `Playfair Display` pour les grands titres bibliques et bannières institutionnelles (caractère noble et intemporel).
  - *Corps de texte* : `Plus Jakarta Sans` ou `Source Serif 4` pour une lecture fluide et reposante des textes bibliques et annonces.
  - *Données & Références* : Numéraux tabulaires (`tabular-nums`) pour les références bibliques, heures de culte et dons.
- **Logo Unique Assemblée de Dieu** :
  - Monogramme et sceau symbolique stylisé : Arche de lumière, Sainte Bible ouverte à la base, Croix centrale élancée, et Colombe/Flamme d'or s'élevant vers le ciel.
  - Rendu en SVG pur haute précision avec reflets dorés, décliné en version complète (emblème + lettrage) et icône compacte pour le favicon et la barre de navigation.
- **Top Bar Contract** :
  - Strictement 3 zones sur une seule ligne :
    - *Zone 1 (Marque)* : Logo emblème SVG avec le nom « Assemblée de Dieu ».
    - *Zone 2 (Navigation)* : Liens textuels épurés avec survol discret (`Accueil`, `Prédications`, `Prières`, `Ministères`, `Cantiques`, `Dons`).
    - *Zone 3 (Action principale)* : Bouton d'action directe « Horaires des Cultes » ou « Faire un Don ».

---

### 3. Key Product Decisions & Trade-Offs

- **Lecteur de Prédications Multimédia** :
  - *Approche* : Lecteur audio/vidéo simulé interactif avec contrôle de vitesse (1x, 1.25x, 1.5x), barre de progression, transcription interactive par marqueurs temporels et prise de notes intégrée téléchargeable.
  - *Bénéfice* : Permet d'étudier la Parole activement en semaine comme lors du culte de dimanche.
- **Mur de Prière & Intercession Vivante** :
  - *Approche* : Système de dépôt de requêtes anonymes ou signées avec catégorisation (Santé, Famille, Foi, Sanctification, Action de grâce) et bouton interactif « J'ai prié pour cette intention » qui incrémente un compteur d'intercession en direct avec animation bienveillante.
  - *Alternative écartée* : Espace de discussion non modéré (risque de spam ou dérive).
- **Les 4 Vérités Fondamentales des Assemblées de Dieu** :
  - *Approche* : Section interactive dédiée présentant clairement les piliers historiques mondiaux : 1. Jésus Sauveur, 2. Jésus Guérisseur, 3. Jésus Baptiseur du Saint-Esprit, 4. Jésus Roi qui revient, avec versets bibliques de référence en plein texte (Jean 3:16, Ésaïe 53:4-5, Actes 2:4, 1 Thessaloniciens 4:16-17).
- **Recueil de Cantiques & Louanges** :
  - *Approche* : Bibliothèque navigable de chants pentecôtistes classiques (ex: « Sur les ailes de la foi », cantiques de réveil) et contemporains avec paroles complètes, transposition de tonalité et recherche par titre ou mot-clé.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ASSEMBLÉE DE DIEU APP                           │
├──────────────────────────────────┬─────────────────────────────────────┤
│ Top Navigation & Brand Bar       │ Unique SVG Logo + Nav + Cultes CTA │
├──────────────────────────────────┴─────────────────────────────────────┤
│ Viewport Views (Tabbed & Sticky Router State):                         │
│                                                                        │
│ ┌───────────────────────────┐  ┌─────────────────────────────────────┐ │
│ │ 01. Accueil & Culte       │  │ 02. Prédications & Enseignements    │ │
│ │ • Hero Céleste & Prochain │  │ • Player audio avec timeline        │ │
│ │   Culte (Compte à rebours)│  │ • Transcription synchrone           │ │
│ │ • 4 Vérités Fondamentales │  │ • Prise de notes & export texte     │ │
│ │ • Verset & Pain Vivant    │  └─────────────────────────────────────┘ │
│ └───────────────────────────┘  ┌─────────────────────────────────────┐ │
│ ┌───────────────────────────┐  │ 04. Ministères & Départements       │ │
│ │ 03. Mur d'Intercession    │  │ • JAD (Jeunesse), ECODIM (Enfants)  │ │
│ │ • Dépôt de requête        │  │ • Dorcas (Femmes), Hommes d'Honneur │ │
│ │ • Filtres thématiques     │  │ • Missions & Chorale                │ │
│ │ • Compteur "Je prie" (LS) │  └─────────────────────────────────────┘ │
│ └───────────────────────────┘  ┌─────────────────────────────────────┐ │
│ ┌───────────────────────────┐  │ 06. Espace Dons & Dîmes             │ │
│ │ 05. Recueil de Cantiques  │  │ • Simulateur offrandes & missions   │ │
│ │ • Paroles & Transposition │  │ • Générateur de reçu fiscal / pdf   │ │
│ │ • Recherche par strophe   │  │ • Méthodes locales (MoMo, Virement) │ │
│ └───────────────────────────┘  └─────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────┤
│ Client State Store (localStorage: Prières, Notes, Favoris, Dons)       │
└────────────────────────────────────────────────────────────────────────┘
```

- **Modèle de Données Local** :
  - `PrayerRequest` : `{ id, author, category, text, prayerCount, timestamp, isAnonymous }`
  - `Sermon` : `{ id, title, preacher, date, scripture, audioUrl, duration, transcript, series }`
  - `Ministry` : `{ id, name, acronym, leader, schedule, mission, contact }`
  - `Hymn` : `{ number, title, collection, key, verses, chorus }`
  - `DailyDevotional` : `{ date, title, scriptureReference, scriptureText, meditation, prayer }`
- **Gestion des interactions** : Chaque formulaire (dépôt de prière, prise de notes, simulateur de don, filtres de cantiques) dispose d'une validation rigoureuse, d'un retour visuel instantané et d'une persistance locale sans faille.
