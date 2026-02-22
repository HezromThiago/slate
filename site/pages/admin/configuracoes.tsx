import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { SiteSettings, readStorage, writeStorage } from '../../utils/admin-storage'

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>({ siteName: '', email: '', address: '', instagramUrl: '', facebookUrl: '', faviconUrl: '' })
  useEffect(() => setSettings(readStorage<SiteSettings>('settings')), [])
  const sitemapLink = useMemo(() => '/api/sitemap.xml', [])

  return <main className="container py-4"><Head><title>Admin | Configurações</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" /></Head><h1>Configurações</h1><div className="card p-3"><input className="form-control mb-2" placeholder="Nome do site" value={settings.siteName} onChange={e => setSettings({ ...settings, siteName: e.target.value })} /><input className="form-control mb-2" placeholder="E-mail" value={settings.email} onChange={e => setSettings({ ...settings, email: e.target.value })} /><input className="form-control mb-2" placeholder="Endereço" value={settings.address} onChange={e => setSettings({ ...settings, address: e.target.value })} /><input className="form-control mb-2" placeholder="Instagram" value={settings.instagramUrl} onChange={e => setSettings({ ...settings, instagramUrl: e.target.value })} /><input className="form-control mb-2" placeholder="Facebook" value={settings.facebookUrl} onChange={e => setSettings({ ...settings, facebookUrl: e.target.value })} /><input className="form-control mb-2" placeholder="Favicon URL" value={settings.faviconUrl} onChange={e => setSettings({ ...settings, faviconUrl: e.target.value })} /><button className="btn btn-primary" onClick={() => writeStorage('settings', settings)}>Salvar configurações</button><a className="btn btn-link mt-2" href={sitemapLink}>Abrir sitemap.xml</a></div></main>
}
