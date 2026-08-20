# Brand sources

The untouched originals. Nothing in here is loaded by the website — it is the backup, so the
web assets in `/public` can always be rebuilt from scratch.

| File | What it is |
| --- | --- |
| `logo-source.png` | The original DG Performance badge as supplied: white artwork on a solid black plate, 1254×1254 |
| `equipment-source.jpg` | The original field-at-dusk photo as supplied, 1170×1553 |
| `make-logo-assets.mjs` | The script that turns `logo-source.png` into the four files in `/public` |

## Rebuilding the logo files

`public/logo.png` is not the original — the black plate has been cut away so the badge floats
freely on any background instead of sitting inside a black square. That cut, plus the social card
and the favicon, are produced by the script here.

You only need this if you change the badge artwork. Open `make-logo-assets.mjs`, point `SOURCE` at
your new file, and run it from the project root:

```bash
node brand/make-logo-assets.mjs
```

It writes four files into `public/`:

| Output | Size | Used for |
| --- | --- | --- |
| `logo.png` | 640×640, transparent | Header, hero, footer |
| `logo-dark.png` | 640×640, transparent, dark ink | Only needed on a light palette |
| `og-image.png` | 1200×630, badge on brand black | Social previews |
| `favicon.png` | 256×256, badge on brand black | Browser tab |

The script drives a headless Chrome to do the pixel work, and expects one at the path set in
`CHROME` at the top of the file. If that path no longer exists, the simpler route is to open the
original in any image editor, delete the black background, and export the sizes above by hand.
