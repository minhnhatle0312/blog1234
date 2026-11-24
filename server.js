const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT) || 5500;
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function safeFilePath(requestUrl) {
  const requested = decodeURIComponent(new URL(requestUrl, `http://localhost:${port}`).pathname);
  const relative = requested === '/' ? 'index.html' : requested.replace(/^\/+/, '');
  const filePath = path.resolve(root, relative);
  return filePath.startsWith(root) ? filePath : null;
}

const server = http.createServer((request, response) => {
  if (request.url === '/__health') {
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ ok: true, service: 'minhnhat-portfolio' }));
    return;
  }

  let filePath;
  try { filePath = safeFilePath(request.url); } catch { filePath = null; }
  if (!filePath) { response.writeHead(403); response.end('Forbidden'); return; }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(error.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end(error.code === 'ENOENT' ? 'Not found' : 'Server error');
      return;
    }
    response.writeHead(200, { 'Content-Type': mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
    response.end(data);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Portfolio running at http://127.0.0.1:${port}`);
  console.log('Press Ctrl+C to stop the server.');
});
