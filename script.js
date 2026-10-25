/* Sentry Pest Control - sample preview script.
   Progressive enhancement only: content is fully visible without JS. */
(function () {
  'use strict';

  var root = document.documentElement;
  var items = document.querySelectorAll('.reveal');

  if (!items.length) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var supported = 'IntersectionObserver' in window;

  if (reduce || !supported) {
    for (var i = 0; i < items.length; i++) items[i].classList.add('is-in');
    return;
  }

  // Only now does CSS get permission to hide reveal elements.
  root.classList.add('js');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  for (var j = 0; j < items.length; j++) observer.observe(items[j]);

  // Safety net: if anything is still hidden after load, show it.
  window.addEventListener('load', function () {
    setTimeout(function () {
      var all = document.querySelectorAll('.reveal:not(.is-in)');
      for (var k = 0; k < all.length; k++) {
        var rect = all[k].getBoundingClientRect();
        if (rect.top < window.innerHeight) all[k].classList.add('is-in');
      }
    }, 400);
  });
})();
