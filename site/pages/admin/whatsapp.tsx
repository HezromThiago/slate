import Head from 'next/head'
import { useEffect, useState } from 'react'
import { WhatsappSettings, readStorage, writeStorage } from '../../utils/admin-storage'

export default function AdminWhatsapp() {
  const [settings, setSettings] = useState<WhatsappSettings>({ number: '', message: '', icon: '💬' })
  useEffect(() => setSettings(readStorage<WhatsappSettings>('whatsapp')), [])

  return <main className="container py-4"><Head><title>Admin | WhatsApp</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" /></Head><h1>WhatsApp</h1><div className="card p-3"><input className="form-control mb-2" placeholder="Número" value={settings.number} onChange={e => setSettings({ ...settings, number: e.target.value })} /><input className="form-control mb-2" placeholder="Mensagem" value={settings.message} onChange={e => setSettings({ ...settings, message: e.target.value })} /><input className="form-control mb-2" placeholder="Ícone" value={settings.icon} onChange={e => setSettings({ ...settings, icon: e.target.value })} /><button className="btn btn-primary" onClick={() => writeStorage('whatsapp', settings)}>Salvar WhatsApp</button></div></main>
}
