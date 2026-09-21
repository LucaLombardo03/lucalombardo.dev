/* ============================================================
   STUDIO TECNICO GEOM. MARCO ROSSI — sito dimostrativo
   script.js — unica interazione: apertura del menu su mobile
   ============================================================ */

(function () {
  'use strict';

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
  });

  // il form e solo dimostrativo: non invia nulla
  var form = document.getElementById('demoForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('demoFormMsg');
      if (msg) msg.hidden = false;
    });
  }
})();
