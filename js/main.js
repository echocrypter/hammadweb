/* Home page: project carousels + contact form */
(function () {
  var G = [
    {
      t: 'Apps & software',
      n: 'Desktop and web products',
      c: ['#f2650f', '#6a1f05'],
      i: [
        ['POS', 'Desktop app', 'Point-of-sale software.', 'assets/projects/carousel-pos.jpg'],
        ['LeadHawk', 'Desktop app', 'Lead capturing, all in one place.', 'assets/projects/leadh.jpg'],
        ['FinTrack', 'Web app', 'Finance tracking.', 'assets/projects/carousel-fintrack.jpg'],
        ['Habitly', 'Web app', 'Habit tracking.', 'assets/projects/carousel-habitly.jpg']
      ]
    },
    {
      t: 'Websites',
      n: 'Business, portfolio and store sites',
      c: ['#e0701a', '#7a2406'],
      i: [
        ['Air Khushab', 'Website', 'Airline website.', 'assets/projects/air.jpg'],
        ['Khamis', 'E-commerce website', 'Online store.', 'assets/projects/khamis.jpg'],
        ['Dr Arshad Riaz', 'Portfolio website', 'Personal portfolio website.', 'assets/projects/dr.jpg'],
        ['Naeem', 'Mobile website', 'Mobile website.', 'assets/projects/naeem.jpg'],
        ['Aleem', 'Portfolio website', 'Digital marketer portfolio website.', 'assets/projects/aleem.jpg'],
        ['Anwaar', 'Portfolio website', 'Personal portfolio website.', 'assets/projects/anwaar.jpg'],
        ['Hammad Ahmad', 'Portfolio website', 'This site.', 'assets/projects/mady.jpg'],
        ['Hammond VR', 'VR website', 'VR website.', 'assets/projects/vr.jpg']
      ]
    },
    {
      t: 'AI agents',
      n: 'Agents that handle chats, calls and paperwork',
      c: ['#d63a2f', '#3f0d14'],
      i: [
        ['Customer support agent', 'AI agent', 'Handles customer support chats.', 'assets/projects/cs.jpeg'],
        ['Lead generation agent', 'AI agent', 'Finds and qualifies leads.', 'assets/projects/lg.jpeg'],
        ['Invoice processing agent', 'AI agent', 'Reads invoices and pulls out the data.', 'assets/projects/ip.jpeg'],
        ['Voice receptionist', 'Voice agent', 'Answers calls like a receptionist.', 'assets/projects/reception.jpeg'],
        ['Customer service voice agent', 'Voice agent', 'Handles customer service calls.', 'assets/projects/csvoice.jpeg']
      ]
    }
  ];

  var host = document.getElementById('pj-groups');

  /* Stop here on pages that do not contain the home-page project groups. */
  if (host) {
    var reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    G.forEach(function (g, gi) {
      var sec = document.createElement('div');
      sec.className = 'grp';

      sec.innerHTML =
        "<div class='grp-h'>" +
        "<h3>" + g.t + "</h3>" +
        "<p>" + g.n + "</p>" +
        "</div>" +
        "<div class='stage' tabindex='0' role='region' aria-roledescription='carousel' aria-label='" + g.t + "'></div>" +
        "<div class='ctl'>" +
        "<button class='cb prev' aria-label='Previous project'>←</button>" +
        "<span class='cnt' aria-live='polite'></span>" +
        "<button class='cb next' aria-label='Next project'>→</button>" +
        "<button class='cb tg' aria-pressed='false'>Pause</button>" +
        "</div>";

      host.appendChild(sec);

      var st = sec.querySelector('.stage');
      var cnt = sec.querySelector('.cnt');
      var tg = sec.querySelector('.tg');

      var n = g.i.length;
      var a = 0;
      var paused = reduce;
      var vis = false;
      var hov = false;
      var x0 = 0;

      var cards = g.i.map(function (p, i) {
        var w = p[0].split(' ');
        var ini = (
          w.length > 1
            ? w[0][0] + w[1][0]
            : w[0][0]
        ).toUpperCase();

        var el = document.createElement('div');

        el.className = 'pcard';
        el.setAttribute('role', 'group');
        el.setAttribute('aria-label', p[0]);

        el.style.setProperty('--c1', g.c[0]);
        el.style.setProperty('--c2', g.c[1]);

        el.innerHTML =
          "<span class='tag'>" + p[1] + "</span>" +
          (p[3] ? "<img class='carousel-img' src='" + p[3] + "' alt='" + p[0] + " project preview' loading='lazy'>" : '') +
          "<div class='txt'>" +
          "<h4>" + p[0] + "</h4>" +
          (p[2] ? "<p>" + p[2] + "</p>" : '') +
          "</div>";

        el.addEventListener('click', function () {
          if (!el.classList.contains('on')) {
            go(i);
          }
        });

        st.appendChild(el);

        return el;
      });

      function lay() {
        var h = Math.floor(n / 2);
        var step = Math.min(230, st.clientWidth * 0.3);

        cards.forEach(function (el, i) {
          var d = (((i - a + h) % n) + n) % n - h;
          var ab = Math.abs(d);

          el.style.transform =
            'translateX(' + (d * step) + 'px) ' +
            'translateZ(' + (-ab * 150) + 'px) ' +
            'rotateY(' + (-d * 32) + 'deg)';

          el.style.opacity = ab > 2 ? 0 : 1;
          el.style.zIndex = 10 - ab;
          el.style.pointerEvents = ab > 2 ? 'none' : 'auto';

          el.classList.toggle('on', d === 0);
          el.setAttribute('aria-hidden', d === 0 ? 'false' : 'true');
        });

        cnt.textContent = (a + 1) + ' / ' + n;
      }

      function go(i) {
        a = ((i % n) + n) % n;
        lay();
      }

      sec.querySelector('.prev').onclick = function () {
        go(a - 1);
      };

      sec.querySelector('.next').onclick = function () {
        go(a + 1);
      };

      function sync() {
        tg.textContent = paused ? 'Play' : 'Pause';
        tg.setAttribute(
          'aria-pressed',
          paused ? 'true' : 'false'
        );
      }

      tg.onclick = function () {
        paused = !paused;
        sync();
      };

      sync();

      st.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          go(a + 1);
        }

        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          go(a - 1);
        }
      });

      st.addEventListener('pointerdown', function (e) {
        x0 = e.clientX;
      });

      st.addEventListener('pointerup', function (e) {
        var dx = e.clientX - x0;

        if (Math.abs(dx) > 40) {
          go(a + (dx < 0 ? 1 : -1));
        }
      });

      st.addEventListener('mouseenter', function () {
        hov = true;
      });

      st.addEventListener('mouseleave', function () {
        hov = false;
      });

      st.addEventListener('focusin', function () {
        hov = true;
      });

      st.addEventListener('focusout', function () {
        hov = false;
      });

      lay();

      window.addEventListener('resize', lay);

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(
          function (es) {
            es.forEach(function (en) {
              vis = en.isIntersecting;

              if (
                vis &&
                !st.classList.contains('ready')
              ) {
                cards.forEach(function (el, i) {
                  el.style.transitionDelay = (i * 70) + 'ms';
                });

                st.classList.add('ready');

                setTimeout(function () {
                  cards.forEach(function (el) {
                    el.style.transitionDelay = '';
                  });
                }, 1400);
              }
            });
          },
          {
            threshold: 0.25
          }
        ).observe(st);
      } else {
        st.classList.add('ready');
        vis = true;
      }

      setInterval(function () {
        if (!paused && vis && !hov) {
          go(a + 1);
        }
      }, 4200 + gi * 700);
    });
  }
})();


/* Contact form */
(function () {
  var getValue = function (id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  };

  var st = document.getElementById('cf-st');

  if (!st) {
    return;
  }

  function build() {
    var n = getValue('cf-name');
    var s = getValue('cf-svc');
    var m = getValue('cf-msg');

    if (!n || !m) {
      st.textContent = 'Add your name and a short message first.';
      return null;
    }

    st.textContent = '';

    return {
      s: s,
      t: 'Hi Hammad, my name is ' + n +
        '. I need ' + s + '.\n\n' + m
    };
  }

  var wa = document.getElementById('cf-wa');

  if (wa) {
    wa.onclick = function () {
      var r = build();

      if (!r) {
        return;
      }

      window.open(
        'https://wa.me/923042749413?text=' +
        encodeURIComponent(r.t),
        '_blank',
        'noopener'
      );
    };
  }

  var mail = document.getElementById('cf-mail');

  if (mail) {
    mail.onclick = function () {
      var r = build();

      if (!r) {
        return;
      }

      window.location.href =
        'mailto:hammadxprof174@gmail.com?subject=' +
        encodeURIComponent('Project enquiry') +
        '&body=' +
        encodeURIComponent(r.t);
    };
  }

  var yr = document.getElementById('yr');

  if (yr) {
    yr.textContent = new Date().getFullYear();
  }
})();