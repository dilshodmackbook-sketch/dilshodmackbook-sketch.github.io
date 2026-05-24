# CV faylni qanday qo'yish

Telegram'dagi PDF faylingizni shu papkaga (`public/`) `cv-dilshod-bunyodov.pdf` nomi bilan saqlang.

## Tezroq qadamlar (macOS Finder orqali)

1. Telegram'dagi PDF'ni "Download" qiling
2. Finder'da yuklab olingan PDF'ni toping (`~/Downloads/`)
3. Faylga right-click → "Rename" → `cv-dilshod-bunyodov.pdf`
4. Faylni `/Users/dilshod/Desktop/website/public/` papkasiga ko'chiring

## Terminal orqali

```bash
# Yuklab olingan faylni topib qo'shing (nomini moslang)
mv ~/Downloads/dilshod*.pdf /Users/dilshod/Desktop/website/public/cv-dilshod-bunyodov.pdf
```

## Tekshirish

Brauzerda `http://localhost:5173/cv-dilshod-bunyodov.pdf` ni oching — PDF ochilishi kerak.

About bo'limidagi **"Download CV"** tugmasi shu fayldan yuklab oladi va `Dilshod-Bunyodov-CV.pdf` nomi bilan saqlaydi.

Bu faylni qo'shgandan keyin bu README'ni o'chirsa bo'ladi.
