const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pages = ['index.html', 'blog.html', 'contact.html', 'new-post.html'];
let failed = false;

for (const page of pages) {
  const file = path.join(root, page);
  const html = fs.readFileSync(file, 'utf8');
  const opens = (html.match(/<a\b/gi) || []).length;
  const closes = (html.match(/<\/a>/gi) || []).length;
  if (!html.includes('<!DOCTYPE html>') && !html.includes('<!doctype html>')) {
    console.error(`${page}: missing doctype`); failed = true;
  }
  if (opens !== closes) {
    console.error(`${page}: anchor mismatch (${opens}/${closes})`); failed = true;
  }
  console.log(`${page}: OK (${opens} anchors)`);
}

const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const badUrl of ['demo.AIFitnessTrackerApp.com', 'demo.DecentralizedNFTMarketplace.com']) {
  if (index.includes(badUrl)) { console.error(`index.html: legacy demo URL found: ${badUrl}`); failed = true; }
}

if (failed) process.exit(1);
console.log('Site checks passed.');
