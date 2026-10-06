// Renders the home page to static HTML after `vite build`, so search engines and
// link previews get the full content without running JavaScript
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const indexPath = `${root}dist/index.html`
const ssrEntry = `${root}dist-ssr/entry-server.js`

const { render } = await import(ssrEntry)
const { html, jsonLd } = await render()

const scripts = jsonLd
  .map((data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`)
  .join('\n    ')

const template = await readFile(indexPath, 'utf8')
if (!template.includes('<div id="app"></div>')) throw new Error('App mount point not found in dist/index.html')

const page = template
  .replace('<div id="app"></div>', `<div id="app">${html}</div>`)
  .replace('</head>', `    ${scripts}\n</head>`)

await writeFile(indexPath, page)
await rm(`${root}dist-ssr`, { recursive: true, force: true })
console.log('Prerendered dist/index.html')
