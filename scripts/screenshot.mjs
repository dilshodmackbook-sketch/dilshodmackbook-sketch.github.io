import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const outDir = resolve(process.cwd(), 'screenshots')
mkdirSync(outDir, { recursive: true })

const base = 'http://localhost:5173'

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  reducedMotion: 'reduce',
  colorScheme: 'dark',
})
const page = await ctx.newPage()

async function shoot(path, file, { fullPage = true, waitFor = null } = {}) {
  console.log(`📸 ${file} <- ${path}`)
  await page.goto(`${base}${path}`, { waitUntil: 'networkidle' })
  if (waitFor) await page.waitForSelector(waitFor, { timeout: 5000 }).catch(() => {})
  // Let animations settle and counters tick
  await page.waitForTimeout(1500)
  await page.screenshot({
    path: resolve(outDir, file),
    fullPage,
    type: 'png',
  })
}

async function shootSection(path, sectionId, file) {
  console.log(`📸 ${file} <- ${path}#${sectionId}`)
  await page.goto(`${base}${path}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  await page.evaluate((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, sectionId)
  await page.waitForTimeout(1500)
  await page.screenshot({
    path: resolve(outDir, file),
    fullPage: false,
    type: 'png',
  })
}

// 1) Home full page
await shoot('/', '01-home-full.png')

// 2) Hero viewport
await shoot('/', '02-hero-viewport.png', { fullPage: false })

// 3) Section viewports
await shootSection('/', 'about', '03-about.png')
await shootSection('/', 'experience', '04-experience.png')
await shootSection('/', 'skills', '05-skills.png')
await shootSection('/', 'projects', '06-projects.png')
await shootSection('/', 'contact', '07-contact.png')

// 4) Blog list
await shoot('/blog', '08-blog-list.png')

// 5) Blog post
await shoot('/blog/react-query-changed-state', '09-blog-post.png')

// 6) Mobile hero
await page.setViewportSize({ width: 390, height: 844 })
await shoot('/', '10-mobile-hero.png', { fullPage: false })

// 7) Mobile blog
await shoot('/blog', '11-mobile-blog.png', { fullPage: false })

// 8) Russian version of hero (LangSwitcher test)
await page.setViewportSize({ width: 1440, height: 900 })
await page.goto(`${base}/`, { waitUntil: 'networkidle' })
await page.evaluate(() => localStorage.setItem('lang', 'ru'))
await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
await page.screenshot({
  path: resolve(outDir, '12-hero-russian.png'),
  fullPage: false,
})

// 9) Uzbek version
await page.evaluate(() => localStorage.setItem('lang', 'uz'))
await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
await page.screenshot({
  path: resolve(outDir, '13-hero-uzbek.png'),
  fullPage: false,
})

await browser.close()
console.log('\n✅ All screenshots saved to:', outDir)
