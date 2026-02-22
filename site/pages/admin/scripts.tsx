import Head from 'next/head'
import { useEffect, useState } from 'react'
import { ScriptSettings, readStorage, writeStorage } from '../../utils/admin-storage'

export default function AdminScripts() {
  const [settings, setSettings] = useState<ScriptSettings>({ headerScripts: '', footerScripts: '' })
  useEffect(() => setSettings(readStorage<ScriptSettings>('scripts')), [])

  return <main className="container py-4"><Head><title>Admin | Scripts</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" /></Head><h1>Scripts</h1><div className="card p-3"><textarea className="form-control mb-2" placeholder="Scripts do HEAD" value={settings.headerScripts} onChange={e => setSettings({ ...settings, headerScripts: e.target.value })} /><textarea className="form-control mb-2" placeholder="Scripts do FOOTER" value={settings.footerScripts} onChange={e => setSettings({ ...settings, footerScripts: e.target.value })} /><button className="btn btn-primary" onClick={() => writeStorage('scripts', settings)}>Salvar scripts</button></div></main>
}
