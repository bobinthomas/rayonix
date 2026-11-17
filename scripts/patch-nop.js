const fs = require('fs');
const file = 'node_modules/@cloudflare/next-on-pages/dist/index.js';
if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    'download: "prefer-if-needed"',
    'download: "never"'
  );
  content = content.replace(
    '(0, import_child_process2.spawn)(spawnCmd.cmd, spawnCmd.cmdArgs);',
    `(0, import_child_process2.spawn)(process.platform === 'win32' ? (spawnCmd.cmd + '.cmd') : spawnCmd.cmd, spawnCmd.cmdArgs, { shell: true });`
  );
  fs.writeFileSync(file, content);
  console.log('Patched next-on-pages successfully!');
}
