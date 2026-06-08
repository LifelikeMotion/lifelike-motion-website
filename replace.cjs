const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(/text-neutral-900 dark:text-neutral-50/g, 'text-black dark:text-white');
content = content.replace(/text-neutral-600 dark:text-neutral-300/g, 'text-black dark:text-white');
content = content.replace(/text-neutral-900 dark:text-white/g, 'text-black dark:text-white');
content = content.replace(/bg-neutral-100 dark:bg-neutral-950/g, 'bg-neutral-50 dark:bg-neutral-950');

fs.writeFileSync('src/App.tsx', content);
console.log('Done');
