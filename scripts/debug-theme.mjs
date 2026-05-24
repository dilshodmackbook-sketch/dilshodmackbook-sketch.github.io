import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext()
await ctx.addInitScript(() => {
  try { localStorage.setItem('theme', 'light') } catch {}
})
const page = await ctx.newPage()
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(1000)

const info = await page.evaluate(() => ({
  htmlClass: document.documentElement.className,
  themeStorage: localStorage.getItem('theme'),
  bodyBg: getComputedStyle(document.body).backgroundColor,
  bgVar: getComputedStyle(document.documentElement).getPropertyValue('--c-bg-primary').trim(),
  textPrimary: getComputedStyle(document.documentElement).getPropertyValue('--c-text-primary').trim(),
}))

console.log(JSON.stringify(info, null, 2))
await browser.close()
