/* Accessible responsive navigation shared by the homepage and projects page. */
(function () {
  'use strict';
  var header = document.getElementById('site-header');
  if (!header) return;
  var button = header.querySelector('.menu-toggle');
  var nav = header.querySelector('nav');
  if (!button || !nav) return;

  function setOpen(open) {
    header.classList.toggle('nav-open', open);
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    button.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  }

  button.addEventListener('click', function () {
    setOpen(!header.classList.contains('nav-open'));
  });
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setOpen(false); });
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') { setOpen(false); button.focus(); }
  });
  document.addEventListener('click', function (event) {
    if (!header.contains(event.target)) setOpen(false);
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) setOpen(false);
  }, { passive: true });
})();
