import { cp, rm, stat } from 'node:fs/promises'
import { join } from 'node:path'

const clientDir = join(process.cwd(), 'dist', 'client')
const outputDir = join(process.cwd(), 'dist-static')

await stat(join(clientDir, 'index.html'))
await rm(outputDir, { recursive: true, force: true })
await cp(clientDir, outputDir, { recursive: true })

console.log(`Static site ready in ${outputDir}`)
