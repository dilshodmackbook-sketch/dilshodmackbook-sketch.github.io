import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const outDir = resolve(process.cwd(), 'screenshots/themes')
mkdirSync(outDir, { recursive: true })

const base = 'http://localhost:5173'
const browser = await chromium.launch()

async function shootTheme(theme) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    reducedMotion: 'reduce',
  })
  // Inject theme into localStorage before any script runs
  await ctx.addInitScript((t) => {
    try { localStorage.setItem('theme', t) } catch {}
  }, theme)

  const page = await ctx.newPage()

  async function shoot(path, file, { full = false, scroll = null } = {}) {
    console.log(`📸 [${theme}] ${file} <- ${path}`)
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)
    if (scroll) {
      await page.evaluate((id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
      }, scroll)
      await page.waitForTimeout(1200)
    }
    await page.screenshot({
      path: resolve(outDir, file),
      fullPage: full,
      type: 'png',
    })
  }

  await shoot('/', `${theme}-01-hero.png`)
  await shoot('/', `${theme}-02-about.png`, { scroll: 'about' })
  await shoot('/', `${theme}-03-skills.png`, { scroll: 'skills' })
  await shoot('/', `${theme}-04-projects.png`, { scroll: 'projects' })
  await shoot('/', `${theme}-05-contact.png`, { scroll: 'contact' })
  await shoot('/blog', `${theme}-06-blog.png`)

  await ctx.close()
}

await shootTheme('dark')
await shootTheme('light')

await browser.close()
console.log('\n✅ Theme screenshots saved to:', outDir)
