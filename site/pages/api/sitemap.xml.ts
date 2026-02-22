import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const base = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`
  const urls = ['/', '/produtos', '/depoimentos', '/admin', '/cidades/osasco']
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(url => `<url><loc>${base}${url}</loc></url>`)
    .join('\n')}\n</urlset>`

  res.setHeader('Content-Type', 'application/xml')
  res.status(200).send(xml)
}
