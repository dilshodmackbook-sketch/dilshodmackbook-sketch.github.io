# Dilshod Bunyodov — Portfolio

Advance darajadagi shaxsiy portfolio. **React 18 + Vite + Tailwind CSS + Framer Motion + i18next** asosida qurilgan. To'liq responsiv, 3 tilli (EN/RU/UZ), dark-modern dizayn.

## Tech Stack

- **React 18** + **React Router v6** — SPA routing va lazy loading
- **Vite 5** — bir necha yuz millisekundlik dev start
- **Tailwind CSS 3** — custom theme (ranglar, animatsiyalar, gradientlar)
- **Framer Motion** — scroll va page transition animatsiyalari
- **i18next** — EN / RU / UZ tarjimalar (localStorage'da saqlanadi)
- **Lucide React** — modular ikonalar

## Loyihaning tuzilishi

```
src/
├── components/
│   ├── layout/         (Navbar, Footer, BackgroundFX, LanguageSwitcher)
│   ├── sections/       (Hero, About, Experience, Skills, Projects, Contact)
│   └── utils/          (Loader, ScrollToTop)
├── data/               (skills.js, experience.js, projects.js, blog.js, socials.js)
├── hooks/              (useTypewriter, useCountUp)
├── i18n/
│   ├── index.js
│   └── locales/        (en.json, ru.json, uz.json)
├── pages/              (Home, BlogList, BlogPost, NotFound)
├── styles/index.css
├── App.jsx
└── main.jsx
```

## Buyruqlar

```bash
npm install        # paketlarni o'rnatish
npm run dev        # dev server: http://localhost:5173
npm run build      # production build → dist/
npm run preview    # build'ni lokal serverda ko'rish
```

---

## Server'ga joylash (Deployment)

### Variant 1 — Vercel (eng tez, bepul, SSL avtomatik) ⭐ tavsiya etilgan

1. GitHub'da repo yarating va push qiling:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<sizning-username>/portfolio.git
   git push -u origin main
   ```
2. [vercel.com](https://vercel.com) ga GitHub bilan kirib, "Import Project" → repo'ni tanlang.
3. Vercel Vite'ni avtomatik aniqlaydi. Faqat **Deploy** ni bosing.
4. Settings → Domains → o'z domeningizni qo'shing (masalan, `dilshod.dev`).
5. Domain provider'da DNS sozlamalarini Vercel ko'rsatgan A/CNAME yozuvlariga moslang.

### Variant 2 — Netlify

1. GitHub repo'ni Netlify'ga ulang.
2. Build command: `npm run build` · Publish directory: `dist`
3. SPA routing uchun loyiha ildiziga `public/_redirects` yarating:
   ```
   /*  /index.html  200
   ```

### Variant 3 — Sizning serveringiz (VPS, Nginx)

Agar sizda DigitalOcean, Hetzner, Hostinger VPS yoki shunga o'xshash serveringiz bo'lsa:

#### 1. Loyihani build qiling (lokalda)
```bash
npm run build
# dist/ papkasi yaratiladi
```

#### 2. `dist/` ni serverga ko'chiring
```bash
scp -r dist/* user@your-server-ip:/var/www/portfolio
```

#### 3. Nginx konfiguratsiyasi
Server'da `/etc/nginx/sites-available/portfolio` faylini yarating:

```nginx
server {
    listen 80;
    server_name dilshod.dev www.dilshod.dev;

    root /var/www/portfolio;
    index index.html;

    # SPA fallback — barcha route'lar index.html'ga
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Static assets — uzoq kesh
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1000;
}
```

Saytni aktivlashtirish:
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 4. SSL (HTTPS) — bepul Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d dilshod.dev -d www.dilshod.dev
```

#### 5. Domain'ni serverga ulash
Domain panelida (GoDaddy, Namecheap, Cloudflare):
- **A record**: `@` → server IP
- **A record**: `www` → server IP

DNS yangilanishi 5–60 daqiqa olishi mumkin.

---

## Domain olish tavsiyalari

| Provider | Narx (.com) | Plyuslari |
|---|---|---|
| **Namecheap** | $9-12/yil | Arzon, WhoisGuard bepul |
| **Cloudflare** | $9.15/yil | Eng arzon, DNS tez |
| **GoDaddy** | $12-20/yil | Mashhur lekin qimmatroq |
| **Porkbun** | $9/yil | Yaxshi DX |

Boshqa domain zonalari: `.dev` ($12), `.io` ($35), `.me` ($20), `.uz` (~$30/yil, uznic.uz)

---

## Sozlash bo'yicha maslahatlar

### Shaxsiy ma'lumotlarni o'zgartirish

- **Ijtimoiy tarmoq linklari** → `src/data/socials.js`
- **Skill'lar** → `src/data/skills.js`
- **Ish tajribasi** → `src/data/experience.js` + `src/i18n/locales/*.json` (jobs)
- **Loyihalar** → `src/data/projects.js` + tarjimalar
- **Blog postlari** → `src/data/blog.js` + tarjimalar
- **CV PDF** → `public/cv-dilshod-bunyodov.pdf` (qo'shishingiz kerak)

### SEO uchun
`index.html` da `og:image`, `og:url`, va kanonik URL qo'shing. Domain olganingizdan keyin `og:url` ni yangilang.

### Analytics
Vercel Analytics yoki Plausible / Umami qo'shing — `index.html` ga script teg sifatida.

---

## Performance natijasi

Production build (gzipped):
- **HTML**: 0.75 KB
- **CSS**: 7 KB
- **JS jami**: ~140 KB (react + i18n + motion + app)
- **Code splitting**: route'lar va vendor chunk'lar alohida yuklanadi

## Litsenziya

MIT — bemalol ishlatishingiz, modify qilishingiz mumkin.
