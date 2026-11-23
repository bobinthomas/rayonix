const fs = require('fs');
const content = fs.readFileSync('C:/Users/bobin/.gemini/antigravity/brain/2de785d3-11d7-4f23-9e09-191de2d66ce2/.system_generated/steps/1894/output.txt', 'utf8');

const idx = content.indexOf('2sec-tabs');
console.log(content.slice(idx, idx + 1200));
