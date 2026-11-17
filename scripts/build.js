const { spawnSync } = require('child_process');

if (process.env.NEXT_ON_PAGES_RUNNING === '1' || process.env.VERCEL === '1') {
  // Inside next-on-pages / vercel build: run standard Next.js build
  const result = spawnSync('npx', ['next', 'build'], {
    stdio: 'inherit',
    shell: true,
  });
  process.exit(result.status ?? 0);
} else {
  // Top-level build on Cloudflare CI or local runner
  const result = spawnSync('npx', ['@cloudflare/next-on-pages'], {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, NEXT_ON_PAGES_RUNNING: '1' },
  });
  process.exit(result.status ?? 0);
}
