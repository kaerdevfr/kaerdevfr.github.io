# KaerDev Website

Static website for KaerDev, published with GitHub Pages.

## Pages

- `index.html`
- `mentions-legales.html`
- `privacy.html` — privacy policy for all KAER games
- `privacy-skysquito.html`

## Languages

English is the default. The header selector switches to French and saves the preference locally across pages. Shared translations use `data-en` / `data-fr` attributes and `language.js`; the privacy policy keeps a complete block for each language.

## Game screenshots and videos

Each game in `index.html` has a `.project-media` block. Keep it `hidden` while empty; remove `hidden` when adding screenshots. Add 3–4 `.media-shot` links inside `.media-gallery`, using CubyCube as the example. Images open in an accessible dialog (Escape to close); links still work without JavaScript. Use optimized local files, descriptive alt text, and matching `data-en-src` / `data-fr-src` and `data-en-href` / `data-fr-href` when the screenshots contain translated text.

CubyCube's three iPhone store screenshots come from `cubecube/output/store`, resized to 1400px high as JPEGs in `assets/cubycube`, in English and French.

For an optional YouTube video, set `data-youtube-id` to the 11-character ID from the watch or Shorts URL. Set `data-video-format="portrait"` for a vertical video, or `landscape` for 16:9. Public and unlisted videos must allow embedding. The script reveals the video button automatically; no YouTube resource is loaded until it is clicked. Closing the dialog stops playback. Leave the ID empty when no video is available; no placeholder is displayed.
