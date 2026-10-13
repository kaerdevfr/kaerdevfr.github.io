(() => {
  const dialog = document.querySelector('.media-dialog');
  const preview = dialog.querySelector('.media-preview');
  const close = dialog.querySelector('.media-close');

  function openMedia(element, portrait = false) {
    preview.replaceChildren(element);
    dialog.classList.toggle('media-dialog-portrait', portrait);
    dialog.showModal();
  }

  document.querySelectorAll('.media-shot').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const image = new Image();
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      openMedia(image, true);
    });
  });

  document.querySelectorAll('.project-media').forEach((media) => {
    const id = media.dataset.youtubeId;
    if (!/^[a-zA-Z0-9_-]{11}$/.test(id)) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'media-video';
    // Both labels are present before language.js next runs a language switch.
    button.innerHTML = '<span aria-hidden="true">▶</span><span data-en="Watch video" data-fr="Voir la vidéo"></span>';
    const label = button.lastElementChild;
    if (media.dataset.videoSpedUp === 'true') {
      label.dataset.en = 'Gameplay presentation';
      label.dataset.fr = 'Présentation du gameplay';
    }
    label.textContent = label.dataset[document.documentElement.lang === 'fr' ? 'fr' : 'en'];
    button.addEventListener('click', () => {
      const frame = document.createElement('iframe');
      frame.src = `https://www.youtube-nocookie.com/embed/${id}`;
      frame.title = media.closest('.project').querySelector('h3').textContent;
      frame.allow = 'encrypted-media; fullscreen; picture-in-picture';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      openMedia(frame, media.dataset.videoFormat === 'portrait');
    });
    media.querySelector('.media-gallery').append(button);
    media.hidden = false;
  });

  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  // Also runs on Escape, stopping playback and releasing the image.
  dialog.addEventListener('close', () => preview.replaceChildren());
})();
