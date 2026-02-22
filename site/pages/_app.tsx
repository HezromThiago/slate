import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { ScriptSettings, SiteSettings, WhatsappSettings, readStorage } from '../utils/admin-storage'

export default function App({ Component, pageProps }: AppProps) {
  const [scripts, setScripts] = useState<ScriptSettings>({ headerScripts: '', footerScripts: '' })
  const [whatsapp, setWhatsapp] = useState<WhatsappSettings>({ number: '', message: '', icon: '💬' })
  const [settings, setSettings] = useState<SiteSettings>({ siteName: 'Site', email: '', address: '', instagramUrl: '', facebookUrl: '', faviconUrl: '/favicon.ico' })

  useEffect(() => {
    setScripts(readStorage<ScriptSettings>('scripts'))
    setWhatsapp(readStorage<WhatsappSettings>('whatsapp'))
    setSettings(readStorage<SiteSettings>('settings'))
  }, [])

  return (
    <>
      <Head>
        <title>{settings.siteName}</title>
        <link rel="icon" href={settings.faviconUrl || '/favicon.ico'} />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: scripts.headerScripts }} />
      <Component {...pageProps} />
      <a
        href={`https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message || '')}`}
        style={{ position: 'fixed', right: 16, bottom: 16, textDecoration: 'none' }}
      >
        <span className="btn btn-success rounded-circle p-3 shadow">{whatsapp.icon || '💬'}</span>
      </a>
      <div dangerouslySetInnerHTML={{ __html: scripts.footerScripts }} />
    </>
  )
}
