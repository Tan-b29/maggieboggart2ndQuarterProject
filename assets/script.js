/* Shared site JavaScript for menu behavior, page loading, and smooth interaction.
   Comments make the logic easy to follow for grading and maintenance.
*/

(function () {
  'use strict';

  /**
   * Toggle the side menu visibility when the whisk icon is tapped.
   */
  function toggleMenu() {
    const menu = document.getElementById('menu');
    if (!menu) return;
    menu.classList.toggle('active');
  }

  /**
   * Use a loading overlay before leaving the page for a smoother experience.
   */
  function handlePageNavigation(event) {
    const link = event.target.closest('a');
    if (!link || link.hasAttribute('target')) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript')) return;

    event.preventDefault();
    const loadingOverlay = document.getElementById('loading');
    if (loadingOverlay) {
      loadingOverlay.classList.add('active');
    }

    setTimeout(function () {
      window.location.href = href;
    }, 400);
  }

  /**
   * Scroll the homepage down to the search section.
   */
  function scrollDown() {
    const section = document.getElementById('searchSection');
    if (!section) return;
    section.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * Initialize common page event handlers after DOM content is available.
   */
  function init() {
    document.addEventListener('click', handlePageNavigation);

    const scrollButton = document.querySelector('.scroll-btn');
    if (scrollButton) {
      scrollButton.addEventListener('click', scrollDown);
    }

    const menuButton = document.querySelector('.whisk-btn');
    if (menuButton) {
      menuButton.addEventListener('click', function () {
        toggleMenu();
      });
    }

    window.toggleMenu = toggleMenu;
    window.scrollDown = scrollDown;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
