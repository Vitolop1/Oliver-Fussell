(function () {
  const body = document.body;
  const menuToggle = document.querySelector('.menuToggle');
  const navLinks = Array.from(document.querySelectorAll('.siteNav a'));
  const statusToast = document.getElementById('statusToast');
  const copyEmailButton = document.getElementById('copyEmail');
  const printPageButton = document.getElementById('printPage');
  const emailAddress = 'oliverfussell4@gmail.com';
  const langButtons = Array.from(document.querySelectorAll('.langButton'));
  const storageKey = 'rugbyProfileLang';
  let toastTimeout;

  const getTexts = (selector) => Array.from(document.querySelectorAll(selector)).map((element) => element.textContent.trim());
  const setTexts = (selector, values) => Array.from(document.querySelectorAll(selector)).forEach((element, index) => {
    if (typeof values[index] === 'string') {
      element.textContent = values[index];
    }
  });
  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element && typeof value === 'string') {
      element.textContent = value;
    }
  };

  const base = {
    menu: menuToggle ? menuToggle.textContent.trim() : 'Menu',
    nav: getTexts('.siteNav a'),
    navCta: document.querySelector('.navCta')?.textContent.trim() || '',
    heroEyebrow: document.querySelector('.eyebrow')?.textContent.trim() || '',
    heroLead: document.querySelector('.heroLead')?.textContent.trim() || '',
    heroTags: getTexts('.heroTags span'),
    heroButtons: [document.querySelector('.ctaRow a:nth-of-type(1)')?.textContent.trim() || '', document.querySelector('.ctaRow a:nth-of-type(2)')?.textContent.trim() || '', copyEmailButton?.textContent.trim() || ''],
    heroCard: [document.querySelector('.heroInfoCard .sectionKicker')?.textContent.trim() || '', document.querySelector('.heroInfoCard strong')?.textContent.trim() || '', document.querySelector('.heroInfoCard p')?.textContent.trim() || ''],
    sectionKickers: getTexts('.sectionHeading .sectionKicker'),
    sectionTitles: getTexts('.sectionHeading .sectionTitle'),
    sectionLeads: getTexts('.sectionHeading .sectionLead'),
    profileSummary: getTexts('#profile .summaryText'),
    detailLabels: getTexts('#profile .detailCard .detailLabel'),
    quickNotesKicker: document.querySelectorAll('#profile .profileSide .surface .sectionKicker')[0]?.textContent.trim() || '',
    quickNotes: getTexts('#profile .profileSide .surface .list li'),
    chips: getTexts('#profile .chipRow .chip'),
    directContactKicker: document.querySelectorAll('#profile .profileSide .surface .sectionKicker')[1]?.textContent.trim() || '',
    sideContactLabels: getTexts('#profile .profileSide .surface:nth-of-type(2) .contactLabel'),
    strengthKickers: getTexts('#strengths .strengthCard .sectionKicker'),
    strengthTitles: getTexts('#strengths .strengthCard h3'),
    positionKickers: getTexts('#positions .positionCard .sectionKicker'),
    positionTags: getTexts('#positions .positionTag'),
    filmCard: [document.querySelector('#film .filmCard .sectionKicker')?.textContent.trim() || '', document.querySelector('#film .filmCard h3')?.textContent.trim() || '', document.querySelector('#film .filmCard > p')?.textContent.trim() || ''],
    filmLabels: getTexts('#film .filmCard .contactLabel'),
    referenceLabels: getTexts('#references .referenceCard .referenceLabel'),
    referenceContactHeading: document.querySelector('#references .referenceCard:nth-of-type(2) h3')?.textContent.trim() || '',
    referenceContactLabels: getTexts('#references .referenceCard:nth-of-type(2) .contactLabel'),
    contactCardOne: [document.querySelectorAll('#contact .contactCard .sectionKicker')[0]?.textContent.trim() || '', document.querySelectorAll('#contact .contactCard h3')[0]?.textContent.trim() || '', document.querySelectorAll('#contact .contactCard p')[0]?.textContent.trim() || ''],
    contactCardTwo: [document.querySelectorAll('#contact .contactCard .sectionKicker')[1]?.textContent.trim() || '', document.querySelectorAll('#contact .contactCard h3')[1]?.textContent.trim() || '', document.querySelectorAll('#contact .contactCard p')[1]?.textContent.trim() || ''],
    contactLabels: getTexts('#contact .contactCard:first-of-type .contactLabel'),
    contactButtons: getTexts('#contact .contactCard:last-of-type .ctaRow > *'),
    contactNote: document.querySelector('#contact .contactCard:last-of-type .referencesNote')?.textContent.trim() || '',
    toast: 'Email copied to clipboard',
    footer: 'Oliver Fussell. Rugby highlights and recruiting profile.'
  };

  const translations = {
    es: {
      nav: ['Perfil', 'Fortalezas', 'Posiciones', 'Logros', 'Video', 'Referencias', 'Contacto'],
      navCta: 'Contacto Recruiting', heroEyebrow: 'Centro / Apertura | Inglaterra', heroLead: 'Backline con muy buena gestion del juego, comunicacion, patada tactica y honours de alto nivel.',
      heroTags: ['Centro / Apertura', 'Liderazgo', 'Gestion del Juego', 'Patada Tactica'], heroButtons: ['Ver Highlights', 'Email a Oliver', 'Copiar Email'],
      heroCard: ['Lectura Rapida', 'Liderazgo + Control', 'Gran comunicador, buen tomador de decisiones y amenaza de quiebre en la linea.'],
      sectionKickers: ['Perfil', 'Fortalezas', 'Posiciones', 'Logros', 'Video', 'Referencias', 'Contacto'],
      sectionTitles: ['Perfil del Jugador', 'Fortalezas', 'Posiciones', 'Honours Representativos', 'Highlights', 'Referencia de Coach', 'Contacto Recruiting'],
      sectionLeads: ['Resumen claro para coaches, clubes y recruiters.', 'Rasgos de alto valor para escanear rapido.', 'Roles principales y que aporta en cada uno.', 'Selecciones, premios y equipos representativos.', 'Video que muestra distribucion, control del juego, line running y patada tactica.', 'Informacion de referencia y devolucion del coach.', 'Datos claros para coaches, clubes y recruiters.'],
      profileSummary: ['Oliver es un jugador de backs que aporta control, comunicacion y compostura en contextos de alto nivel. Puede conducir el juego como 10, distribuir bien y tambien atacar la linea como centro.', 'Su perfil combina lectura tactica, buenas lineas de carrera, impacto en la gain line y capacidad para organizar tanto el ataque como la defensa.'],
      detailLabels: ['Nombre Completo', 'Fecha de Nacimiento', 'Nacionalidad', 'College', 'Altura', 'Peso'], quickNotesKicker: 'Notas Rapidas',
      quickNotes: ['Perfil de centro / apertura con muy buena gestion del juego.', 'Primer receptor confiable bajo presion y pateador tactico efectivo.', 'Buenas lineas de carrera, distribucion e impacto sobre la gain line.', 'Ordena bien la linea defensiva y se comunica mucho.'],
      chips: ['Centro / Apertura', 'Gestion del Juego', 'Patada Tactica', 'Liderazgo'], directContactKicker: 'Contacto Directo', sideContactLabels: ['Email', 'Telefono'],
      strengthKickers: ['Ataque', 'Pase', 'Patada', 'Defensa'], strengthTitles: ['Line Running', 'Distribucion', 'Control del Juego', 'Organizacion'],
      positionKickers: ['Apertura', 'Centro'], positionTags: ['Gestion del Juego', 'Gain Line + Distribucion'],
      filmCard: ['Que Mirar', 'Notas del Video', 'Guia corta para coaches que revisan el reel.'], filmLabels: ['Trabajo de Primer Receptor', 'Amenaza con Carrera', 'Patada Tactica', 'Comunicacion Defensiva'],
      referenceLabels: ['Cita del Coach', 'Contacto de Referencia'], referenceContactHeading: 'Contacto Directo', referenceContactLabels: ['Telefono', 'Email', 'Background'],
      contactCardOne: ['Contacto del Jugador', 'Oliver Fussell', 'Disponible para conversaciones de recruiting, clubes y nuevas oportunidades.'],
      contactCardTwo: ['Acciones Rapidas', 'Siguiente Paso', 'Envia un email, guarda la pagina en PDF o mira primero el video.'],
      contactLabels: ['Email', 'Telefono'], contactButtons: ['Enviar Email', 'Guardar en PDF'], contactNote: 'Belmont Abbey College | Centro / Apertura | Ingles',
      toast: 'Email copiado', footer: 'Oliver Fussell. Highlights de rugby y perfil recruiting.'
    },
    fr: {
      nav: ['Profil', 'Points Forts', 'Postes', 'Distinctions', 'Video', 'References', 'Contact'],
      navCta: 'Contact Recruiting', heroEyebrow: 'Centre / Ouvreur | Angleterre', heroLead: 'Joueur de ligne arriere avec une tres bonne gestion du jeu, communication, jeu au pied tactique et distinctions de haut niveau.',
      heroTags: ['Centre / Ouvreur', 'Leadership', 'Gestion du Jeu', 'Jeu au Pied Tactique'], heroButtons: ['Voir les Highlights', 'Envoyer un Email', 'Copier l\'Email'],
      heroCard: ['Lecture Rapide', 'Leadership + Controle', 'Tres bon communicateur, decideur tactique et menace de franchissement dans la ligne arriere.'],
      sectionKickers: ['Profil', 'Points Forts', 'Postes', 'Distinctions', 'Video', 'References', 'Contact'],
      sectionTitles: ['Profil du Joueur', 'Points Forts', 'Postes', 'Distinctions Representatives', 'Highlights', 'Reference Coach', 'Contact Recruiting'],
      sectionLeads: ['Vue claire pour les coaches, clubs et recruteurs.', 'Traits importants que les coaches peuvent scanner rapidement.', 'Roles principaux et ce qu\'il apporte dans chacun.', 'Selections, recompenses et equipes representatives.', 'Video qui montre la distribution, la gestion du jeu, les courses et le jeu au pied tactique.', 'Informations de reference et retour du coach.', 'Coordonnees claires pour les coaches, clubs et recruteurs.'],
      profileSummary: ['Oliver est un joueur de ligne arriere qui apporte controle, communication et calme dans des environnements de haut niveau. Il peut diriger le jeu en 10, bien distribuer et aussi attaquer la ligne comme centre.', 'Son profil combine lecture tactique, courses efficaces, impact sur la ligne d\'avantage et capacite a organiser l\'attaque comme la defense.'],
      detailLabels: ['Nom Complet', 'Date de Naissance', 'Nationalite', 'College', 'Taille', 'Poids'], quickNotesKicker: 'Notes Rapides',
      quickNotes: ['Profil centre / ouvreur avec une forte gestion du jeu.', 'Premier receveur fiable sous pression et bon jeu au pied tactique.', 'Bonnes courses, distribution et impact sur la ligne d\'avantage.', 'Organise bien la ligne defensive et communique beaucoup.'],
      chips: ['Centre / Ouvreur', 'Gestion du Jeu', 'Jeu au Pied Tactique', 'Leadership'], directContactKicker: 'Contact Direct', sideContactLabels: ['Email', 'Telephone'],
      strengthKickers: ['Attaque', 'Passe', 'Pied', 'Defense'], strengthTitles: ['Courses', 'Distribution', 'Controle du Jeu', 'Organisation'],
      positionKickers: ['Ouvreur', 'Centre'], positionTags: ['Gestion du Jeu', 'Ligne d\'Avantage + Distribution'],
      filmCard: ['A Regarder', 'Notes Video', 'Petit guide pour les coaches qui regardent le reel.'], filmLabels: ['Travail de Premier Receveur', 'Menace en Course', 'Jeu au Pied Tactique', 'Communication Defensive'],
      referenceLabels: ['Citation du Coach', 'Contact de Reference'], referenceContactHeading: 'Contact Direct', referenceContactLabels: ['Telephone', 'Email', 'Parcours'],
      contactCardOne: ['Contact Joueur', 'Oliver Fussell', 'Disponible pour des conversations de recrutement, des clubs et de nouvelles opportunites.'],
      contactCardTwo: ['Actions Rapides', 'Etape Suivante', 'Envoyez un email, enregistrez la page en PDF ou regardez d\'abord la video.'],
      contactLabels: ['Email', 'Telephone'], contactButtons: ['Envoyer un Email', 'Enregistrer en PDF'], contactNote: 'Belmont Abbey College | Centre / Ouvreur | Anglais',
      toast: 'Email copie', footer: 'Oliver Fussell. Highlights rugby et profil de recrutement.'
    },
    it: {
      nav: ['Profilo', 'Punti di Forza', 'Ruoli', 'Riconoscimenti', 'Video', 'Referenze', 'Contatto'],
      navCta: 'Contatto Recruiting', heroEyebrow: 'Centro / Apertura | Inghilterra', heroLead: 'Giocatore di linea arretrata con ottima gestione del gioco, comunicazione, calcio tattico e riconoscimenti di alto livello.',
      heroTags: ['Centro / Apertura', 'Leadership', 'Gestione del Gioco', 'Calcio Tattico'], heroButtons: ['Guarda Highlights', 'Email a Oliver', 'Copia Email'],
      heroCard: ['Lettura Rapida', 'Leadership + Controllo', 'Ottimo comunicatore, decisore tattico e minaccia di line break nella linea arretrata.'],
      sectionKickers: ['Profilo', 'Punti di Forza', 'Ruoli', 'Riconoscimenti', 'Video', 'Referenze', 'Contatto'],
      sectionTitles: ['Profilo del Giocatore', 'Punti di Forza', 'Ruoli', 'Riconoscimenti Rappresentativi', 'Highlights', 'Referenza Coach', 'Contatto Recruiting'],
      sectionLeads: ['Panoramica chiara per coach, club e recruiter.', 'Caratteristiche di valore che i coach possono leggere rapidamente.', 'Ruoli principali e cosa porta in ognuno.', 'Selezioni, premi e squadre rappresentative.', 'Video che mostra distribuzione, gestione del gioco, line running e calcio tattico.', 'Informazioni di referenza e feedback del coach.', 'Dettagli chiari per coach, club e recruiter.'],
      profileSummary: ['Oliver e un giocatore di linea arretrata che porta controllo, comunicazione e calma in ambienti di alto livello. Puo guidare il gioco da 10, distribuire bene e attaccare la linea come centro.', 'Il suo profilo combina lettura tattica, linee di corsa efficaci, impatto sulla gain line e capacita di organizzare sia l\'attacco sia la difesa.'],
      detailLabels: ['Nome Completo', 'Data di Nascita', 'Nazionalita', 'College', 'Altezza', 'Peso'], quickNotesKicker: 'Note Rapide',
      quickNotes: ['Profilo centro / apertura con forte gestione del gioco.', 'Primo ricevitore affidabile sotto pressione e buon calcio tattico.', 'Buone linee di corsa, distribuzione e impatto sulla gain line.', 'Organizza bene la linea difensiva e comunica molto.'],
      chips: ['Centro / Apertura', 'Gestione del Gioco', 'Calcio Tattico', 'Leadership'], directContactKicker: 'Contatto Diretto', sideContactLabels: ['Email', 'Telefono'],
      strengthKickers: ['Attacco', 'Passaggio', 'Calcio', 'Difesa'], strengthTitles: ['Line Running', 'Distribuzione', 'Controllo del Gioco', 'Organizzazione'],
      positionKickers: ['Apertura', 'Centro'], positionTags: ['Gestione del Gioco', 'Gain Line + Distribuzione'],
      filmCard: ['Da Guardare', 'Note Video', 'Guida breve per i coach che guardano il reel.'], filmLabels: ['Lavoro da Primo Ricevitore', 'Minaccia di Corsa', 'Calcio Tattico', 'Comunicazione Difensiva'],
      referenceLabels: ['Citazione del Coach', 'Contatto di Referenza'], referenceContactHeading: 'Contatto Diretto', referenceContactLabels: ['Telefono', 'Email', 'Background'],
      contactCardOne: ['Contatto Giocatore', 'Oliver Fussell', 'Disponibile per conversazioni recruiting, club e nuove opportunita.'],
      contactCardTwo: ['Azioni Rapide', 'Prossimo Passo', 'Invia un\'email, salva la pagina in PDF oppure guarda prima il video.'],
      contactLabels: ['Email', 'Telefono'], contactButtons: ['Invia Email', 'Salva in PDF'], contactNote: 'Belmont Abbey College | Centro / Apertura | Inglese',
      toast: 'Email copiato', footer: 'Oliver Fussell. Highlights rugby e profilo recruiting.'
    }
  };

  let activeLanguage = 'en';
  const showToast = (message) => {
    if (!statusToast) return;
    statusToast.textContent = message;
    statusToast.classList.add('is-visible');
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => statusToast.classList.remove('is-visible'), 2200);
  };

  const applyLanguage = (language) => {
    activeLanguage = language;
    const pack = language === 'en' ? base : { ...base, ...(translations[language] || {}) };
    document.documentElement.lang = language;
    setText('.menuToggle', pack.menu);
    setTexts('.siteNav a', pack.nav); setText('.navCta', pack.navCta); setText('.eyebrow', pack.heroEyebrow); setText('.heroLead', pack.heroLead);
    setTexts('.heroTags span', pack.heroTags); setText('.ctaRow a:nth-of-type(1)', pack.heroButtons[0]); setText('.ctaRow a:nth-of-type(2)', pack.heroButtons[1]); setText('#copyEmail', pack.heroButtons[2]);
    setText('.heroInfoCard .sectionKicker', pack.heroCard[0]); setText('.heroInfoCard strong', pack.heroCard[1]); setText('.heroInfoCard p', pack.heroCard[2]);
    setTexts('.sectionHeading .sectionKicker', pack.sectionKickers); setTexts('.sectionHeading .sectionTitle', pack.sectionTitles); setTexts('.sectionHeading .sectionLead', pack.sectionLeads);
    setTexts('#profile .summaryText', pack.profileSummary); setTexts('#profile .detailCard .detailLabel', pack.detailLabels); setText('#profile .profileSide .surface .sectionKicker', pack.quickNotesKicker);
    setTexts('#profile .profileSide .surface .list li', pack.quickNotes); setTexts('#profile .chipRow .chip', pack.chips); setText('#profile .profileSide .surface:nth-of-type(2) .sectionKicker', pack.directContactKicker); setTexts('#profile .profileSide .surface:nth-of-type(2) .contactLabel', pack.sideContactLabels);
    setTexts('#strengths .strengthCard .sectionKicker', pack.strengthKickers); setTexts('#strengths .strengthCard h3', pack.strengthTitles); setTexts('#positions .positionCard .sectionKicker', pack.positionKickers); setTexts('#positions .positionTag', pack.positionTags);
    setText('#film .filmCard .sectionKicker', pack.filmCard[0]); setText('#film .filmCard h3', pack.filmCard[1]); setText('#film .filmCard > p', pack.filmCard[2]); setTexts('#film .filmCard .contactLabel', pack.filmLabels);
    setTexts('#references .referenceCard .referenceLabel', pack.referenceLabels); setText('#references .referenceCard:nth-of-type(2) h3', pack.referenceContactHeading); setTexts('#references .referenceCard:nth-of-type(2) .contactLabel', pack.referenceContactLabels);
    setText('#contact .contactCard:first-of-type .sectionKicker', pack.contactCardOne[0]); setText('#contact .contactCard:first-of-type h3', pack.contactCardOne[1]); setText('#contact .contactCard:first-of-type p', pack.contactCardOne[2]);
    setText('#contact .contactCard:last-of-type .sectionKicker', pack.contactCardTwo[0]); setText('#contact .contactCard:last-of-type h3', pack.contactCardTwo[1]); setText('#contact .contactCard:last-of-type p', pack.contactCardTwo[2]);
    setTexts('#contact .contactCard:first-of-type .contactLabel', pack.contactLabels); setTexts('#contact .contactCard:last-of-type .ctaRow > *', pack.contactButtons); setText('#contact .contactCard:last-of-type .referencesNote', pack.contactNote);
    langButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.lang === language));
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const nextState = body.dataset.navOpen !== 'true';
      body.dataset.navOpen = String(nextState);
      menuToggle.setAttribute('aria-expanded', String(nextState));
    });
  }

  navLinks.forEach((link) => link.addEventListener('click', () => {
    body.dataset.navOpen = 'false';
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }));

  if (copyEmailButton) {
    copyEmailButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailAddress);
        showToast((translations[activeLanguage] || base).toast || base.toast);
      } catch (error) {
        window.location.href = 'mailto:' + emailAddress;
      }
    });
  }

  if (printPageButton) {
    printPageButton.addEventListener('click', () => window.print());
  }

  langButtons.forEach((button) => button.addEventListener('click', () => {
    const nextLanguage = button.dataset.lang || 'en';
    window.localStorage.setItem(storageKey, nextLanguage);
    applyLanguage(nextLanguage);
  }));

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -30px 0px' });
    revealElements.forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const currentId = '#' + entry.target.id;
        navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === currentId));
      });
    }, { rootMargin: '-38% 0px -48% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  const savedLanguage = window.localStorage.getItem(storageKey);
  const browserLanguage = (navigator.language || 'en').slice(0, 2).toLowerCase();
  applyLanguage(translations[savedLanguage] ? savedLanguage : (translations[browserLanguage] ? browserLanguage : 'en'));
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
}());
