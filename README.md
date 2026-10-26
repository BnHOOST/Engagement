# محمد & أسماء — Our Engagement Story

A personal, bilingual (Arabic-first) engagement site. Pure HTML, CSS and JavaScript:
no build step, no backend, no frameworks.

## Open it

Double-click **`index.html`**. It opens in any modern browser straight from your disk.

> The fonts (Amiri, Aref Ruqaa, Cormorant Garamond, …) load from Google Fonts, so they
> need an internet connection. Offline, the site still works and falls back to system fonts.

To open it in English directly, use `index.html?lang=en`. The site also remembers the
language the visitor last picked.

## Folder structure

```
Portfolio/
├── index.html            ← page structure
├── css/styles.css        ← all styling (colors are at the top in :root)
├── js/content.js         ← ALL text, dates, captions and photo paths (edit this)
├── js/main.js            ← behaviour: timeline, gallery, lightbox, language switch
└── assets/
    ├── photos/           ← put your photos here
    ├── video/            ← engagement.mp4 (your clip, already copied in)
    └── icons/favicon.svg
```

## Adding your photos

Save your photos into `assets/photos/` using these names, then refresh the page:

| File name                          | Where it appears                                   |
|------------------------------------|----------------------------------------------------|
| `hero.jpg`                         | The arched portrait at the top (portrait, 3:4)     |
| `engagement-1.jpg`                 | Engagement-day card, large arched photo (portrait) |
| `engagement-2.jpg`, `engagement-3.jpg` | Engagement-day card, two smaller photos        |
| `gallery-01.jpg` … `gallery-09.jpg`| The photo gallery                                  |
| `video-poster.jpg` (optional)      | Cover image shown before the video plays           |

Until a photo exists, its slot shows a soft placeholder with the file name it expects,
so you can always see which file goes where.

**Using different names, or more or fewer photos?** Open `js/content.js` and edit the
`photos` section. Each gallery entry looks like this:

```js
{ src: "assets/photos/gallery-01.jpg", shape: "tall", caption: { ar: "يوم الشبكة", en: "Engagement day" } },
```

- `shape` is a layout hint: `"tall"` (portrait), `"wide"` (landscape) or `"square"`.
- Add or delete lines to change how many photos the gallery shows.
- Captions have Arabic and English versions.

**A photo for a timeline step:** in the `timeline` section of `content.js`, set
`photo: "assets/photos/henna.jpg"` (for example) on that step. If the file is missing, the
image is simply left out.

### Keep the site fast

Phone photos are often 4–8 MB each. Before adding them:

- Resize to about **1600 px on the long edge** (hero and engagement photos: 1200–1600 px).
- Save as JPEG at ~80% quality, or as WebP. Aim for **under 400 KB** per photo.
- Free tools: [squoosh.app](https://squoosh.app) in the browser, or the Windows Photos
  app → *Resize image*.

`.webp` and `.png` work too. Just use the matching file name in `content.js`.

## The video

`assets/video/engagement.mp4` is a copy of `asmaa-mohamed.mp4`. The "From Our Engagement Day"
section appears only when that video loads. To swap it, replace the file or change
`photos.video.src` in `content.js`. To remove the section, set `video: null`.

## Editing text and dates

Every word on the page lives in `js/content.js`:

- `timeline` holds the story steps: titles, Gregorian/Hijri dates, short descriptions,
  and icons. `featured: true` marks the main milestone; `future: true` marks a
  "coming soon" chapter.
- `dates` sets the start dates for the live day counters.
- `i18n.ar` / `i18n.en` hold all other interface text.

When a future chapter happens (كتب الكتاب, إن شاء الله), remove `future: true` and add its
`day`, `greg` and `hijri` dates. The "we are here" marker always follows the featured
step, so move `featured: true` onto the new step to make it the highlighted milestone.

## Colors

The palette lives at the top of `css/styles.css` (`--ivory`, `--champagne`, `--gold`,
`--blush`, `--rose`, …). Change these values to retint the whole site.

## Accessibility & motion

- Full RTL/LTR switching, semantic headings, keyboard-navigable gallery and lightbox
  (arrow keys, Esc), visible focus styles.
- Visitors who choose "reduce motion" on their device see no petals, confetti, or
  shimmer. Content appears without animation.
