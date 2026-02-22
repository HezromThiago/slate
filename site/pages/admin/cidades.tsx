import Head from 'next/head'
import { FormEvent, useEffect, useState } from 'react'
import { CityPage, randomId, readStorage, writeStorage } from '../../utils/admin-storage'

const blank: CityPage = {
  id: '',
  city: '',
  title: '',
  slug: '',
  seoTitle: '',
  seoDescription: '',
  content: '',
}

export default function AdminCities() {
  const [items, setItems] = useState<CityPage[]>([])
  const [form, setForm] = useState<CityPage>(blank)

  useEffect(() => setItems(readStorage<CityPage[]>('cities')), [])

  const save = (event: FormEvent) => {
    event.preventDefault()
    const next = form.id
      ? items.map(i => (i.id === form.id ? form : i))
      : [{ ...form, id: randomId() }, ...items]
    setItems(next)
    writeStorage('cities', next)
    setForm(blank)
  }

  const remove = (id: string) => {
    const next = items.filter(item => item.id !== id)
    setItems(next)
    writeStorage('cities', next)
  }

  return (
    <main className="container py-4">
      <Head>
        <title>Admin | Cidades</title>
        <meta name="description" content="CRUD de páginas de cidades com SEO." />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
      </Head>
      <h1>Cidades</h1>
      <form className="row g-2 card p-3 my-3" onSubmit={save}>
        <input className="form-control" placeholder="Cidade" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
        <input className="form-control" placeholder="Título" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input className="form-control" placeholder="Slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
        <input className="form-control" placeholder="SEO title" value={form.seoTitle} onChange={e => setForm({ ...form, seoTitle: e.target.value })} />
        <textarea className="form-control" placeholder="SEO description" value={form.seoDescription} onChange={e => setForm({ ...form, seoDescription: e.target.value })} />
        <textarea className="form-control" placeholder="Conteúdo" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
        <button className="btn btn-primary" type="submit">Salvar</button>
      </form>
      <div className="list-group">
        {items.map(item => (
          <div className="list-group-item" key={item.id}>
            <strong>{item.title || `Estante de aço em ${item.city}`}</strong>
            <div className="mt-2 d-flex gap-2">
              <button className="btn btn-sm btn-outline-primary" onClick={() => setForm(item)}>Editar</button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => remove(item.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
