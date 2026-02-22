import Head from 'next/head'
import { FormEvent, useEffect, useState } from 'react'
import { Product, randomId, readStorage, writeStorage } from '../../utils/admin-storage'

const blank: Product = { id: '', name: '', slug: '', price: '', image: '', seoTitle: '', seoDescription: '', description: '' }

export default function AdminProducts() {
  const [items, setItems] = useState<Product[]>([])
  const [form, setForm] = useState<Product>(blank)
  useEffect(() => setItems(readStorage<Product[]>('products')), [])

  const save = (event: FormEvent) => {
    event.preventDefault()
    const next = form.id ? items.map(i => (i.id === form.id ? form : i)) : [{ ...form, id: randomId() }, ...items]
    setItems(next)
    writeStorage('products', next)
    setForm(blank)
  }

  return (
    <main className="container py-4">
      <Head><title>Admin | Produtos</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" /></Head>
      <h1>Produtos</h1>
      <form className="card p-3 my-3" onSubmit={save}>
        <input className="form-control mb-2" placeholder="Nome" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="form-control mb-2" placeholder="Slug" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
        <input className="form-control mb-2" placeholder="Preço" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input className="form-control mb-2" placeholder="Imagem URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
        <input className="form-control mb-2" placeholder="SEO title" value={form.seoTitle} onChange={e => setForm({ ...form, seoTitle: e.target.value })} />
        <textarea className="form-control mb-2" placeholder="SEO description" value={form.seoDescription} onChange={e => setForm({ ...form, seoDescription: e.target.value })} />
        <textarea className="form-control mb-2" placeholder="Descrição" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <button className="btn btn-primary">Salvar</button>
      </form>
      <div className="row g-3">
        {items.map(item => (
          <div className="col-md-4" key={item.id}>
            <article className="card h-100">
              <img className="card-img-top" src={item.image || 'https://placehold.co/600x400'} alt={item.name} />
              <div className="card-body">
                <h2 className="h5">{item.name}</h2>
                <p className="text-success fw-bold">R$ {item.price}</p>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setForm(item)}>Editar</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => {
                  const next = items.filter(p => p.id !== item.id)
                  setItems(next)
                  writeStorage('products', next)
                }}>Excluir</button>
              </div>
            </article>
          </div>
        ))}
      </div>
    </main>
  )
}
