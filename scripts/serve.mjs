// Local preview server for /dist. Mirrors the host's clean URLs (/about serves about.html).
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(fileURLToPath(import.meta.url), '../../dist');
const port = Number(process.env.PORT || 4173);
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.csv': 'text/csv' };
const exists = async (p) => { try { return (await stat(p)).isFile(); } catch { return false; } };

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  let path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  if (path.endsWith('.html')) { res.writeHead(308, { Location: (path.replace(/(\/index)?\.html$/, '') || '/') + url.search }); return res.end(); }
  let file = join(dist, path);
  if (path.endsWith('/')) file = join(file, 'index.html');
  else if (!extname(path) || !(await exists(file))) { if (await exists(`${file}.html`)) file = `${file}.html`; }
  let status = 200;
  if (!(await exists(file))) { file = join(dist, '404.html'); status = 404; }
  const body = await readFile(file);
  res.writeHead(status, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  res.end(body);
}).listen(port, () => console.log(`Renoo preview: http://localhost:${port}`));
