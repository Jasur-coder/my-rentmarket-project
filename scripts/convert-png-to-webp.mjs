import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const dirs = [
  path.join(root, "src", "assets"),
  path.join(root, "public"),
]

async function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) await walk(full)
    else if (/\.png$/i.test(e.name)) {
      const out = full.replace(/\.png$/i, ".webp")
      await sharp(full).webp({ quality: 82, effort: 4 }).toFile(out)
      const sIn = fs.statSync(full).size
      const sOut = fs.statSync(out).size
      console.log(
        path.relative(root, full),
        "→",
        path.relative(root, out),
        `${Math.round(sIn / 1024)}k → ${Math.round(sOut / 1024)}k`,
      )
    }
  }
}

for (const d of dirs) {
  if (fs.existsSync(d)) await walk(d)
}
