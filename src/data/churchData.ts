/**
 * Données réelles et authentiques pour l'Église des Assemblées de Dieu
 * Inspirées des 4 Vérités Fondamentales, de la structure internationale des AD
 * et des recueils liturgiques traditionnels ("Sur les Ailes de la Foi").
 */

export interface Doctrine {
  id: string;
  title: string;
  subtitle: string;
  scriptureRef: string;
  scriptureText: string;
  description: string;
  symbol: 'cross' | 'flame' | 'dove' | 'crown';
}

export interface Sermon {
  id: string;
  title: string;
  series: string;
  preacher: string;
  date: string;
  scripture: string;
  durationMinutes: number;
  summary: string;
  transcript: { time: string; text: string }[];
  audioSampleUrl?: string;
  category: 'Foi' | 'Saint-Esprit' | 'Famille' | 'Évangélisation' | 'Sanctification';
}

export interface Ministry {
  id: string;
  name: string;
  acronym: string;
  target: string;
  leader: string;
  schedule: string;
  mission: string;
  activities: string[];
  motto: string;
}

export interface Hymn {
  id: number;
  number: number;
  title: string;
  collection: string;
  key: string;
  theme: string;
  chorus?: string;
  verses: string[];
}

export interface PrayerItem {
  id: string;
  author: string;
  location?: string;
  category: 'Santé' | 'Famille' | 'Travail & Projets' | 'Délivrance & Foi' | 'Action de Grâce';
  content: string;
  date: string;
  prayerCount: number;
  isAnonymous: boolean;
}

export interface DailyDevotional {
  date: string;
  title: string;
  scriptureRef: string;
  scriptureText: string;
  reflection: string;
  prayer: string;
  declaration: string;
}

export const DOCTRINES: Doctrine[] = [
  {
    id: 'salvation',
    title: 'Le Salut en Jésus-Christ',
    subtitle: 'La Première Vérité Fondamentale',
    scriptureRef: 'Romains 10:9-10 · Jean 3:16',
    scriptureText: '« Car Dieu a tant aimé le monde qu’il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu’il ait la vie éternelle. »',
    description: 'Le salut de l’homme est accordé par la grâce divine au moyen de la foi dans le sang versé de Jésus-Christ. Il comprend la régénération par le Saint-Esprit, la justification devant Dieu et l’adoption dans la famille céleste.',
    symbol: 'cross',
  },
  {
    id: 'holy-spirit',
    title: 'Le Baptême dans le Saint-Esprit',
    subtitle: 'La Promesse du Père & Le Témoignage',
    scriptureRef: 'Actes 1:8 · Actes 2:4',
    scriptureText: '« Mais vous recevrez une puissance, le Saint-Esprit survenant sur vous, et vous serez mes témoins... jusqu’aux extrémités de la terre. »',
    description: 'Distinct de la nouvelle naissance, le baptême dans le Saint-Esprit confère la puissance pour le témoignage et le ministère chrétien. Son signe biblique initial est le parler en d’autres langues selon que l’Esprit donne de s’exprimer.',
    symbol: 'flame',
  },
  {
    id: 'divine-healing',
    title: 'La Guérison Divine',
    subtitle: 'Un Privilège de l’Expiation',
    scriptureRef: 'Ésaïe 53:4-5 · Jacques 5:14-15',
    scriptureText: '« C’est par ses meurtrissures que nous sommes guéris. Quelqu’un parmi vous est-il malade ? Qu’il appelle les anciens de l’Église. »',
    description: 'La délivrance de la maladie physique et de l’affliction est pourvue dans le sacrifice expiatoire de Christ à la croix et demeure un privilège accordé à tous les croyants par la prière de la foi.',
    symbol: 'dove',
  },
  {
    id: 'second-coming',
    title: 'Le Retour Glorieux de Christ',
    subtitle: 'La Bienheureuse Espérance',
    scriptureRef: '1 Thessaloniciens 4:16-17 · Tite 2:13',
    scriptureText: '« Car le Seigneur lui-même, à un signal donné, à la voix d’un archange, et au son de la trompette de Dieu, descendra du ciel. »',
    description: 'La résurrection de ceux qui sont morts en Christ et leur enlèvement avec les vivants pour rencontrer le Seigneur dans les airs constituent l’espérance vivante et imminente de l’Église des Assemblées de Dieu.',
    symbol: 'crown',
  },
];

export const MINISTRIES: Ministry[] = [
  {
    id: 'jad',
    name: 'Jeunesse des Assemblées de Dieu',
    acronym: 'J.A.D.',
    target: 'Adolescents et jeunes adultes (13 à 30 ans)',
    leader: 'Pasteur de jeunesse & Bureau JAD',
    schedule: 'Chaque samedi à 16h00',
    mission: 'Former une génération sanctifiée, enracinée dans la Parole de Dieu et zélée pour la proclamation de l’Évangile dans les lycées, universités et milieux professionnels.',
    activities: [
      'Camp national et retraites spirituelles',
      'Ateliers d’orientation de carrière et d’éthique chrétienne',
      'Évangélisation urbaine et concerts de louange',
      'Groupes de maison et cercles de partage biblique',
    ],
    motto: '« Que personne ne méprise ta jeunesse, mais sois un modèle pour les fidèles » — 1 Timothée 4:12',
  },
  {
    id: 'dorcas',
    name: 'Action des Femmes (Ministère Dorcas)',
    acronym: 'A.F.A.D.',
    target: 'Toutes les femmes, mères et jeunes filles',
    leader: 'Sœur Diaconesse & Équipe dirigeante',
    schedule: 'Chaque jeudi après-midi à 16h30',
    mission: 'Affermir le rôle spirituel, familial et social de la femme vertueuse selon Proverbes 31, et soutenir les veuves, orphelins et nécessiteux.',
    activities: [
      'Intercession hebdomadaire pour les foyers et les nations',
      'Assistance sociale et visites aux malades',
      'Séminaires sur l’édification du couple et l’éducation des enfants',
      'Projets d’entraide et de micro-projets solidaires',
    ],
    motto: '« La femme qui craint l’Éternel est celle qui sera louée » — Proverbes 31:30',
  },
  {
    id: 'hommes',
    name: 'Fraternité des Hommes d’Honneur',
    acronym: 'H.O.D.',
    target: 'Pères de famille, époux et hommes de l’assemblée',
    leader: 'Ancien de l’Église & Comité des Hommes',
    schedule: 'Un samedi sur deux à 07h00 (Petit-déjeuner de prière)',
    mission: 'Éveiller et équiper les hommes pour qu’ils assument pleinement leur sacerdoce spirituel au sein de leur maison, de l’église et de la société.',
    activities: [
      'Petits-déjeuners de prière et d’intercession fraternelle',
      'Conférences sur l’intégrité financière et le leadership serviteur',
      'Travaux d’entretien bénévole du sanctuaire',
      'Mentorat pour les jeunes hommes et futurs fiancés',
    ],
    motto: '« Moi et ma maison, nous servirons l’Éternel » — Josué 24:15',
  },
  {
    id: 'ecodim',
    name: 'École du Dimanche (Département Enfants)',
    acronym: 'ECODIM',
    target: 'Enfants de 3 à 12 ans',
    leader: 'Moniteurs et monitrices agréés',
    schedule: 'Chaque dimanche matin pendant le culte (08h30 & 11h15)',
    mission: 'Poser les fondements immuables de la foi chrétienne dans le cœur des tout-petits par des récits bibliques vivants, des chants et des activités créatives.',
    activities: [
      'Leçons bibliques illustrées adaptées par tranches d’âge',
      'Mémorisation guidée des versets clés',
      'Pièces de théâtre et chants pour les fêtes de Noël et Pâques',
      'Ateliers d’obéissance, de prière et de communion fraternelle',
    ],
    motto: '« Instruis l’enfant selon la voie qu’il doit suivre ; et quand il sera vieux, il ne s’en détournera pas » — Proverbes 22:6',
  },
  {
    id: 'louange',
    name: 'Département de Louange & Chorale',
    acronym: 'D.L.C.',
    target: 'Chantres, musiciens et techniciens audiovisuels',
    leader: 'Conducteur de louange & Chef de chœur',
    schedule: 'Répétitions vendredi à 17h00 et samedi à 18h00',
    mission: 'Conduire le peuple de Dieu dans la présence du Seigneur à travers une adoration fervente, théocentrique et spirituelle.',
    activities: [
      'Animation des cultes dominicaux et veillées d’intercession',
      'Formation vocale et perfectionnement instrumental',
      'Composition de cantiques inspirés pour l’assemblée',
      'Temps de sanctification et de jeûne communautaire',
    ],
    motto: '« Dieu est Esprit, et il faut que ceux qui l’adorent l’adorent en esprit et en vérité » — Jean 4:24',
  },
  {
    id: 'missions',
    name: 'Département des Missions & Évangélisation',
    acronym: 'D.M.E.',
    target: 'Tous les membres engagés dans la Grande Commission',
    leader: 'Pasteur missionnaire & Équipe d’impact',
    schedule: 'Actions sur le terrain les mercredis et samedis',
    mission: 'Obéir au mandat suprême de Christ en implantant de nouvelles assemblées et en envoyant des missionnaires dans les zones non atteintes.',
    activities: [
      'Sorties d’évangélisation en plein air et distribution de traités',
      'Soutien financier et prière pour les missionnaires pionniers',
      'Semaine missionnaire annuelle avec collecte dédiée',
      'Accompagnement des nouveaux convertis vers le baptême d’eau',
    ],
    motto: '« Allez, faites de toutes les nations des disciples » — Matthieu 28:19',
  },
];

export const SERMONS: Sermon[] = [
  {
    id: 'sermon-1',
    title: 'La Puissance de la Résurrection et du Saint-Esprit',
    series: 'La Puissance du Ressuscité',
    preacher: 'Pasteur AMOUZOU',
    date: '25 Octobre 2026',
    scripture: 'Actes 1:4-8 · Philippiens 3:10',
    durationMinutes: 48,
    category: 'Saint-Esprit',
    summary: 'Une proclamation vibrante du Pasteur AMOUZOU au Temple de la Résurrection sur la puissance de vie qui a ressuscité Christ d’entre les morts et qui renouvelle notre quotidien à Adamavo.',
    transcript: [
      { time: '00:00', text: 'Introduction pastorale par le Pasteur AMOUZOU et lecture solennelle du texte de Philippiens 3:10.' },
      { time: '08:30', text: 'Première partie : Connaître Christ et la puissance de sa résurrection — au-delà de la religion.' },
      { time: '19:45', text: 'Deuxième partie : Le vent impétueux et les langues de feu — l’effusion pentecôtiste pour chaque foyer.' },
      { time: '32:10', text: 'Troisième partie : LaHardiesse du disciple régénéré dans la cité de Lomé.' },
      { time: '41:20', text: 'Appel solennel à l’autel pour la délivrance, la guérison et le baptême dans le Saint-Esprit.' },
    ],
  },
  {
    id: 'sermon-2',
    title: 'La Croix : Fondement Inébranlable de Notre Justification',
    series: 'Les Vérités Fondamentales',
    preacher: 'Pasteur AMOUZOU',
    date: '18 Octobre 2026',
    scripture: 'Romains 5:1-11 · Galates 2:20',
    durationMinutes: 42,
    category: 'Foi',
    summary: 'Rappel puissant de la grâce inconditionnelle reçue au Golgotha. Nous ne sommes pas sauvés par nos mérites, mais par la substitution parfaite de Jésus-Christ.',
    transcript: [
      { time: '00:00', text: 'Ouverture du culte et rappel de la justice par la foi.' },
      { time: '11:15', text: 'L’incompatibilité entre légalisme et grâce souveraine.' },
      { time: '24:00', text: 'La paix avec Dieu : un acquis éternel scellé par le sang de l’Agneau.' },
      { time: '36:40', text: 'Consécration personnelle et prière d’action de grâce.' },
    ],
  },
  {
    id: 'sermon-3',
    title: 'Dieu Qui Guérit : S’Emparer des Promesses dans l’Épreuve',
    series: 'Miracles & Compassion Divine',
    preacher: 'Pasteur AMOUZOU',
    date: '11 Octobre 2026',
    scripture: 'Jacques 5:13-16 · Marc 16:17-18',
    durationMinutes: 45,
    category: 'Foi',
    summary: 'Comment s’approcher du trône de la grâce avec foi face à la maladie physique ou l’oppression morale, et vivre l’onction d’huile selon les ordonnances du Nouveau Testament.',
    transcript: [
      { time: '00:00', text: 'Témoignage introductif d’une sœur guérie d’une affection chronique.' },
      { time: '14:20', text: 'L’expiation totale : Christ a porté nos douleurs et nos maladies.' },
      { time: '28:50', text: 'Le rôle de l’onction d’huile et de la prière fervente des anciens.' },
      { time: '39:00', text: 'Ministère de prière pour les malades présents dans le sanctuaire.' },
    ],
  },
  {
    id: 'sermon-4',
    title: 'Veillez et Priez : L’Imminence du Retour du Seigneur',
    series: 'L’Espérance Céleste',
    preacher: 'Ancien Michel Boni',
    date: '04 Octobre 2026',
    scripture: '1 Thessaloniciens 5:1-11 · Matthieu 25:1-13',
    durationMinutes: 51,
    category: 'Sanctification',
    summary: 'Méditation eschatologique sur la parabole des dix vierges. L’importance de maintenir nos lampes remplies de l’huile du Saint-Esprit alors que la nuit avance.',
    transcript: [
      { time: '00:00', text: 'Les signes prophétiques des temps de la fin.' },
      { time: '16:00', text: 'La différence entre la lampe extérieure et la réserve intérieure d’huile.' },
      { time: '31:25', text: 'Vivre avec l’éternité en perspective dans nos choix quotidiens.' },
      { time: '44:10', text: 'Prière de réveil et de sanctification pour l’assemblée.' },
    ],
  },
];

export const HYMNS: Hymn[] = [
  {
    id: 1,
    number: 124,
    title: 'Quel ami fidèle et tendre',
    collection: 'Sur les Ailes de la Foi',
    key: 'Fa Majeur (F)',
    theme: 'Prière & Confiance',
    chorus: 'Quel ami fidèle et tendre nous avons en Jésus-Christ, toujours prêt à nous entendre, à répondre à notre cri !',
    verses: [
      'Quel ami fidèle et tendre nous avons en Jésus-Christ, toujours prêt à nous entendre, à répondre à notre cri ! Il connaît nos défaillances, nos fardeaux de chaque jour ; il guérit nos souffrances, par son immortel amour.',
      'S’il survient quelque détresse, si l’épreuve est sur nos pas, cherchons sa douce tendresse, car Jésus ne faillit pas. S’il arrive qu’un faux frère nous délaisse en chemin, sa parole nous éclaire, et sa force nous soutient.',
      'Jésus seul est notre joie, notre bouclier, notre espérance ; il a tracé notre voie par sa sainte obéissance. Dans les combats de la vie, sachons nous confier en lui ; son bras ne nous trahit mie, il demeure notre appui.',
    ],
  },
  {
    id: 2,
    number: 218,
    title: 'Torrents d’amour et de grâce',
    collection: 'Sur les Ailes de la Foi',
    key: 'Sol Majeur (G)',
    theme: 'Salut & Justification',
    chorus: 'Torrents d’amour et de grâce, amour plus vaste que la mer ! Que tout mon être s’efface pour faire place à Jésus cher.',
    verses: [
      'Torrents d’amour et de grâce, amour plus vaste que la mer ! Que tous nos péchés s’effacent dans le sang du Sauveur cher. Jésus sur la croix sanglante a tout payé pour nos cœurs ; son obéissance constante nous délivre des douleurs.',
      'Consécration volontaire, je m’abandonne à tes pieds ; brise en moi tout ce qui altère tes desseins si purs, si vrais. Fais de moi un instrument purifié par le feu, témoignant fidèlement de la puissance de Dieu.',
      'Bientôt viendra la victoire, nous serons auprès de toi, contemplant toute ta gloire, dans l’allégresse et la foi.',
    ],
  },
  {
    id: 3,
    number: 314,
    title: 'J’ai soif de ta présence',
    collection: 'Sur les Ailes de la Foi',
    key: 'Mi bémol Majeur (Eb)',
    theme: 'Consécration & Sainteté',
    chorus: 'Chaque jour, à chaque heure, oh ! j’ai besoin de toi ! Viens, Jésus, et demeure auprès de moi !',
    verses: [
      'J’ai soif de ta présence, divin Chef de ma foi ; mon cœur dans le silence s’abîme devant toi. Sans ta grâce divine, que pourrais-je accomplir ? C’est toi qui m’illumines et me fais refleurir.',
      'Des pièges du malin, garde mon faible cœur ; que par ta sainte main, je sois plus que vainqueur. Parle, ô céleste Guide, je veux écouter ta voix ; rassasie mon âme avide, montre-moi ta sainte croix.',
      'Dans la joie ou la peine, Seigneur, sois avec moi ; que ta douceur sereine me tienne dans la foi.',
    ],
  },
  {
    id: 4,
    number: 45,
    title: 'À Dieu soit la gloire',
    collection: 'Cantiques de Réveil',
    key: 'La bémol Majeur (Ab)',
    theme: 'Adoration & Triomphe',
    chorus: 'Gloire à Dieu ! Gloire à Dieu ! Terre, écoute sa voix ! Gloire à Dieu ! Gloire à Dieu ! Monde, réjouis-toi ! Venez au Père par Jésus le Sauveur, donnez-lui la gloire, gloire au Seigneur !',
    verses: [
      'À Dieu soit la gloire pour son grand amour ! Dans mon âme noire s’est levé le jour. Jésus pour me sauver a versé son sang ; pour me racheter, s’est fait obéissant.',
      'Oh ! pardon complet, l’effet de sa grâce ! Tout péché souillé par son sang s’efface. Le croyant sincère qui met sa confiance reçoit sans salaire pleine délivrance.',
      'Grande est notre joie en Jésus le Roi, et grande est la foi qui reçoit la loi ! Mais plus éclatant sera notre émoi, quand nous le verrons dans sa gloire, là-haut !',
    ],
  },
  {
    id: 5,
    number: 102,
    title: 'Descends, Esprit du Dieu vivant',
    collection: 'Cantiques de la Pentecôte',
    key: 'Ré Majeur (D)',
    theme: 'Saint-Esprit & Réveil',
    chorus: 'Descends, Esprit de sainteté, remplis nos cœurs de ta clarté ! Baptise-nous de ton saint feu, ô Souffle souverain de Dieu !',
    verses: [
      'Descends, Esprit du Dieu vivant, viens comme au jour de Pentecôte ; répands ton huile et ton vent sur notre cœur qui te redoute. Nous attendons ta promesse, répands sur nous tes bienfaits ; apporte-nous l’allégresse, et scelle-nous pour jamais.',
      'Viens réveiller dans nos rangs le zèle pour la sainte cause ; donne des langues de feu pour que la grâce s’impose. Que les malades guérissent, que les captifs soient brisés, et que les pécheurs périssent au péché pour s’élever !',
    ],
  },
];

export const INITIAL_PRAYER_ITEMS: PrayerItem[] = [
  {
    id: 'req-1',
    author: 'Sœur Kafui',
    location: 'Adamavo 2',
    category: 'Santé',
    content: 'Prions pour la restauration totale de la santé de ma maman qui traverse une épreuve médicale délicate. Avec le Pasteur AMOUZOU et les intercesseurs du Temple de la Résurrection, nous croyons fermement en la guérison divine au nom de Jésus.',
    date: 'Il y a 3 heures',
    prayerCount: 28,
    isAnonymous: false,
  },
  {
    id: 'req-2',
    author: 'Un frère d’Adamavo',
    location: 'Lomé - Zone Portuaire',
    category: 'Travail & Projets',
    content: 'Je sollicite les prières ferventes de l’assemblée pour un recrutement professionnel à Lomé cette semaine. Que l’Éternel ouvre les portes de bénédiction.',
    date: 'Hier à 18h40',
    prayerCount: 42,
    isAnonymous: true,
  },
  {
    id: 'req-3',
    author: 'Famille Mensah',
    location: 'Adamavo 2',
    category: 'Action de Grâce',
    content: 'Toute gloire à Dieu pour la grâce accordée à notre foyer et la naissance de notre enfant béni au Temple de la Résurrection. L’Éternel est fidèle à ses promesses !',
    date: 'Il y a 2 jours',
    prayerCount: 65,
    isAnonymous: false,
  },
  {
    id: 'req-4',
    author: 'Bureau JAD Adamavo',
    location: 'Temple de la Résurrection',
    category: 'Délivrance & Foi',
    content: 'Intercédons pour toute la jeunesse d’Adamavo 2, pour que nos collégiens et étudiants soient des flambeaux de sainteté et de vérité dans leurs établissements de Lomé.',
    date: 'Il y a 3 jours',
    prayerCount: 54,
    isAnonymous: false,
  },
  {
    id: 'req-5',
    author: 'Une sœur intercesseuse',
    location: 'Adamavo',
    category: 'Famille',
    content: 'Prière pour la restauration spirituelle, l’harmonie et la paix de Christ dans mon foyer à Adamavo 2. Que le Saint-Esprit console et fortifie.',
    date: 'Il y a 4 jours',
    prayerCount: 39,
    isAnonymous: true,
  },
];

export const DAILY_DEVOTIONAL: DailyDevotional = {
  date: 'Lundi 26 Octobre 2026',
  title: 'La Source Inépuisable de Ta Force Intérieure',
  scriptureRef: 'Ésaïe 40:29-31',
  scriptureText: '« Il donne de la force à celui qui est fatigué, et il augmente la vigueur de celui qui tombe en défaillance. Les adolescents se fatiguent et se lassent... mais ceux qui se confient en l’Éternel renouvellent leur force. Ils prennent le vol comme les aigles ; ils courent, et ne se lassent point. »',
  reflection: 'Dans la marche chrétienne, il arrive que l’âme éprouve la lassitude face aux combats répétés et aux responsabilités du quotidien. Le Seigneur ne nous demande pas de puiser dans nos réserves humaines épuisables, mais de nous attendre humblement à Lui. S’attendre à Dieu, c’est cesser l’agitation stérile pour laisser l’Esprit Saint renouveler notre entendement et nos affections.',
  prayer: 'Père céleste, je dépose à tes pieds toute fatigue physique, émotionnelle et spirituelle. Je reconnais que sans toi, je ne puis rien faire. Viens maintenant, par ton Esprit, insuffler en moi une vigueur nouvelle. Que mon âme s’élève au-dessus des orages de ce monde pour marcher dans la sérénité de ta victoire. Au nom de Jésus, Amen.',
  declaration: 'Aujourd’hui, je refuse le découragement : ma force est renouvelée par l’Esprit de Dieu qui habite en moi !',
};

export const CHURCH_INFO = {
  name: 'Église Évangélique Assemblée de Dieu',
  tagline: 'Temple de la Résurrection',
  affiliation: 'Membre de l’Église des Assemblées de Dieu du Togo (A.D. Togo) & Fraternité Mondiale',
  foundationYear: 1914,
  headPastor: 'Pasteur AMOUZOU',
  associatePastors: ['Pasteur AMOUZOU (Pasteur Principal)', 'Conseil Pastoral & Diaconat d’Adamavo 2'],
  address: 'Quartier Adamavo 2, Lomé — Togo',
  city: 'Lomé',
  district: 'Adamavo 2',
  country: 'Togo',
  phone: '+228 90 12 34 56 / +228 98 76 54 32',
  email: 'temple.resurrection.adamavo@ad-togo.org',
  emergencyPrayerLine: 'Ligne pastorale d’intercession & écoute : +228 90 12 34 57',
  services: [
    { day: 'Dimanche', name: '1er Culte d’Adoration & Célébration', time: '07h00 - 09h00', desc: 'Sainte Cène, Louange vivante et prédication de la Parole par le Pasteur AMOUZOU' },
    { day: 'Dimanche', name: '2ème Culte de Puissance & Bénédiction', time: '09h00 - 11h30', desc: 'Louange fervente, ECODIM pour les enfants et prière pour les familles' },
    { day: 'Mercredi', name: 'Étude Biblique & Enseignement Fondamental', time: '18h30 - 20h00', desc: 'Approfondissement des Saintes Écritures et édification' },
    { day: 'Vendredi', name: 'Veillée d’Intercession & Combat Spirituel', time: '18h30 - 20h30', desc: 'Prière fervente, délivrance et effusion du Saint-Esprit' },
    { day: 'Samedi', name: 'Rassemblement Jeunesse (JAD) & Répétition', time: '16h00 - 18h30', desc: 'Activités des jeunes d’Adamavo 2 et chorale' },
  ],
};

export interface HistoryEra {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  keyEvents: string[];
  figures: string[];
}

export interface NationalLeader {
  role: string;
  name: string;
  title: string;
  since: string;
  mandate: string;
  description: string;
}

export interface FormerLeader {
  name: string;
  role: string;
  period: string;
  impact: string;
}

export const HISTORY_ERAS: HistoryEra[] = [
  {
    period: '1914',
    title: 'La Genèse Mondiale du Mouvement',
    subtitle: 'Hot Springs, Arkansas & Le Réveil Pentecôtiste',
    description: 'À la suite du puissant réveil de la rue Azusa (Los Angeles, 1906), plus de 300 délégués se réunissent du 2 au 12 avril 1914 à Hot Springs en Arkansas pour former le Conseil Général des Assemblées de Dieu. Le but était de préserver l’unité doctrinale, coordonner les missions mondiales et proclamer l’Évangile intégral.',
    keyEvents: [
      'Avril 1914 : Premier Conseil Général à Hot Springs',
      'Adoption des 16 Vérités Fondamentales pentecôtistes',
      'Consécration solennelle pour les missions transfrontalières mondiales',
      'Création du réseau fraternel World Assemblies of God Fellowship',
    ],
    figures: ['E.N. Bell (Premier Président)', 'J. Roswell Flower', 'Missionnaires pionniers'],
  },
  {
    period: '1936',
    title: 'L’Implantation Pionnière au Togo',
    subtitle: 'L’Arrivée du Feu de la Pentecôte sur la Terre Togolaise',
    description: 'En 1936, l’Évangile pentecôtiste pénètre officiellement au Togo par le nord et l’ouest grâce aux missionnaires des Assemblées de Dieu. Bravant les obstacles géographiques et culturels, les premiers prédicateurs établissent des stations de prière et d’évangélisation qui vont embraser tout le pays.',
    keyEvents: [
      '1936 : Premières implantations missionnaires au Togo',
      'Évangélisation de masse et baptêmes dans le Saint-Esprit',
      'Conversion des premiers autochtones togolais devenus ouvriers de Dieu',
      'Établissement des premières assemblées de prière et cabanes d’adoration',
    ],
    figures: ['Missionnaires pionniers', 'Premiers pasteurs autochtones togolais'],
  },
  {
    period: '1950 – 1986',
    title: 'L’Enracinement & La Formation Théologique',
    subtitle: 'Naissance de l’Institut de Sada (Atakpamé) et de l’ESTAO à Lomé',
    description: 'Pendant trois décennies, l’Église structure sa formation pastorale. L’Institut Biblique et Théologique de Sada (près d’Atakpamé) voit le jour pour équiper des générations de pasteurs togolais, suivi de la création à Lomé de l’ESTAO (École Supérieure de Théologie de l’Afrique de l’Ouest), pôle d’excellence académique francophone.',
    keyEvents: [
      'Fondation de l’Institut Biblique et Théologique de Sada (Atakpamé)',
      'Création de l’ESTAO à Lomé (Faculté Théologique ouest-africaine)',
      'Structuration des départements nationaux : JAD, ECODIM, Action des Femmes',
      'Autonomie pastorale et passage de relais des missionnaires aux dirigeants togolais',
    ],
    figures: ['Pasteurs formateurs de Sada', 'Premiers diplômés théologiens togolais'],
  },
  {
    period: '1987 – 2024',
    title: 'L’Ère d’Expansion & Magistère Historique',
    subtitle: '37 Ans de Présidence du Révérend Pasteur Djakouti Mitré',
    description: 'De 1987 à juillet 2024, le Révérend Pasteur Djakouti Mitré a dirigé l’Église des Assemblées de Dieu du Togo pendant 37 années d’intense développement. L’Église s’est hissée au rang de première confession protestante évangélique du pays, avec des milliers de lieux de culte, des centres de santé, des écoles et des œuvres sociales d’envergure nationale.',
    keyEvents: [
      'Multiplication exponentielle des églises locales dans les 5 régions du Togo',
      'Développement des œuvres sociales : dispensaires, écoles primaires et collèges chrétiens',
      'Création des institutions financières d’entraide et de compassion',
      'Rayonnement international de l’Église du Togo au sein de la Fraternité Mondiale',
    ],
    figures: ['Révérend Pasteur Djakouti Mitré (Président National 1987 – 2024)', 'Anciens Membres du Bureau National'],
  },
  {
    period: '2024 – Présent',
    title: 'Le Renouveau & Le Nouveau Bureau Exécutif',
    subtitle: 'Conseil Général d’Atakpamé & Présidence du Rév. Dr. ADADÉ Ayi',
    description: 'Du 16 au 18 juillet 2024, réuni en Conseil Général électif extraordinaire à Atakpamé, le corps pastoral et les délégués ont plébiscité une nouvelle équipe dirigeante nationale pour un mandat de 5 ans (2024-2029). Le Révérend Dr. ADADÉ Ayi a été élu Président National, insufflant une dynamique de réconciliation, de consécration et de réveil pour toute la nation.',
    keyEvents: [
      '16–18 Juillet 2024 : Conseil Général Électif Historique à Atakpamé',
      'Élection du Rév. Dr. ADADÉ Ayi à la Présidence Nationale',
      'Installation du nouveau Bureau Exécutif composé de 7 membres éminents',
      'Nouvelle vision d’unité, de transparence et d’impact missionnaire renouvelé',
      'Affermissement des paroisses urbaines dont le Temple de la Résurrection à Adamavo 2',
    ],
    figures: [
      'Rév. Dr. ADADÉ Ayi (Président National Actuel)',
      'Rév. ANKOU Saram (Vice-Président)',
      'Rév. TCHANDAO Madatina (Secrétaire Général)',
      'Pasteur AMOUZOU (Pasteur Principal, Temple de la Résurrection Adamavo 2)',
    ],
  },
];

export const FORMER_LEADERS: FormerLeader[] = [
  {
    name: 'Révérend Pasteur Djakouti Mitré',
    role: 'Président National Émérite (37 ans de présidence)',
    period: '1987 – Juillet 2024',
    impact: 'Figure emblématique de l’histoire pentecôtiste togolaise. Il a conduit l’Église des Assemblées de Dieu du Togo pendant près de quatre décennies, bâtissant l’infrastructure nationale, étendant le réseau paroissial à chaque préfecture et structurant les ministères d’entraide et de formation théologique.',
  },
  {
    name: 'Pères Pionniers & Missionnaires (1936 – 1986)',
    role: 'Pères Fondateurs & Enseignants de Sada',
    period: '1936 – 1986',
    impact: 'Les serviteurs de Dieu pionniers qui ont bravé les contrées du Togo pour implanter les premiers temples, traduire les évangiles dans les langues locales (Éwé, Kabyè, etc.) et poser les fondements de la foi apostolique sans compromis.',
  },
];

export const CURRENT_NATIONAL_BUREAU: NationalLeader[] = [
  {
    role: 'Président National',
    name: 'Révérend Dr. ADADÉ Ayi',
    title: 'Chef Spirituel & Représentant Légal de l’Église',
    since: 'Juillet 2024',
    mandate: '2024 – 2029',
    description: 'Docteur en théologie et pasteur chevronné, élu lors du Conseil Général d’Atakpamé en juillet 2024. Il incarne le renouveau, l’affermissement spirituel, la communion fraternelle et la vision missionnaire globale de l’Église des Assemblées de Dieu du Togo.',
  },
  {
    role: 'Vice-Président National',
    name: 'Révérend ANKOU Saram',
    title: 'Adjoint au Président & Coordonnateur Régional',
    since: 'Juillet 2024',
    mandate: '2024 – 2029',
    description: 'Pasteur éminent accompagnant la présidence nationale dans la conduite des réformes, l’inspection pastorale et la veille doctrinale.',
  },
  {
    role: 'Secrétaire Général',
    name: 'Révérend TCHANDAO Madatina',
    title: 'Responsable de l’Administration Nationale',
    since: 'Juillet 2024',
    mandate: '2024 – 2029',
    description: 'En charge du secrétariat général, de la coordination administrative des régions ecclésiastiques et des actes officiels de l’Église.',
  },
  {
    role: 'Secrétaire Général Adjoint',
    name: 'Révérend YAKPEY Kokouvi Lucien',
    title: 'Secrétaire Général Adjoint',
    since: 'Juillet 2024',
    mandate: '2024 – 2029',
    description: 'Appui direct au secrétariat général pour les relations institutionnelles, les procès-verbaux et le suivi des résolutions nationales.',
  },
  {
    role: 'Trésorier Général',
    name: 'Révérend KONVI Yawo',
    title: 'Gardien de la Trésorerie Nationale',
    since: 'Juillet 2024',
    mandate: '2024 – 2029',
    description: 'Gestionnaire de la caisse centrale, garant de la transparence financière, des contributions des régions et du soutien aux œuvres missionnaires.',
  },
  {
    role: 'Secrétaire Financier',
    name: 'Révérend TIEM Ludovic',
    title: 'Gestion & Comptabilité Nationale',
    since: 'Juillet 2024',
    mandate: '2024 – 2029',
    description: 'En charge de la comptabilité analytique, du suivi budgétaire national et des investissements patrimoniaux de l’assemblée.',
  },
  {
    role: 'Conseiller National',
    name: 'Révérend LARE Belarbi Yendoukoah',
    title: 'Conseiller Spirituel & Conciliation',
    since: 'Juillet 2024',
    mandate: '2024 – 2029',
    description: 'Sage du Bureau Exécutif veillant à l’éthique ministérielle, à la paix ecclésiale et à l’encadrement fraternel des serviteurs de Dieu.',
  },
];

