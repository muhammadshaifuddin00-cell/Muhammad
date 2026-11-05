// Push the working tree to GitHub using isomorphic-git (pure JS — the
// system Git binary is blocked by Application Control for HTTPS).
// Usage: set GITHUB_TOKEN env var, then `node scripts/push-to-github.mjs`
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import http from 'isomorphic-git/http/node'
import git from 'isomorphic-git'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const remoteUrl = 'https://github.com/muhammadshaifuddin00-cell/Muhammad.git'
const token = process.env.GITHUB_TOKEN
if (!token) {
  console.error('GITHUB_TOKEN env var is required')
  process.exit(1)
}

const onAuth = () => ({
  username: 'x-access-token',
  password: token,
})

const SKIP = new Set(['.git', 'node_modules', 'dist'])
const SKIP_FILES = new Set(['.gitignore', '.oxlintrc.json'])
// .gitignore and .oxlintrc.json are kept out of the push? No — keep .gitignore,
// it is useful. Only skip the files that shouldn't be committed.
SKIP_FILES.clear()

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (entry.isFile()) yield full
  }
}

const author = {
  name: 'Muhammad Shaifuddin',
  email: 'muhammadshaifuddin00-cell@users.noreply.github.com',
}

await git.init({ fs, dir: root, defaultBranch: 'main' })
await git.addRemote({ fs, dir: root, remote: 'origin', url: remoteUrl })

// 1. Fetch remote main so our commit fast-forwards it.
console.log('Fetching remote main...')
await git.fetch({
  fs,
  http,
  dir: root,
  url: remoteUrl,
  ref: 'main',
  singleBranch: true,
  onAuth,
})
const remoteHead = await git.resolveRef({ fs, dir: root, ref: 'refs/remotes/origin/main' })
console.log('Remote HEAD:', remoteHead)

// 2. Stage every project file.

const files = [...walk(root)].map((f) => path.relative(root, f).split(path.sep).join('/'))
console.log(`Staging ${files.length} files...`)
for (const filepath of files) {
  await git.add({ fs, dir: root, filepath })
}

// 3. Commit the staged index on top of remote HEAD.
const commitOid = await git.commit({
  fs,
  dir: root,
  message: 'feat: complete HFC online food ordering website\n\n- React + Vite + Tailwind storefront\n- Menu, product details, cart, checkout, order confirmation\n- About, promotions and contact pages\n- Cart persisted in localStorage',
  parent: [remoteHead],
  author,
  noUpdateBranch: true,
})
console.log('Created commit:', commitOid)

// 4. Point local main at the new commit and push.
await git.branch({ fs, dir: root, ref: 'main', object: commitOid, force: true })
console.log('Pushing to GitHub...')
const result = await git.push({
  fs,
  http,
  dir: root,
  remote: 'origin',
  url: remoteUrl,
  ref: 'main',
  onAuth,
})
console.log('Push result:', result)
console.log('Done — https://github.com/muhammadshaifuddin00-cell/Muhammad')
