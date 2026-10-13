(() => {
  const storageKey = 'kaer-language';
  const supported = ['en', 'fr'];

  function applyLanguage(language) {
    document.documentElement.lang = language;
    document.querySelectorAll('[data-en][data-fr]').forEach((element) => {
      element.innerHTML = element.dataset[language];
    });
    for (const attribute of ['alt', 'aria-label', 'content', 'src', 'href']) {
      document.querySelectorAll(`[data-en-${attribute}]`).forEach((element) => {
        element.setAttribute(attribute, element.getAttribute(`data-${language}-${attribute}`));
      });
    }
    document.querySelectorAll('[data-language]').forEach((element) => {
      element.hidden = element.dataset.language !== language;
    });
    document.querySelectorAll('[data-set-language]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.setLanguage === language));
    });
    try {
      localStorage.setItem(storageKey, language);
    } catch {
      // The switch still works when browser storage is unavailable.
    }
  }

  let language = 'en';
  try {
    const saved = localStorage.getItem(storageKey);
    if (supported.includes(saved)) language = saved;
  } catch {
    // English remains the default when browser storage is unavailable.
  }
  // Preserve existing links to the French privacy policy and account section.
  if (document.querySelector('[data-language]')) {
    if (['#fr', '#comptes'].includes(location.hash)) language = 'fr';
    if (['#en', '#accounts'].includes(location.hash)) language = 'en';
  }
  applyLanguage(language);
  document.querySelectorAll('[data-set-language]').forEach((button) => {
    button.addEventListener('click', () => {
      applyLanguage(button.dataset.setLanguage);
      if (document.querySelector('[data-language]') && ['#fr', '#en', '#comptes', '#accounts'].includes(location.hash)) {
        history.replaceState(null, '', location.pathname + location.search);
      }
    });
  });
})();
