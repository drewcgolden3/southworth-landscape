# Southworth Landscape Design & Construction — Website

A premium single-page marketing site with a full-bleed (muted, looping) hero video,
smooth momentum scrolling, scroll-reveal animations, and a "Request a Free Quote" form.

## Edit everything in one place: `config.js`
- **Contact** — phone, email, location, service area
- **Social** — Instagram & Facebook links
- **Services** — the six service cards (title, blurb, image, tags)
- **Work** — the portfolio grid (image, title, meta, `wide: true` to span two columns)
- **Form** — the quote-form service dropdown + success message

You do **not** need to touch `index.html` for content changes.

## Turn the quote form on (2 minutes)
By default the form works but just shows a thank-you + prompts a phone call.
To receive leads by email:
1. Go to **https://web3forms.com**, enter your email, and copy the free **Access Key**.
2. In `config.js`, set `form.web3formsKey: "your-key-here"`.
That's it — submissions now arrive in your inbox. (Add `contact.email` too for a
one-tap email fallback.)

## Run it locally
Any static server works, e.g.:
```
cd southworth-landscape
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy
It's plain HTML/CSS/JS — drag the folder into **Netlify Drop**, **Vercel**, **Cloudflare
Pages**, or any static host. No build step.

## Media
- `assets/media/hero.mp4` — hero background video (audio removed, web-optimized).
  Replace this file to change the hero; keep the filename or update it in `index.html`.
- `assets/media/hero-poster.jpg` — first-frame poster shown while the video loads.
- `assets/img/` — real project photos pulled from the brand's Instagram/Facebook,
  plus stills extracted from the hero video. Swap any of these by editing `config.js`.

## Notes
- Fonts: Fraunces (display) + Inter (UI), loaded from Google Fonts.
- Smooth scroll via Lenis (vendored locally at `js/lenis.min.js`).
- Fully responsive; honors `prefers-reduced-motion`.
