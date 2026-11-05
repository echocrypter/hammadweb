/* Shared navbar: solid background on scroll, mobile menu, active-section highlight */
(function(){
  var header=document.getElementById('site-header');
  if(!header)return;
  var btn=header.querySelector('.menu');
  var solid=header.getAttribute('data-solid')==='true';

  function onScroll(){
    if(!solid)header.classList.toggle('scrolled',window.scrollY>40);
  }
  onScroll();
  window.addEventListener('scroll',onScroll,{passive:true});

  function setOpen(open){
    header.classList.toggle('nav-open',open);
    btn.setAttribute('aria-expanded',open?'true':'false');
    btn.setAttribute('aria-label',open?'Close menu':'Open menu');
  }
  btn.addEventListener('click',function(){setOpen(!header.classList.contains('nav-open'))});
  header.querySelectorAll('nav a').forEach(function(a){a.addEventListener('click',function(){setOpen(false)})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setOpen(false)});
  document.addEventListener('click',function(e){if(!header.contains(e.target))setOpen(false)});

  // highlight the nav link of the section currently on screen (home page only)
  if(!('IntersectionObserver' in window))return;
  var map={about:'#about',skills:'#skills',services:'#services',work:'projects.html',contact:'#contact'};
  var links={};
  header.querySelectorAll('nav a').forEach(function(a){links[a.getAttribute('href')]=a});
  Object.keys(map).forEach(function(id){
    var sec=document.getElementById(id),link=links[map[id]];
    if(!sec||!link)return;
    new IntersectionObserver(function(es){
      es.forEach(function(en){
        if(en.isIntersecting){
          Object.keys(links).forEach(function(k){links[k].classList.remove('on');links[k].removeAttribute('aria-current')});
          link.classList.add('on');link.setAttribute('aria-current','true');
        }
      });
    },{rootMargin:'-45% 0px -50% 0px'}).observe(sec);
  });
})();
