const { spawnSync } = require('child_process');

// 1. Patch next-on-pages for Windows environments
require('./patch-nop.js');

// 2. Build via Vercel CLI
console.log('\n[1/3] Compiling Next.js output via Vercel CLI...');
const b1 = spawnSync('npx', ['vercel', 'build'], { stdio: 'inherit', shell: true });
if (b1.status !== 0) process.exit(b1.status ?? 1);

// 3. Compile Cloudflare Worker bundle
console.log('\n[2/3] Compiling Cloudflare Edge Worker bundle...');
process.env.PATH = 'D:\\Git\\bin;D:\\Git\\usr\\bin;' + (process.env.PATH || '');
const b2 = spawnSync('pnpm', ['exec', 'next-on-pages', '--skip-build'], { stdio: 'inherit', shell: true });
if (b2.status !== 0) process.exit(b2.status ?? 1);

// 4. Deploy to Cloudflare Pages
console.log('\n[3/3] Deploying to Cloudflare Pages...');
const b3 = spawnSync('npx', ['wrangler', 'pages', 'deploy', '.vercel/output/static', '--project-name=rayonix-site', '--branch=main'], { stdio: 'inherit', shell: true });
process.exit(b3.status ?? 0);
