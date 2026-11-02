# Indian Investment Portfolio Tracker OS — Landing Page
Static site (HTML/CSS/vanilla JS), no build step, GitHub Pages ready. Keep separate from the product files.

## Structure
index.html · style.css · script.js · assets/images/ · assets/icons/

## 1. Payment link (one place only)
`script.js`, line 2: `const PAYMENT_URL = "https://your-superprofile-link";`
All 7 buy buttons use it. Until set, they scroll to the pricing section and the console logs a warning.

## 2. Screenshots (assets/images/) — all 11 integrated
| File | Where it appears |
|---|---|
| dashboard.png | Hero laptop mockup; Excel panel in the Excel + Notion section |
| dashboard-allocation-chart.png, holdings-and-goal-progress.png | Dashboard showcase (category A / B) |
| asset-allocation.png, price-updates.png | "Inside the workbook" under the feature cards (B) |
| xirr-ledger.png, realized-gains.png, income-analysis.png, performance.png | "See the analysis in the workbook" in Advanced Analytics (C) |
| notion-main-workspace.png, notion-transaction-log.png | Excel + Notion section (D) |
To swap a screenshot, replace the file (same name) and, if its pixel size changes, update `w`/`h` in the `ASSETS` block of script.js so the aspect ratio stays correct. Every screenshot is click-to-zoom (arrow keys move through all of them, Esc closes). Screenshots are never cropped or stretched. Each is tagged "Sample data". Old unused names (holdings.png, investment-goals.png) are no longer needed.

## 3. Brand and sharing assets
- `assets/icons/favicon.png` — TEMPORARY generated mark; replace with final branding (same filename).
- `assets/images/og-image.png` — NOT YET CREATED. 1200x630 promo image using the real product identity.
- Replace the placeholder URL `https://YOUR-USERNAME.github.io/YOUR-REPO/` in index.html (canonical, og:url, og:image, twitter:image) once the site address is known.

## 4. FAQ items needing your confirmation (highlighted yellow on the page)
- Minimum supported Excel version
- Exact delivery method after payment
Search index.html for `TO CONFIRM`. Also verify: 16 worksheets, 6 Notion databases, the six package items.

## 5. Deploy on GitHub Pages
1. Create a repo and upload the contents (index.html at root or in /docs).
2. Settings → Pages → Deploy from a branch → main / root (or /docs) → Save.
3. Wait 1–2 minutes, then update the placeholder URLs above.

## 6. Pre-launch checklist
[ ] PAYMENT_URL set and tested from every buy button  [ ] Yellow TO CONFIRM markers resolved
[ ] 7 screenshots added and checked in the lightbox (arrows, Esc, Tab)  [ ] og-image.png + final favicon added
[ ] Canonical/OG/Twitter URLs updated  [ ] 0–1, 2–3, 4–5 "No" quiz results, Back and Restart checked
[ ] Mobile menu closes after tapping a link  [ ] No horizontal scroll at 360/390/768/1024/1440px
[ ] Sticky mobile bar doesn't cover content  [ ] Console clean (missing-image errors disappear once files exist)
[ ] Facebook Sharing Debugger shows the preview  [ ] Real-phone test

## 7. Screenshot review notes (decisions for you)
- The screenshots show a browser spreadsheet viewer (Google Sheets-style toolbar, "Share/Upgrade" buttons, account avatar). Shown uncropped and unaltered. Consider re-capturing from desktop Excel for a cleaner look, and check this fits your FAQ line that Google Sheets compatibility is not guaranteed.
- The dashboard displays "DATA QUALITY: MISSING DATA - results are incomplete (5 check(s) flagged)". It has been left visible on purpose. The page explains it as the product's data-quality feature. Replace with a clean verified sample capture if you have one.
- The Notion main workspace screenshot shows a warning callout with no visible text.
