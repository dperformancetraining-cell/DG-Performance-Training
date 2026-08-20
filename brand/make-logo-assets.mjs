/**
 * Derives three web assets from the single supplied badge (white artwork on a
 * solid black plate):
 *   logo.png     640x640 — alpha cut from the black plate, for use on any background
 *   og-image.png 1200x630 — badge centred on the brand black, for social cards
 *   favicon.png  256x256  — badge on the brand black, for the browser tab
 */
import puppeteer from 'puppeteer-core';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CHROME =
  'C:/Users/Usuario/.cache/puppeteer/chrome/win64-146.0.7680.153/chrome-win64/chrome.exe';
const SOURCE = 'C:/Users/Usuario/Downloads/image0 (2).png';
const OUT = 'C:/Users/Usuario/Downloads/DG PERFORMANCE TRAINING/public';

const dataUrl = 'data:image/png;base64,' + readFileSync(SOURCE).toString('base64');

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'shell' });
const page = await browser.newPage();
await page.goto('about:blank');

const files = await page.evaluate(async (src) => {
  const img = new Image();
  img.src = src;
  await img.decode();

  const draw = (w, h, fn) => {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    fn(ctx, c);
    return c;
  };

  // 1. Alpha cut: white artwork keeps its brightness as opacity, black drops out.
  const mark = draw(640, 640, (ctx) => {
    ctx.drawImage(img, 0, 0, 640, 640);
    const pixels = ctx.getImageData(0, 0, 640, 640);
    const d = pixels.data;
    for (let i = 0; i < d.length; i += 4) {
      const luma = Math.max(d[i], d[i + 1], d[i + 2]);
      d[i] = 255;
      d[i + 1] = 255;
      d[i + 2] = 255;
      d[i + 3] = luma;
    }
    ctx.putImageData(pixels, 0, 0);
  });

  // 2. Social card: badge centred on the brand black.
  const og = draw(1200, 630, (ctx) => {
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, 1200, 630);
    const size = 520;
    ctx.drawImage(mark, (1200 - size) / 2, (630 - size) / 2, size, size);
  });

  // 3. Favicon: badge on the brand black, edge to edge.
  const icon = draw(256, 256, (ctx) => {
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, 256, 256);
    ctx.drawImage(mark, 0, 0, 256, 256);
  });

  // 4. Same cut, but the artwork inked dark — for use on a light background.
  const darkMark = draw(640, 640, (ctx) => {
    ctx.drawImage(img, 0, 0, 640, 640);
    const pixels = ctx.getImageData(0, 0, 640, 640);
    const d = pixels.data;
    for (let i = 0; i < d.length; i += 4) {
      const luma = Math.max(d[i], d[i + 1], d[i + 2]);
      d[i] = 11;
      d[i + 1] = 15;
      d[i + 2] = 13;
      d[i + 3] = luma;
    }
    ctx.putImageData(pixels, 0, 0);
  });

  return {
    'logo.png': mark.toDataURL('image/png'),
    'logo-dark.png': darkMark.toDataURL('image/png'),
    'og-image.png': og.toDataURL('image/png'),
    'favicon.png': icon.toDataURL('image/png'),
  };
}, dataUrl);

for (const [name, url] of Object.entries(files)) {
  const buf = Buffer.from(url.split(',')[1], 'base64');
  writeFileSync(join(OUT, name), buf);
  console.log(name, (buf.length / 1024).toFixed(0) + ' KB');
}

await browser.close();
