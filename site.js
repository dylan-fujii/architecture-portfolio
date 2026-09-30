function workMenu() {
  const target = document.querySelector('#project-menu');
  if (!target) return;
  target.innerHTML = `<a href="collection.html?collection=student"><span>Student work</span><strong>Projects + abstractions</strong></a>`;
}

function responsiveHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  let previousY = window.scrollY;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    window.requestAnimationFrame(() => {
      const currentY = window.scrollY;
      const movingDown = currentY > previousY;
      header.classList.toggle('site-header--hidden', movingDown && currentY > 110);
      previousY = currentY;
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
}

function index() {
  const list = document.querySelector('#process-list');
  if (!list) return;
  list.innerHTML = ["student", "internship"].map((id, index) => { const collection = collections[id]; return `<a class="project-index-row" href="collection.html?collection=${id}"><b>0${index + 1}</b><div><span>${id === "student" ? "Projects, abstractions" : "DELV Design"}</span><strong>${collection.title}</strong><small>${collection.intro}</small></div><span class="arrow link-arrow">↗</span></a>`; }).join('');
}

const studioByProject = {
  joinery: 'TOM COLLINS',
  uniformed: 'MEGAN PHILLIPE',
  bolt: 'MEGAN PHILLIPE',
  highechelon: 'SEAN BURNS',
  tectonics: 'SEAN BURNS',
  inverse: 'SEAN BURNS',
  gallery: 'JUN MYUNG',
  steel: 'ROY KIM',
  altadena: 'ROY KIM'
};

function collectionPage() {
  const target = document.querySelector('#collection-page');
  if (!target) return;
  const id = new URLSearchParams(location.search).get('collection') || 'student';
  const collection = collections[id] || collections.student;
  document.title = `${collection.title} | Dylan Fujii`;
  const makeTiles = (ids) => ids.map((projectId) => {
    const project = projects[projectId];
    const studio = studioByProject[projectId];
    return `<a class="project-tile project-tile-${projectId} ${projectId === "joinery" ? "project-tile-featured" : ""}" href="project.html?project=${projectId}"><figure><img class="tile-hero-image" src="${project.hero}" alt="${project.title}">${project.heroHover ? `<img class="tile-hover-image" src="${project.heroHover}" alt="">` : ''}<figcaption class="tile-overlay"><strong class="tile-mobile-title">${project.title}</strong><span class="tile-year">${project.yearLabel || project.year}</span>${studio ? `<small class="tile-studio">Studio ${studio}</small>` : ''}</figcaption></figure><h3>${project.title}</h3></a>`;
  }).join('');
  const sections = collection.groups ? collection.groups.map((group) => `<section id="${group.title.toLowerCase().replace(/[^a-z]+/g, '-')}" class="media-section"><header><h2>${group.title}</h2>${group.intro ? `<p>${group.intro}</p>` : ''}</header><div class="portfolio-grid portfolio-grid-${group.title.toLowerCase().replace(/[^a-z]+/g, '-')}">${makeTiles(group.ids)}</div></section>`).join('') : `<section class="media-section"><header><p class="eyebrow">Professional work</p><h2>${collection.title}</h2><p>${collection.intro}</p></header><div class="portfolio-grid">${makeTiles(collection.ids)}</div></section>`;
  const studentStatement = id === 'student' ? `<div class="collection-statement"><p>The projects are a culmination of meaningful mentorships and relationships, late nights in the studio, and a drive to create.</p><p><em>Homo ludens</em>—<strong>playing man</strong>: culture arises from and is shaped by play. Play is not separate from society; it is how we test ideas, form relationships, and begin meaningful ventures.</p><p>I hope to continue aligning my efforts with playful yet productive projects in the future.</p></div>` : '';
  target.innerHTML = `<section class="collection-hero"><h1>${collection.title}</h1>${studentStatement}</section>${sections}`;
}

function joineryProjectPage(project) {
  return `<section class="project-intro joinery-intro"><section class="project-summary joinery-summary"><p class="eyebrow">Student work: Projects</p><h1>The Joinery</h1><dl><div><dt>Year</dt><dd>2026</dd></div><div><dt>Recognition</dt><dd>2nd Place, ACSA Timber in the City Competition 2026</dd></div></dl><p class="lede">Sitting at the vibrant intersection of Ball State University and the Village, a community-rooted district that connects campus and city, the Joinery is an architectural idea that creates a physical and social link, offering a bold and inviting welcome to students while supporting neighborhood revitalization within the Village.</p></section><section class="project-page-hero joinery-hero"><figure><img src="${project.hero}" alt="The Joinery exterior rendering"></figure></section></section>
  <section class="joinery-concept"><div class="joinery-concept-copy"><p class="eyebrow">01 / Concept</p><h2>Live-Work Walk-Up Housing</h2><p>As the Village faces change through new development from Ball State, the Joinery responds to changing conditions through a form that fits its context while using durable, resilient materials.</p></div><figure class="joinery-parti"><img src="assets/images/joinery-parti-and-concept.png" alt="Scale, lighting, circulation, user privacy, and public-private parti diagrams"></figure><figure class="joinery-history"><img src="assets/images/joinery-village-timeline.png" alt="Historical Village timeline"><figcaption>Historical context: the Village</figcaption></figure></section>
  <section class="joinery-context joinery-context--axon"><header><p class="eyebrow">02 / Site</p><h2>Site + context</h2></header><figure><img src="assets/images/joinery-site-context-cropped.png" alt="The relation between the Joinery, Ball State University, and the Village"><figcaption>The relation between Ball State University and the Village</figcaption></figure></section>
  <section class="joinery-isonometric"><header><p class="eyebrow">03 / Building systems</p><h2>Spatial planning</h2></header><figure><img src="assets/images/joinery-labeled-isonometric-cropped.png" alt="Labeled isonometric building diagram with solar-assisted HVAC"></figure></section>
  <section class="joinery-catalogue"><header><p class="eyebrow">04 / Technical catalogue</p><h2>Drawings + models</h2><p>Hover over an image to study the full drawing.</p></header><div class="joinery-catalogue-grid">
    <div class="joinery-catalogue-item"><img src="assets/images/joinery-physical-model-context.png" alt="Physical model showing the Joinery structure"></div>
    <div class="joinery-catalogue-item"><img src="assets/images/joinery-glue-fujii-robertson4.png" alt="Village Joinery visualization"></div>
    <div class="joinery-catalogue-item"><img src="assets/images/timber-p03-12.jpg" alt="Structural drawing"></div>
    <div class="joinery-catalogue-item"><img src="assets/images/joinery-natural-ventilation-axon.png" alt="Building axonometric explaining natural ventilation"></div>
    <div class="joinery-catalogue-item"><img src="assets/images/joinery-roof-cladding-centered.png" alt="Roof assembly axonometric with material schedule"></div>
    <div class="joinery-catalogue-item"><img src="assets/images/joinery-wall-cladding-centered.png" alt="Wall assembly axonometric with material schedule"></div>
    <div class="joinery-catalogue-item"><img src="assets/images/joinery-hvac-spatial-planning.png" alt="HVAC spatial planning diagram"></div>
    <div class="joinery-catalogue-item"><img src="assets/images/joinery-concept-studies.png" alt="The concept studies"></div>
    <div class="joinery-catalogue-item"><img src="assets/images/joinery-physical-model.png" alt="Physical model photograph"></div>
    <div class="joinery-catalogue-preview" aria-hidden="true"><img alt=""></div>
  </div></section>`;
}

const projectChapters = {
  gallery: [["01 / Concept", "Parti + circulation", [0, 1]], ["02 / Building", "Section + structure", [2, 3]]],
  bolt: [["01 / Envelope", "Street elevation", [0, 1]], ["02 / Material study", "Physical model", [2]], ["03 / Organization", "Floor plans", [3, 4]]],
  highechelon: [["01 / Site + movement", "Floor plans", [0]], ["02 / Study", "Physical model", [1]]],
  uniformed: [["01", "Building study", [0, 1]], ["02", "Parti diagram", [2]], ["03", "Site: Broad Ripple, IN", [3]], ["04", "Visualizations", [4, 5, 6]]],
  steel: [["01 / Manifesto", "Steel as a material and idea", [0]], ["02 / Process", "Tectonic manual + Rhino study", [1, 2]], ["03 / Initial Collage", "Abstract Collage", [3]]],
  tectonics: [["01 / Material study", "Physical model", [0]], ["02 / Section", "Section cuts", [1, 2]]],
  inverse: [["01 / Inversion", "Exploded study model", [0]]],
  altadena: [["01", "Natural disaster: fire", [0, 1]], ["02", "Exploded axon", [2]], ["03", "Section studies", [3, 4]]],
  mulberry: [["01 / Documentation", "Construction detail drawing", [0]]],
  southbend: [["01 / Site analysis", "Experience map", [0]]],
  childrens: []
};

function narrativeMedia(project, id) {
  const chapters = projectChapters[id] || [];
  const figure = (index) => {
    const [src, alt, layout] = project.media[index];
    const zoomable = id === 'bolt' && (index === 3 || index === 4) ? ' project-image--zoom' : '';
    return `<figure class="project-image ${layout || 'wide'}${zoomable}"><img src="${src}" alt="${alt}"><figcaption>${alt}</figcaption></figure>`;
  };
  if (!chapters.length) return project.media.map((_, index) => figure(index)).join('');
  return chapters.map(([eyebrow, title, indices]) => `<section class="project-chapter"><header><p class="eyebrow">${eyebrow}</p><h2>${title}</h2></header><div class="project-chapter-media">${indices.map(figure).join('')}</div></section>`).join('');
}

function projectPage() {
  const target = document.querySelector('#project-page');
  if (!target) return;
  const id = new URLSearchParams(location.search).get('project') || 'joinery';
  const project = projects[id] || projects.joinery;
  document.title = `${project.title} | Dylan Fujii`;
  if (id === 'joinery') { target.innerHTML = joineryProjectPage(project); return; }
  const text = project.text.map((paragraph) => `<p>${paragraph}</p>`).join('');
  const images = narrativeMedia(project, id);
  const links = (project.links || []).map(([label, href]) => `<a class="project-reference" href="${href}" target="_blank" rel="noopener">${label} <span class="link-arrow">↗</span></a>`).join('');
  const boards = (project.boards || []).map(([src, alt]) => `<figure class="project-board-image"><img src="${src}" alt="${alt}"><figcaption>${alt}</figcaption></figure>`).join('');
  const boardSection = boards ? `<section class="project-board"><header><p class="eyebrow">Complete presentation</p><h2>Project Board</h2></header><div>${boards}</div></section>` : '';
  const detailHero = project.detailHero || project.hero;
  const meta = `${project.year ? `<div><dt>Year</dt><dd>${project.year}</dd></div>` : ''}${project.tools ? `<div><dt>Tools</dt><dd>${project.tools}</dd></div>` : ''}`;
  target.innerHTML = `<section class="project-intro project-intro--${id}"><section class="project-summary"><p class="eyebrow">${project.category}</p><h1>${project.title}</h1>${meta ? `<dl>${meta}</dl>` : ''}${project.note ? `<p class="project-note">${project.note}</p>` : ''}${project.description ? `<p class="lede">${project.description}</p>` : ''}${text ? `<div class="source-text">${text}</div>` : ''}${links}</section><section class="project-page-hero"><figure><img class="project-hero-main" src="${detailHero}" alt="${project.title} hero image">${project.heroHover ? `<img class="project-hero-hover" src="${project.heroHover}" alt=""><span class="hero-hover-prompt">Hover over image</span>` : ''}</figure></section></section>${images ? `<section class="project-narrative">${images}</section>` : ''}${boardSection}`;
}

function constrainImageZoom() {
  document.querySelectorAll('.project-image--zoom').forEach((item) => {
    const image = item.querySelector('img');
    if (!image) return;
    const expand = () => {
      const bounds = image.getBoundingClientRect();
      const chapter = item.closest('.project-chapter');
      const chapterBounds = chapter?.getBoundingClientRect();
      const chapterStyle = chapter ? getComputedStyle(chapter) : null;
      const horizontalMargin = chapterStyle ? parseFloat(chapterStyle.paddingLeft) : window.innerWidth * (window.innerWidth <= 760 ? .05 : .04);
      const leftBoundary = Math.max(window.innerWidth * (window.innerWidth <= 760 ? .05 : .04), (chapterBounds?.left || 0) + horizontalMargin);
      const rightBoundary = Math.min(window.innerWidth * (1 - (window.innerWidth <= 760 ? .05 : .04)), (chapterBounds?.right || window.innerWidth) - horizontalMargin);
      const horizontalOrigin = bounds.left + bounds.width / 2 < (leftBoundary + rightBoundary) / 2 ? 'left' : 'right';
      const verticalOrigin = bounds.top + bounds.height / 2 < window.innerHeight / 2 ? 'top' : 'bottom';
      const verticalInset = Math.max(20, window.innerHeight * (window.innerWidth <= 760 ? .05 : .04));
      const availableWidth = horizontalOrigin === 'left' ? rightBoundary - bounds.left : bounds.right - leftBoundary;
      const availableHeight = verticalOrigin === 'top' ? window.innerHeight - bounds.top - verticalInset : bounds.bottom - verticalInset;
      const scale = Math.max(1, Math.min(3, availableWidth / bounds.width, availableHeight / bounds.height));
      item.style.setProperty('--zoom-scale', scale.toFixed(3));
      item.style.setProperty('--zoom-origin', `${horizontalOrigin} ${verticalOrigin}`);
      item.classList.add('image-expanded');
    };
    const collapse = () => item.classList.remove('image-expanded');
    item.addEventListener('pointerenter', expand);
    item.addEventListener('pointerleave', collapse);
    item.addEventListener('focusin', expand);
    item.addEventListener('focusout', collapse);
  });
}

function joineryCataloguePreview() {
  document.querySelectorAll('.joinery-catalogue-grid').forEach((grid) => {
    const preview = grid.querySelector('.joinery-catalogue-preview');
    const previewImage = preview?.querySelector('img');
    if (!preview || !previewImage) return;
    grid.querySelectorAll('.joinery-catalogue-item').forEach((item) => {
      const image = item.querySelector('img');
      if (!image) return;
      const show = () => {
        previewImage.src = image.currentSrc || image.src;
        previewImage.alt = image.alt;
        preview.classList.add('is-visible');
      };
      const hide = () => preview.classList.remove('is-visible');
      item.addEventListener('pointerenter', show);
      item.addEventListener('pointerleave', hide);
      item.addEventListener('focusin', show);
      item.addEventListener('focusout', hide);
    });
  });
}

function protectImages() {
  document.querySelectorAll('img').forEach((image) => { image.draggable = false; });
  document.addEventListener('contextmenu', (event) => {
    if (event.target instanceof HTMLImageElement) event.preventDefault();
  });
}

function backToTop() {
  const button = document.createElement('button');
  button.className = 'back-to-top';
  button.type = 'button';
  button.textContent = 'Back to top ↑';
  button.setAttribute('aria-label', 'Back to top');
  button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.append(button);
  const update = () => button.classList.toggle('is-visible', window.scrollY > 480);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

workMenu();
responsiveHeader();
index();
collectionPage();
projectPage();
constrainImageZoom();
joineryCataloguePreview();
protectImages();
backToTop();
