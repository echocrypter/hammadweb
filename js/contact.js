/* Contact — keeps the hidden #cf-svc select in sync with the chosen chip,
   so the existing WhatsApp / email handlers in script.js keep working. */
(function () {
  'use strict';
  var select = document.getElementById('cf-svc');
  var radios = document.querySelectorAll('.cx-chip input[name="svc"]');
  if (!select || !radios.length) return;
  radios.forEach(function (r) {
    r.addEventListener('change', function () { if (r.checked) select.value = r.value; });
  });
})();
