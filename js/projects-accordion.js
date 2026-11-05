/* Projects — expanding card rows.
   Click (or press Enter/Space, or use the arrow keys) to open a card.
   Only the open card's image is loaded, the rest load on first open. */
(function () {
  'use strict';

  var groups = document.querySelectorAll('.work-group');
  if (!groups.length) return;

  var STRIP_GAP = 10;
  var phone = window.matchMedia('(max-width: 720px)');

  function stripWidth(row) {
    var v = parseFloat(getComputedStyle(row.closest('.work-section')).getPropertyValue('--strip'));
    return isNaN(v) ? 68 : v;
  }

  groups.forEach(function (group) {
    var row    = group.querySelector('.acc');
    var items  = Array.prototype.slice.call(row.querySelectorAll('.acc-item'));
    var arrows = group.querySelectorAll('.work-arrow');
    var prev   = group.querySelector('.work-arrow[data-dir="-1"]');
    var next   = group.querySelector('.work-arrow[data-dir="1"]');
    var current = 0;

    /* open-card width: fits the row, up to 920px */
    function sizeOpen() {
      var w = Math.min(920, Math.max(300, row.clientWidth - 80));
      row.style.setProperty('--open', w + 'px');
      return w;
    }

    function loadImage(item) {
      var img = item.querySelector('.acc-shot img');
      if (img && !img.getAttribute('src') && img.dataset.src) {
        img.src = img.dataset.src;
      }
    }

    /* phone: measure how tall the open card needs to be */
    function sizePanel(item) {
      if (!phone.matches) { item.style.removeProperty('--panel-h'); return; }
      var panel = item.querySelector('.acc-panel');
      var strip = stripWidth(row);
      var h = strip + 200 + 16 + item.querySelector('.acc-copy').scrollHeight;
      item.style.setProperty('--panel-h', h + 'px');
    }

    function updateArrows() {
      var max = row.scrollWidth - row.clientWidth;
      group.classList.toggle('no-overflow', max <= 4 || phone.matches);
      if (prev) prev.disabled = row.scrollLeft <= 4;
      if (next) next.disabled = row.scrollLeft >= max - 4;
    }

    function revealCard(index) {
      if (phone.matches) return;
      var open  = sizeOpen();
      var strip = stripWidth(row);
      /* final left edge once the card has finished opening */
      var left  = index * (strip + STRIP_GAP);
      var right = left + open;
      var viewL = row.scrollLeft;
      var viewR = viewL + row.clientWidth;
      var target = null;
      if (left < viewL) target = Math.max(0, left - strip - STRIP_GAP);
      else if (right > viewR) target = right - row.clientWidth + strip + STRIP_GAP;
      if (target !== null) {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        row.scrollTo({ left: Math.max(0, target), behavior: reduce ? 'auto' : 'smooth' });
      }
    }

    function activate(index, opts) {
      opts = opts || {};
      index = Math.max(0, Math.min(items.length - 1, index));
      items.forEach(function (item, i) {
        var on = i === index;
        item.classList.toggle('is-active', on);
        var tab = item.querySelector('.acc-tab');
        var panel = item.querySelector('.acc-panel');
        tab.setAttribute('aria-expanded', on ? 'true' : 'false');
        if (on) { panel.removeAttribute('inert'); loadImage(item); sizePanel(item); }
        else    { panel.setAttribute('inert', ''); }
      });
      current = index;
      /* warm the next card so it opens instantly */
      if (items[index + 1]) loadImage(items[index + 1]);
      revealCard(index);
      if (opts.focus) items[index].querySelector('.acc-tab').focus({ preventScroll: true });
      setTimeout(updateArrows, 650);
    }

    items.forEach(function (item, i) {
      var tab = item.querySelector('.acc-tab');
      tab.addEventListener('click', function () { activate(i); });
      tab.addEventListener('keydown', function (e) {
        var k = e.key;
        var vertical = phone.matches;
        var back = vertical ? 'ArrowUp' : 'ArrowLeft';
        var fwd  = vertical ? 'ArrowDown' : 'ArrowRight';
        if (k === back)       { e.preventDefault(); activate(i - 1, { focus: true }); }
        else if (k === fwd)   { e.preventDefault(); activate(i + 1, { focus: true }); }
        else if (k === 'Home'){ e.preventDefault(); activate(0, { focus: true }); }
        else if (k === 'End') { e.preventDefault(); activate(items.length - 1, { focus: true }); }
      });
    });

    arrows.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var dir = parseInt(btn.getAttribute('data-dir'), 10);
        row.scrollBy({ left: dir * (stripWidth(row) + STRIP_GAP) * 4, behavior: 'smooth' });
      });
    });

    row.addEventListener('scroll', updateArrows, { passive: true });

    function layout() {
      sizeOpen();
      items.forEach(function (it) { if (it.classList.contains('is-active')) sizePanel(it); });
      updateArrows();
    }
    window.addEventListener('resize', layout);
    if (phone.addEventListener) phone.addEventListener('change', layout);

    layout();
    loadImage(items[0]);
    if (items[1]) loadImage(items[1]);
  });
})();
