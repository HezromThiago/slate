import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { adminCredential } from '../../utils/admin-storage'

const links = [
  { href: '/admin/cidades', label: 'Cidades (CRUD + SEO)' },
  { href: '/admin/produtos', label: 'Produtos estilo marketplace (CRUD + SEO)' },
  { href: '/admin/depoimentos', label: 'Depoimentos (CRUD)' },
  { href: '/admin/scripts', label: 'Scripts de Header/Footer (Pixel, GA...)' },
  { href: '/admin/whatsapp', label: 'WhatsApp: número, mensagem e ícone' },
  { href: '/admin/configuracoes', label: 'Configurações gerais + sitemap + favicon' },
]

export default function AdminLogin() {
  const [logged, setLogged] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (email === adminCredential.email && password === adminCredential.password) {
      setLogged(true)
      setError('')
      return
    }
    setError('Credenciais inválidas.')
  }

  return (
    <>
      <Head>
        <title>Admin | Login</title>
        <meta name="description" content="Painel administrativo com SEO e CRUD." />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>
      <main className="container py-5">
        <h1 className="mb-4">Painel Administrativo</h1>
        {!logged ? (
          <form className="card p-4 shadow-sm" onSubmit={onSubmit}>
            <p className="text-muted">Acesse com o e-mail e senha de admin solicitados.</p>
            <div className="mb-3">
              <label className="form-label">E-mail</label>
              <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Senha</label>
              <input
                className="form-control"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button className="btn btn-primary" type="submit">
              Entrar
            </button>
          </form>
        ) : (
          <div className="card p-4 shadow-sm">
            <h2 className="h4">Módulos disponíveis</h2>
            <div className="list-group mt-3">
              {links.map(item => (
                <Link className="list-group-item list-group-item-action" href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  )
}
