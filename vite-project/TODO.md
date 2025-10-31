# Performance Optimization TODO List

## 1. Vite Config Optimization
- [x] Update `vite.config.ts` to enable Terser minification, tree-shaking, ES2020+ targets, drop console/debug, and mobile optimizations.

## 2. Tailwind & CSS Configuration
- [x] Ensure purge is enabled in `tailwind.config.js`, minify CSS.
- [x] Add `&display=swap` to Google Fonts imports in `index.css`.
- [x] Preload critical fonts in `index.html`.

## 3. Images & Media Optimization
- [x] Convert images to WebP/AVIF formats.
- [x] Add lazy loading (`loading="lazy"`), srcset/sizes, `decoding="async"` to images.

## 4. Fonts Optimization
- [x] Add `font-display: swap` to font faces.
- [x] Preconnect to fonts.gstatic.com in `index.html`.

## 5. JavaScript Optimization
- [x] Implement lazy loading for non-critical components using `React.lazy` and `Suspense` in `App.tsx`.
- [x] Defer/async scripts in `index.html`.
- [x] Split heavy JS into async chunks.

## 6. Caching & Network Performance
- [x] Update `vercel.json` with aggressive cache headers.

## 7. Reduce Render-Blocking Resources
- [x] Inline critical CSS.
- [x] Move scripts to end of `<body>` with `defer`.

## 8. DOM Optimization
- [x] Reduce nested divs in `Hero.tsx`, batch DOM updates.

## 9. Preconnect & Preload
- [x] Add preconnect for critical domains, preload fonts in `index.html`.

## 10. Build Improvements
- [x] Enable Brotli/Gzip compression, source maps only in dev, optimize bundle size.

## Followup Steps
- [ ] Install additional dependencies if needed.
- [x] Run `npm run build` to verify minification and output.
- [ ] Deploy to Vercel and test Lighthouse scores.
- [ ] Test on 3G mobile for <1s load time.
