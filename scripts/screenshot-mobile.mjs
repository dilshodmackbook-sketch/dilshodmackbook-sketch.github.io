import { chromium, devices } from 'playwright'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const outDir = resolve(process.cwd(), 'screenshots/mobile')
mkdirSync(outDir, { recursive: true })

const base = 'http://localhost:5173'
const browser = await chromium.launch()

async function shootMobile(theme, device, prefix) {
  const ctx = await browser.newContext({
    ...device,
    reducedMotion: 'reduce',
  })
  await ctx.addInitScript((t) => {
    try { localStorage.setItem('theme', t) } catch {}
  }, theme)

  const page = await ctx.newPage()

  async function shoot(path, file, { full = false, scroll = null } = {}) {
    console.log(`📱 [${theme}] ${file}`)
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    if (scroll) {
      await page.evaluate((id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
      }, scroll)
      await page.waitForTimeout(1000)
    }
    await page.screenshot({
      path: resolve(outDir, file),
      fullPage: full,
      type: 'png',
    })
  }

  await shoot('/', `${prefix}-01-hero.png`)
  await shoot('/', `${prefix}-02-about.png`, { scroll: 'about' })
  await shoot('/', `${prefix}-03-experience.png`, { scroll: 'experience' })
  await shoot('/', `${prefix}-04-skills.png`, { scroll: 'skills' })
  await shoot('/', `${prefix}-05-projects.png`, { scroll: 'projects' })
  await shoot('/', `${prefix}-06-contact.png`, { scroll: 'contact' })
  await shoot('/blog', `${prefix}-07-blog.png`)
  await shoot('/blog/react-query-changed-state', `${prefix}-08-post.png`)

  // Mobile menu open
  await page.goto(`${base}/`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.locator('button[aria-label="Toggle menu"]').click({ force: true })
  await page.waitForTimeout(500)
  await page.screenshot({
    path: resolve(outDir, `${prefix}-09-menu-open.png`),
    fullPage: false,
    type: 'png',
  })

  await ctx.close()
}

// iPhone 13 — 390x844
const iphone = devices['iPhone 13'] || {
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
}

await shootMobile('dark', iphone, 'dark')
await shootMobile('light', iphone, 'light')

await browser.close()
console.log('\n✅ Mobile screenshots saved to:', outDir)
