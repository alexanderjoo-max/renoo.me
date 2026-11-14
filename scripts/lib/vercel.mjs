// Generates vercel.json: build settings, cache headers and redirects for the old URLs.
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const loose = (s) => s.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();

export function vercelConfig(data) {
  const redirects = [];
  const names = new Map();
  for (const p of data.procedures) {
    if (p.dataName === 'Dental Veneers') continue; // the old site merged this name into the full-mouth page
    names.set(p.dataName, p.slug);
    if (!names.has(loose(p.dataName))) names.set(loose(p.dataName), p.slug);
  }
  names.set('Dental Veneers', 'dental-veneers-full-mouth');
  for (const [name, slug] of names) {
    redirects.push({ source: '/procedure', has: [{ type: 'query', key: 'procedure', value: reEsc(name) }], destination: `/procedure/${slug}`, permanent: true });
  }
  return {
    $schema: 'https://openapi.vercel.sh/vercel.json',
    framework: null,
    installCommand: 'npm install',
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    cleanUrls: true,
    trailingSlash: false,
    redirects,
    headers: [
      { source: '/assets/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/api/(.*)', headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }, { key: 'Cache-Control', value: 'public, max-age=3600' }] },
      { source: '/(.*)', headers: [{ key: 'X-Content-Type-Options', value: 'nosniff' }, { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }] },
    ],
  };
}
