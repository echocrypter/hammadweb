(function () {
  const groups = [
{k:'apps',t:'Web & desktop apps',c:['#f2650f','#6a1f05'],i:[
['POS','Desktop app','Point-of-sale software.','assets/projects/POS.jpg','https://github.com/echocrypter/Naeem-Mobile-POS'],
['LeadHawk','Desktop app','Lead capturing.','assets/projects/leadh.jpg'],
['Habitly','Web app','Habit tracking.','assets/projects/habitly.jpg','https://habitly-three-blue.vercel.app/'],
['FinTrack','Web app','Finance tracking.','assets/projects/fintrack.jpg','https://v0-fintrack-hammadapp.vercel.app/'],
['Mini Jarvis','App','AI assistant app.','assets/projects/jarvis.jpg','https://jarvis-theta-peach.vercel.app/']
]},

{k:'web',t:'Websites',c:['#e0701a','#7a2406'],i:[
['Dr Arshad Riaz','Portfolio','Personal portfolio website.','assets/projects/dr.jpg','https://drarshadriazportfolio.vercel.app/'],
['Anwaar','Portfolio','Personal portfolio website.','assets/projects/anwaar.jpg','https://anwaarportfolio.vercel.app/'],
['Aleem','Portfolio','Personal portfolio website.','assets/projects/aleem.jpg','https://aleemportfolio.vercel.app/'],
['Hammad Ahmad','Portfolio','My own portfolio website.','assets/projects/mady.jpg','https://hammadahmadportfolio.netlify.app/'],
['Air Khushab','Airline','Airline website.','assets/projects/air.jpg','https://air-khushab.vercel.app'],
['Naeem','Mobile','Mobile website.','assets/projects/naeem.jpg','https://naeem-mobile.vercel.app/'],
['The Education Consultant','Education','Educational consultancy website.','assets/projects/tec.jpg','https://theeducationconsultant.vercel.app/'],
['Khamis','E-commerce','E-commerce store.','assets/projects/khamis.jpg','https://khamis-mu.vercel.app/'],
['Lucci','Clone','A clone of Gucci.','assets/projects/lucci.jpg','https://lucci-nine.vercel.app/'],
['Murphy Dental','Healthcare','Dental clinic website.','assets/projects/murphy.jpg','https://murphy-dental.vercel.app/'],
['Herman Cafe','Cafe','Cafe website.','assets/projects/herman.jpg','https://herman-cafe.vercel.app/'],
['Khayam Cinema','Cinema','Cinema website.','assets/projects/khayam.jpg','https://khayam-cinema.vercel.app/'],
['Hammond VR','VR','VR website.','assets/projects/vr.jpg','https://hammond-vr.vercel.app/'],
['Planetopedia','Website','','assets/projects/planet.jpg','https://planetopedia-eight.vercel.app/'],
['Nexora','Login page','Login page design.','assets/projects/nexora.jpg','https://nexora-login-page.vercel.app/'],
['Adaab Auth','Auth','Authentication pages.','assets/projects/adaab.jpg','https://adaab-auth-panel.vercel.app/'],
['NXR','Landing page','Landing page.','assets/projects/nxr.jpg','https://invoicely-sooty-eight.vercel.app/']
]},

{k:'ai',t:'AI automation & agents',c:['#d63a2f','#3f0d14'],i:[
['Customer service agent','AI agent','Handles customer service conversations.','assets/projects/cs.jpeg'],
['Lead generation agent','AI agent','Finds and qualifies leads.','assets/projects/lg.jpeg'],
['RAG query agent','RAG agent','Answers questions from your own documents.','assets/projects/rqb.jpeg'],
['SEO agent','AI agent · MVP','SEO assistant, built as an MVP.','assets/projects/seo.jpeg'],
['YouTube transcript & blog agent','AI agent','Turns YouTube transcripts into blog posts and posts them.','assets/projects/blog.jpeg'],
['Invoice processing agent','AI agent','Reads invoices and extracts the data.','assets/projects/ip.jpeg'],
['WhatsApp chatbot','Chatbot','Chats with customers on WhatsApp.','assets/projects/wa.jpg'],
['Voice receptionist','Voice agent','Answers calls like a receptionist.','assets/projects/reception.jpeg'],
['AI customer service','Voice agent','Handles customer service calls.','assets/projects/csvoice.jpeg'],
['Inventory management agent','AI agent','Helps manage stock and inventory.','assets/projects/ip.jpeg']
]}
];
  const grid = document.getElementById('projectsGrid');
  const filters = document.getElementById('projectFilters');
  if (!grid || !filters) return;
  const esc = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  groups.forEach(group => group.i.forEach((project, index) => {
    const [name, type, description, image, url] = project;
    const card = document.createElement('article');
    card.className = 'project-tile';
    card.dataset.category = group.k;
    card.dataset.search = [name,type,description].join(' ').toLowerCase();
    const visual = image ? `<img src="${esc(image)}" alt="${esc(name)} project preview" loading="lazy">` : `<span class="project-fallback">${esc(name.split(/\s+/).slice(0,2).map(x=>x[0]).join(''))}</span>`;
    card.innerHTML = `<div class="project-tile-visual">${visual}<span class="project-tile-number">${String(index+1).padStart(2,'0')}</span><span class="project-tile-type">${esc(type)}</span></div><div class="project-tile-info"><div><h3>${esc(name)}</h3><p>${esc(description || 'A project built with a focus on thoughtful design and useful functionality.')}</p></div>${url ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">View project <span>↗</span></a>` : `<span class="project-no-link">Preview unavailable</span>`}</div>`;
    grid.appendChild(card);
  }));
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    filters.querySelectorAll('button').forEach(item => item.classList.toggle('is-active', item === button));
    grid.querySelectorAll('.project-tile').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
  });
})();
